import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// styles
import styles from './styles'

class StepProgressBar extends Component {
  render () {
    let { classes, steps, completedSteps } = this.props
    steps = Array.from(Array(steps).keys())

    return (
      <div className={classes.container}>
        {
          steps.map((_, index) => {
            return (
              <div className={`step ${index <= completedSteps - 1 ? 'active' : ''}`} />
            )
          })
        }
      </div>
    )
  }
}

StepProgressBar.propTypes = {
  steps: PropTypes.number.isRequired,
  completedSteps: PropTypes.number.isRequired,
}

StepProgressBar.defaultProps = {
  steps: 3,
  completedSteps: PropTypes.number.isRequired,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(StepProgressBar)
