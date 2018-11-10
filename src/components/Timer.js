import React, { useEffect } from 'react'
import styled from 'styled-components'
import Bubble from './Bubble'
import { useDrag } from '../modules/drag'
import { useCountdown } from '../modules/countdown'
import store from '../state/timer-store'
import { Observer } from 'mobx-react'
import * as $ from '../constants'
import { autorun } from 'mobx'

const TimerDiv = styled.div`
  border: 2px solid red;
  width: ${$.TIMER_WIDTH}px;
  height: ${$.TIMER_HEIGHT}px;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: ${p => p.dragging ? 'none' : 'transform'};`

function Timer (props) {
  const { fakeStore } = props
  useEffect(() => store.setStatus('work'), [])
  console.log(props)
  const [time] = useCountdown()

  useDrag(store)

  const style = {}

  // caculate position
  const posX = fakeStore.x - $.BUBBLE_MARGIN_LEFT
  const posY = fakeStore.y - $.BUBBLE_MARGIN_TOP

  !fakeStore.dragging && (style.transform = `translate(${posX}px, ${posY}px)`)

  console.log(fakeStore.dragging, fakeStore.x, fakeStore.y)

  return (
    <TimerDiv className='timer'
      dragging={fakeStore.dragging}

      style={style}>
      <Bubble store={store} time={time} />
    </TimerDiv>
  )
}

export default props => <Observer>{() => <Timer {...props} />}</Observer>

autorun(() => {
  console.log('AUTORUN!!')
  console.log(store.x)
})
