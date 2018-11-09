import { observable, action, decorate } from 'mobx'
import * as $ from '../constants'

// ----------------
// constants

const BLOB_SIDE = 'right'
const BLOB_X = $.BLOB_POSITION[BLOB_SIDE].hidden
const BLOB_Y = $.TIMER_POSITION_Y_CENTER

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
    hidden = true
    side = BLOB_SIDE
    x = BLOB_X
    y = BLOB_Y

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

  setStatus: action

})

const store = window.store = new TimerStore()

export default store
