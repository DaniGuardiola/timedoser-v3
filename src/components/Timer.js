import React from 'react'
import Bubble from './Bubble'
import { useDrag } from '../modules/drag'
import { useCountdown } from '../state/countdown-store'

function Timer (props) {
  const { store, store: {
    draggable
    // status,
    // active,
    // dragging,
    // x,
    // y,
    // onBlobClick,
    // onMouseLeave
  } } = props

  const [time] = useCountdown()
  useDrag(draggable)

  return (
    <div className='timer'>
      <Bubble store={store} time={time} />
    </div>
  )
}

export default Timer
