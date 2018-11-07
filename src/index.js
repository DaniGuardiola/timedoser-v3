import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { observer } from 'mobx-react'
import timerStore from './state/timer-store'
import Timer from './components/Timer'
import Countdown from './modules/countdown'
import './fonts/fonts.css'

configure({
  enforceActions: 'always'
})

const countdownStore = new Countdown()

function App (props) {
  const { time: t2, face: f2, active, dragging, draggable, onClick } = props
  console.log({ t2, f2, active, dragging, draggable, onClick })

  return (
    <Timer
      timerStore={props.timerStore}
      countdownStore={countdownStore} />
  )
}

const ObserverApp = observer(App)

ReactDOM.render(<ObserverApp timerStore={timerStore} />, document.getElementById('root'))
