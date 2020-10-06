import React, { Component } from 'react'

// components
import Verification from '../template'

export default class FirstStep extends Component {
  render () {
    return (
      <Verification
        step={3}
        title='Finally! To be verified entirely you must have your first successful booking'
        description='The more verified you are, the more guests will trust your account and the higher you will appear in search results'
      />
    )
  }
}
