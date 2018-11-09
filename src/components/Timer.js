import React from 'react'
import styled from 'styled-components'
import Bubble from './Bubble'
import { useDrag } from '../modules/drag'
import { useCountdown } from '../state/countdown-store'
import * as $ from '../constants'
import store from '../state/timer-store'

const TimerDiv = styled.div`
  border: 2px solid red;
  width: ${$.TIMER_WIDTH}px;
  height: ${$.TIMER_HEIGHT}px;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: ${p => p.dragging ? 'none' : 'transform'};`

function Timer (props) {
  const [time] = useCountdown()

  useDrag(store)

  const style = {}
  !store.dragging && (style.transform = `translate(${store.x}px, ${store.y}px)`)

  return (
    <TimerDiv className='timer'
      dragging={store.dragging}
      x={store.x} y={store.y}
      style={style}>
      <Bubble store={store} time={time} />
    </TimerDiv>
  )
}

export default Timer
