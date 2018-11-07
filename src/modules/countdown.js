import { computed, observable, action } from 'mobx'
import { normalizeSeconds } from './time-lib'

// ----------------
// constants

const SECOND = 1000

// ----------------
// countdown class

export default class Countdown {
  @observable _seconds = false
  @observable _paused = false
  @observable _drift = 0

  constructor (opt = {}) {
    this._reset()
    this._setOptions(opt)
  }

  // ----------------
  // options and private properties

  @action
  _reset () {
    this._cancelNextLoop()
    this._running = false
    this._paused = false
    this._seconds = false
    this._timeoutDone = true
    this._lastLoop = false
    this._expect = false
    this._drift = 0
    this._listeners = {
      current: [],
      remaining: []
    }
  }

  _override (option, value) {
    const empty = value === null || value === undefined
    switch (option) {
      case '_startTime':
        this[option] = empty ? this[option] : normalizeSeconds(value * 60)
        break
      case '_listeners':
        if (!empty) this._registerListeners(value)
        break
      default:
        this[option] = empty ? this[option] : value
        break
    }
  }

  _setOptions (opt = {}) {
    const options =
      ['startTime',
        'onStart',
        'onPause',
        'onResume',
        'onLoop',
        'onEnd',
        'listeners']
    options.map(option => this._override(`_${option}`, opt[option]))
  }

  // ----------------
  // getters

  @computed get current () {
    return normalizeSeconds(this._seconds)
  }

  @computed get remaining () {
    return normalizeSeconds(this._startTime.total - this._seconds)
  }

  @computed get data () {
    const { _paused, current, remaining, _drift } = this
    const { minutes, seconds, mm, ss } = remaining
    return {
      paused: _paused,
      current,
      remaining,
      drift: _drift || 0,
      display: {
        minutes,
        seconds,
        mm,
        ss,
        paused: _paused
      }
    }
  }

  // ----------------
  // interface

  @action
  start = (time, opt = {}) => {
    if (time) opt.startTime = time
    this._setOptions(opt)
    this._start()
  }

  @action
  stop = () => {
    this._end()
  }

  @action
  pause = () => {
    this._pause()
  }

  @action
  resume = () => {
    this._resume()
  }

  @action
  configure = (opts) => {
    this._setOptions(opts)
  }

  // ----------------
  // lifecycle

  @action
  _start () {
    if (this._running) {
      throw new Error('[Countdown] Error: attempted start while running')
    }

    this._running = true
    this._seconds = 0
    this._loop(true)
    if (this._onStart) this._onStart(this.data)
  }

  @action
  _end () {
    if (!this._running) {
      throw new Error('[Countdown] Error: attempted end while not running')
    }

    const { data } = this
    this._reset()
    if (this._onEnd) this._onEnd(data)
  }

  @action
  _pause () {
    this._paused = true
    this._cancelNextLoop()
    if (this._onPause) this._onPause(this.data)
  }

  @action
  _resume () {
    this._paused = false
    this._scheduleLoop()
    if (this._onResume) this._onResume(this.data)
  }

  @action
  _loop (first) {
    this._timeoutDone = true

    this._lastLoop = Date.now()
    this._drift = first ? 0 : this._lastLoop - this._expect
    this._expect = (this._expect || this._lastLoop) + SECOND

    !first && this._seconds++

    if (this._onLoop) this._onLoop(this.data)

    this._timeEvents()

    return this.remaining.total <= 0
      ? this._end()
      : this._scheduleLoop()
  }

  // ----------------
  // time events

  _timeEvents () {
    // remaining
    const rTime = `${this.remaining.mm}:${this.remaining.ss}`
    this._listeners.remaining
      .filter(l => l.time === rTime)
      .map(l => l.listener())

    // current
    const cTime = `${this.current.mm}:${this.current.ss}`
    this._listeners.current
      .filter(l => l.time === cTime)
      .map(l => l.listener())
  }

  @action
  _registerListener (type = 'remaining', time, listener) {
    this._listeners[type].push({ time, listener })
  }

  @action
  _registerListeners (input, type = 'remaining') {
    if (Array.isArray(input)) return input.map(i => this._registerListener(type, i.time, i.listener))
    return Object.keys(input).map(key => this._registerListener(type, key, input[key]))
  }

  // ----------------
  // loop

  _debugLog () {
    const { remaining, current } = this.data

    console.log(`
     REMAINING: ${remaining.mm}:${remaining.ss}  [ ${remaining.total} ]

     CURRENT:   ${current.mm}:${current.ss}  [ ${current.total} ]
     `)
  }

  _scheduleLoop () {
    if (!this._timeoutDone) {
      throw new Error(
        '[Countdown] Error: timeout was not done and _scheduleLoop was called')
    }

    this._timeoutDone = false

    this._timeout =
      setTimeout(() => this._loop(), SECOND - (this._drift || 0))
  }

  _cancelNextLoop (expected = Date.now() + SECOND) {
    if (!this._timeout) return

    clearTimeout(this._timeout)
    this._timeout = false
  }
}
