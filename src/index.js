import React from 'react'
import ReactDOM from 'react-dom'
// import { configure } from 'mobx'
import { observer } from 'mobx-react'
import Timer from './components/Timer'
import './fonts/fonts.css'
import store from './state/timer-store'
import * as test from './constants'

Object.keys(test).map(k => console.log(`${k}: `, test[k]))

// configure({
//   enforceActions: 'always'
// })

function App (props) {
  console.log('App >', store.y)
  const fakeStore = {
    y: store.y,
    x: store.x,
    dragging: store.dragging
  }
  return (
    <Timer test123 fakeStore={fakeStore} />
  )
}

const ObserverApp = observer(App)

ReactDOM.render(<ObserverApp />, document.getElementById('root'))
