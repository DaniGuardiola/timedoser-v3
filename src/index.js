import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import Timer from './components/Timer'
import './fonts/fonts.css'
import timerStore from './state/timer-store'
import * as test from './constants'

// Object.keys(test).map(k => console.log(`${k}: `, test[k]))

configure({
  enforceActions: 'always'
})

function App (props) {
  return (
    <Timer store={timerStore} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
