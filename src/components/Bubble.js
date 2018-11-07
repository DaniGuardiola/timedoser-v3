import React from 'react'
import styled from 'styled-components'
import BubbleFaces from './BubbleFaces'
import { observer } from 'mobx-react'

const BUBBLE_SIZE = 64

const BubbleContainer = styled.div`
  height: ${BUBBLE_SIZE}px;
  width: ${BUBBLE_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
    0 4px 22px 3px rgba(0, 0, 0, 0.12),
    0 6px 7px -4px rgba(0, 0, 0, 0.4);`

const Bubble = observer(function Bubble (props) {
  console.log('BUBBLE!!')
  console.log(props)
  const { time, store } = props
  const { status, active, dragging, draggable, onClick } = store
  console.log(status)
  return (
    <BubbleContainer onClick={onClick}>
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
