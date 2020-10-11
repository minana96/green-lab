import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// styles
import styles from './styles'

class BackButton extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.backButton} onClick={this.goBack}>
        <i className='fa fa-angle-left' />
        <span>BACK</span>
      </div>
    )
  }
}

BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

BackButton.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter
)

export default enhance(BackButton)