import { observable, action, transaction } from 'mobx'
import * as $ from '../constants'

// ----------------
// constants

const BUBBLE_SIDE = 'left'
const BUBBLE_X = $.BUBBLE_POSITION[BUBBLE_SIDE].active
const BUBBLE_Y = $.TIMER_POSITION_Y_CENTER

// ----------------
// utils

const calcSide = x =>
  x + $.BUBBLE_DIAMETER / 2 < window.screen.availWidth / 2 ? 'left' : 'right'

const calcPosition = (side, hidden, active) =>
  $.BUBBLE_POSITION[side][hidden ? 'hidden' : active ? 'active' : 'inactive']

class TimerStore {
    @observable id = Math.random()
    @observable status = 'standby'
    @observable dragging = false
    @observable draggable = false
    @observable wake = false
    @observable events = false
    @observable active = true
    @observable pinned = false
    @observable intercept = false
    @observable autocollapse = false
    @observable autocollapseTime = 3
    @observable hidden = false
    @observable side = BUBBLE_SIDE
    @observable x = BUBBLE_X
    @observable y = BUBBLE_Y

    @action
    _calcX () {
      return calcPosition(this.side, this.hidden, this.active)
    }

    @action
    setStatus = (status) => {
      const defaultValues = {
        draggable: false,
        wake: false,
        events: false,
        hidden: false,
        pinned: false
      }
      let diff
      switch (status) {
        case 'loading':
          diff = {
            ...defaultValues,
            status: 'loading'
          }
          break

        case 'standby':
          diff = {
            ...defaultValues,
            status: 'standby',
            draggable: true,
            wake: true,
            events: true
          }
          break

        case 'work':
          diff = {
            ...defaultValues,
            status: 'work',
            draggable: true,
            wake: true,
            events: true
          }
          break

        case 'workend':
          diff = {
            ...defaultValues,
            status: 'workend',
            draggable: true,
            wake: true,
            events: true,
            pinned: true
          }
          break

        case 'break':
          diff = {
            status: 'break',
            draggable: true,
            wake: true,
            events: true,
            hidden: false
          }
          break
        default:
          throw new Error(`Unknown status '${status}'`)
      }

      return Object.keys(diff).forEach(key =>
        (this[key] = diff[key]))
    }

    @action
    onDrag = () => {
      this.dragging = true
      this.events = false
    }

    @action
    onInertiaStart = () => {
      this.intercept = false
    }

    @action
    onDrop = (dx, dy) => {
      transaction(() => {
        this.dragging = false
        this.active = true
        this.events = true
        this.intercept = false
        // autocollapse behavior
        this.autocollapse = this.pinned ? this.autocollapse : true
        this.autocollapseTime = this.pinned ? this.autocollapseTime : 3
        // positioning
        this.y = Math.round(this.y + dy)
        const x = Math.round(this.x + dx)
        this.side = calcSide(x)
        this.x = this._calcX()
      })
    }
}

const store = window.store = new TimerStore()

export default store
