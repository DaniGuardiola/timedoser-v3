import { observable, action } from 'mobx'
import * as $ from '../constants'

// ----------------
// constants

const BLOB_SIDE = 'right'
const BLOB_X = $.BLOB_POSITION[BLOB_SIDE].hidden
const BLOB_Y = $.TIMER_POSITION_Y_CENTER

class TimerStore {
    id = Math.random()
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
    @observable hidden = true
    @observable side = BLOB_SIDE
    @observable x = BLOB_X
    @observable y = BLOB_Y

    @action('set status')
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

const store = window.store = new TimerStore()

export default store
