import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// styles
import styles from './styles'

class ProgressBar extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.progress} style={{ transform: `translateX(${this.props.percentage}%)`}} />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
}

ProgressBar.defaultProps = {
  percentage: 0,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(ProgressBar)
