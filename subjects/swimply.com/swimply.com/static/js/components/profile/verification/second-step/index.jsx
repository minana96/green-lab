import React, { Component } from 'react'

// components
import Verification from '../template'

export default class FirstStep extends Component {
  render () {
    return (
      <Verification
        step={2}
        title='Verify pool ownership'
        description='Upload a utility bill with the same name address as your pool listing'
      />
    )
  }
}
