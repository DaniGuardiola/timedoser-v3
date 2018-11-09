import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { observer } from 'mobx-react'
import timerStore from './state/timer-store'
import Timer from './components/Timer'
import './fonts/fonts.css'

configure({
  enforceActions: 'always'
})

function App (props) {
  return (
    <Timer store={props.timerStore} />
  )
}

const ObserverApp = observer(App)

ReactDOM.render(<ObserverApp timerStore={timerStore} />, document.getElementById('root'))
