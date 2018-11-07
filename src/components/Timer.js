import React, { Component } from 'react'
import Bubble from './Bubble'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: {}
    }
  }

  componentDidMount () {
    const { countdownStore } = this.props
    countdownStore.configure({
      onLoop: e => this.setState({ time: e.remaining })
    })
    countdownStore.start(5)
  }

  render () {
    const { timerStore } = this.props
    const { time } = this.state

    return <Bubble store={timerStore} time={time} />
  }
}

export default Timer
