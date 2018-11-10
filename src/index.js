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
  // ugly workaround don't look please
  // asked in gitter: https://gitter.im/mobxjs/mobx?at=5be62a2ee0fd6b4360cc19c2
  const stuff = {
    y: store.y,
    x: store.x,
    dragging: store.dragging
  }
  Object.isSealed(stuff)
  // ok you can look now

  return (
    <Timer />
  )
}

const ObserverApp = observer(App) // probably unnecessary

ReactDOM.render(<ObserverApp />, document.getElementById('root'))
