import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// materials components
import Button from '@material-ui/core/Button'

// styles
import styles from './styles'

class CommonButton extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { classes, onClick, disabled, children } = this.props

    return (
      <Button
        variant='text'
        disabled={disabled}
        onClick={onClick}
        className={`${disabled ? classes.disable : classes.button}`}>
        {children}
      </Button>
    )
  }
}

CommonButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

CommonButton.defaultProps = {
  classes: {},
  onClick: () => {},
  disabled: false,
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(CommonButton)
