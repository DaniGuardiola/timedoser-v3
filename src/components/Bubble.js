import React from 'react'
import styled from 'styled-components'
import BubbleFaces from './BubbleFaces'
import { observer } from 'mobx-react'
import * as $ from '../constants'

// pointer-events: ${this.props.active ? 'initial' : 'none'};
const BubbleContainer = styled.div`
  height: ${$.BUBBLE_DIAMETER}px;
  width: ${$.BUBBLE_DIAMETER}px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
    0 4px 22px 3px rgba(0, 0, 0, 0.12),
    0 6px 7px -4px rgba(0, 0, 0, 0.4);

  transition-duration: .4s;
  transition-timing-function: ease-in-out;

  transform: translate(${$.BUBBLE_MARGIN_LEFT}px, ${$.BUBBLE_MARGIN_TOP}px);

  overflow: hidden;
  border-radius: 50%;`

const Bubble = observer(function Bubble (props) {
  const { time, store } = props
  const { status, active, dragging, draggable, onClick } = store
  return (
    <BubbleContainer className='bubble' onClick={onClick}>
      <BubbleFaces
        time={time}
        face={status}
        active={active}
        dragging={dragging}
        draggable={draggable} />
    </BubbleContainer>
  )
})

export default Bubble
