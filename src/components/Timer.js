import React, { useEffect } from 'react'
import styled from 'styled-components'
import Bubble from './Bubble'
import { useDrag } from '../modules/drag'
import { useCountdown } from '../modules/countdown'
import * as $ from '../constants'
import { observer } from 'mobx-react-lite'
import logSequence from '../logSequence'

const TimerDiv = styled.div`
  border: 2px solid red;
  width: ${$.TIMER_WIDTH}px;
  height: ${$.TIMER_HEIGHT}px;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: ${p => p.dragging ? 'none' : 'transform'};`

let n = 0

function Timer (props) {
  const { store } = props

  useEffect(() => store.setStatus('work'), [])
  const [time] = useCountdown()

  n++

  logSequence(`> ${n} - render`)

  const [debugStyle, debugLog] = useDrag({
    class: '.timer',
    handleClass: '.bubble',
    onDrag: store.onDrag,
    onDrop: store.onDrop,
    onInertiaStart: store.onInertiaStart,
    draggable: store.draggable,
    dragging: store.dragging,
    y: store.y,
    x: store.x,
    n
  })

  const style = {}

  const posX = store.x - $.BUBBLE_MARGIN_LEFT
  const posY = store.y - $.BUBBLE_MARGIN_TOP

  !store.dragging && (style.transform = `translate(${posX}px, ${posY}px)`)

  if ((!!style.transform !== !!debugStyle.transform) ||
  (style.transform && style.transform !== debugStyle.transform)) {
    logSequence(`> ${n} - style difference`)
    console.log('> DIFFERENCE!')
    console.log('style', style)
    console.log('debugStyle', debugStyle)
    console.log({ posX, posY, dragging: store.dragging })
    console.log(debugLog)
  }

  return (
    <TimerDiv
      className='timer'
      dragging={store.dragging}
      style={debugStyle}>
      <Bubble store={store} time={time} />
    </TimerDiv>
  )
}

export default observer(Timer)
