import React, { Component } from 'react'

// components
import Verification from '../template'

export default class FirstStep extends Component {
  render () {
    return (
      <Verification
        step={1}
        title='Upload ID page'
        description='Make sure the picture is clear and matches your username'
      />
    )
  }
}
