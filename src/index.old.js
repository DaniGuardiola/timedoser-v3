// react
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

// redux
// import timer from '@state/actions/timer-bound'

// modules
// import timedoserWindow from '@module/window'
import Countdown from './modules/countdown'
import Bubble from './components/Bubble.js'
// import Wake from '@module/wake'
// import AutoCollapse from '@module/autocollapse'

const countdown = new Countdown({
  onLoop: e => onCountdownLoop(e)
})

function useCountdown () {
  useEffect(() => {

  })
}

// ----------------
// styles

const TimedoserDiv = styled.div`
  width: 100%;
  height: 100%;`

// ----------------
// timedoser react component

function App (props) {
  const [time, setTime] = useState({
    minutes: '--',
    seconds: '--',
    mm: '--',
    ss: '--',
    current: false
  })
  // // const { time, face, active, dragging, draggable, onClick } = props
  // const [face, setFace] = useState('loading')
  // const [active, setActive] = useState(false)

  // const wake = new Wake('.timer .blob', {
  //   fix: 28,
  //   onWakeup: () => this.onWakeup()
  // })

  // const autocollapse = new AutoCollapse({
  //   onCollapse: () => this.onAutocollapse()
  // })

  // const window = timedoserWindow

  // ----------------
  // status

  function startWork () {
    // timer.status('work')

    // const t = 5
    countdown.start(25, {
      onEnd: endWork,
      listeners: {
        // '25:00': () => timer.headsup(t, { pinned: true }),
        // '20:00': () => timer.headsup(t),
        // '15:00': () => timer.headsup(t),
        // '10:00': () => timer.headsup(t),
        // '05:00': () => timer.headsup(t),
        // '03:00': () => timer.headsup(t),
        // '02:00': () => timer.headsup(t),
        // '01:00': () => timer.headsup(t),
        // '00:30': () => timer.headsup(t),
        // '00:10': () => timer.headsup('infinite', { pinned: true })
      }
    })
  }

  function endWork () {
    console.log('Work ended.')
    // timer.status('workend', { pinned: true })
  }

  function startBreak () {
    console.log('Break started.')
    // timer.status('break')

    // const t = 5
    countdown.start(5, {
      onEnd: () => startWork(),
      listeners: {
        // '05:00': () => timer.headsup(t, { pinned: true }),
        // '04:00': () => timer.headsup(t),
        // '03:00': () => timer.headsup(t),
        // '02:00': () => timer.headsup(t),
        // '01:00': () => timer.headsup(t),
        // '00:30': () => timer.headsup(t),
        // '00:10': () => timer.headsup('infinite', { pinned: true })
      }
    })
  }

  // ----------------
  // event handlers

  function onBlobClick () {
    if (this.noClick) return

    switch (props.timer.status) {
      case 'standby':
        startWork()
        break
      case 'workend':
        startBreak()
        break
    }
  }

  function onMouseLeave () {
    // timer.collapse()
  }

  function onDragStart () {
    clearTimeout(this.noClickTimeout)
    this.noClick = true
    // timer.drag()
  }

  function onDragStop (e) {
    // timer.drop(e)
    this.noClickTimeout = setTimeout(() => (this.noClick = false), 30)
  }

  function onDragInertia () {
    // timer.inertia()
  }

  function onCountdownLoop (e) {
    const time = e.display
    setTime({ time })
  }

  function onWakeup () {
    // timer.wakeup()
  }

  function onAutocollapse () {
    // timer.collapse({
    //   autocollapse: false,
    //   pinned: false
    // })
  }

  // componentWillMount () {
  //   this.window
  //     .init()
  //     .then(() => timer.status('loading'))
  //     .delay(3000) // purely for the cool boot animation
  //     .then(() => timer.status('standby', {
  //       autocollapse: true
  //     }))
  // }

  // const {
  //   events,
  //   wake,
  //   intercept,
  //   x,
  //   y,
  //   autocollapse,
  //   autocollapseTime
  // } = props.timer

  // this.window.intercept(intercept)

  // this.wake.enabled(wake)
  // this.wake.intercept(!intercept && events)
  // if (!intercept && events) this.wake.refreshAsync(x, y)

  // this.autocollapse.set({ wait: autocollapseTime })
  // this.autocollapse.wait(autocollapse)

  return (
    <TimedoserDiv
      id='timedoser'
    >
      <Bubble
        // {...props.timer}
        time={time}
        onDragStart={onDragStart}
        onDragInertia={onDragInertia}
        onDragStop={onDragStop}
        onBlobClick={onBlobClick}
        onMouseLeave={onMouseLeave}
      />
    </TimedoserDiv>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
