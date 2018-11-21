import React, { useEffect } from 'react'
import styled from 'styled-components'
import Bubble from './Bubble'
import { useDrag } from '../modules/drag'
import { useCountdown } from '../modules/countdown'
import * as $ from '../constants'
import { observer } from 'mobx-react-lite'

// TODO: move transition styles to useDrag
const TimerDiv = styled.div`
  border: 2px solid red;
  width: ${$.TIMER_WIDTH}px;
  height: ${$.TIMER_HEIGHT}px;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: ${p => p.dragging ? 'none' : 'transform'};`

function Timer (props) {
  const { store } = props

  const [time] = useCountdown()

  const style = useDrag({
    class: '.timer',
    handleClass: '.bubble',
    onDrag: store.onDrag,
    onDrop: store.onDrop,
    onInertiaStart: store.onInertiaStart,
    draggable: store.draggable,
    dragging: store.dragging,
    y: store.y,
    x: store.x
  })

  return (
    <TimerDiv
      className='timer'
      dragging={store.dragging}
      style={style}>
      <Bubble store={store} time={time} />
    </TimerDiv>
  )
}

export default observer(Timer)
