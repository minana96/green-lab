import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// styles
import styles from './styles'

class Toggle extends Component {
  render() {
    const { toggled, classes, onToggle, withCheckMark } = this.props

    return (
      <div
        onClick={onToggle}
        className={`
          ${classes.toggleContainer}
          ${toggled ? 'toggled' : ''}
          ${withCheckMark ? 'check-mark-icon' : ''}
        `}
      >
        <div className='toggle-slider-button' />
      </div>
    )
  }
}

Toggle.propTypes = {
  classes: PropTypes.object.isRequired,
  toggled: PropTypes.bool,
  withCheckMark: PropTypes.bool,
  onToggle: PropTypes.func,
}

Toggle.defaultProps = {
  classes: {},
  toggled: false,
  withCheckMark: true,
  onToggle: () => {},
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(Toggle)
