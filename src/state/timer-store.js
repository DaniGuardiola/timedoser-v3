import { observable, action, decorate } from 'mobx'
import * as $ from '../constants'

// ----------------
// constants

const BUBBLE_SIDE = 'left'
const BUBBLE_X = $.BUBBLE_POSITION[BUBBLE_SIDE].hidden
const BUBBLE_Y = $.TIMER_POSITION_Y_CENTER

// ----------------
// utils

const calcSide = x =>
  x + $.BUBBLE_DIAMETER / 2 < window.screen.availWidth / 2 ? 'left' : 'right'

const calcPosition = (side, hidden, active) =>
  $.BUBBLE_POSITION[side][hidden ? 'hidden' : active ? 'active' : 'inactive']

class Timer {
    id = Math.random()
    status = 'standby'
    dragging = false
    draggable = false
    wake = false
    events = false
    active = true
    pinned = false
    intercept = false
    autocollapse = false
    autocollapseTime = 3
    hidden = false
    side = BUBBLE_SIDE
    x = BUBBLE_X
    y = BUBBLE_Y

    _calcX () {
      return calcPosition(this.side, this.hidden, this.active)
    }

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

    onDrag = () => {
      this.dragging = true
      this.events = false
    }

    onInertiaStart = () => {
      this.intercept = false
    }

    onDrop = (e) => {
      console.log(e.dx, e.dy)
      this.active = true
      this.dragging = false
      this.events = true
      this.intercept = false
      this.autocollapse = this.pinned ? this.autocollapse : true
      this.autocollapseTime = this.pinned ? this.autocollapseTime : 3
      const x = Math.round(this.x + 0)
      this.y = Math.round(this.y + 0)
      this.side = calcSide(x)
      this.x = this._calcX()
    }
}

const TimerStore = decorate(Timer, {
  id: observable,
  status: observable,
  dragging: observable,
  draggable: observable,
  wake: observable,
  events: observable,
  active: observable,
  pinned: observable,
  intercept: observable,
  autocollapse: observable,
  autocollapseTime: observable,
  hidden: observable,
  side: observable,
  x: observable,
  y: observable,

  setStatus: action,
  onDrag: action,
  onInertiaStart: action,
  onDrop: action
})

const store = window.store = new TimerStore()

export default store
