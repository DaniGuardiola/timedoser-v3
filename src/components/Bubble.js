import React from 'react'
import styled from 'styled-components'

const BUBBLE_SIZE = 64

const BubbleContainer = styled.div`
  background-color: red;
  height: ${BUBBLE_SIZE}px;
  width: ${BUBBLE_SIZE}px;
  border-radius: 50%;
  box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
    0 4px 22px 3px rgba(0, 0, 0, 0.12),
    0 6px 7px -4px rgba(0, 0, 0, 0.4);`

export default function Bubble () {
  return (
    <BubbleContainer />
  )
}
