import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// materials components
import Typography from '@material-ui/core/Typography'

// styles
import styles from './styles'

class ErrorMessage extends Component {
  render () {
    const { classes, message, hide } = this.props

    return (
      message && <div className={classes.errorMessageContainer}>
        <span className='close' onClick={hide}>x</span>
        <Typography variant='caption' component='p' className='message'>
          {message.slice(0, 200)}
          {message.length > 200 ? '...' : ''}
        </Typography>
      </div>
    )
  }
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  hide: PropTypes.func.isRequired,
  message: PropTypes.string,
}

ErrorMessage.defaultProps = {
  classes: {},
  hide: () => {},
  message: '',
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(ErrorMessage)
