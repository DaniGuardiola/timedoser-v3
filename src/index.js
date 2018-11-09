import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { observer } from 'mobx-react'
import Timer from './components/Timer'
import './fonts/fonts.css'

configure({
  enforceActions: 'always'
})

function App (props) {
  return (
    <Timer />
  )
}

const ObserverApp = observer(App)

ReactDOM.render(<ObserverApp />, document.getElementById('root'))
