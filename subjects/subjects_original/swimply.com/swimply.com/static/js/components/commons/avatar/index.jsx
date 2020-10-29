import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

// services
import HelperService from '../../../services/helper'

// materials components
import { Avatar } from '@material-ui/core'

// styles
import styles from './styles'

class UserAvatar extends Component {
  render() {
    const { classes, user, containerClass, verifiedIconSize, ...props } = this.props

    const isHost = user && user.roles && user.roles[0].name === 'Host'
    const isVerified = user && user.verifications && user.verifications.length
      && HelperService.isVerified(user && user.verifications, isHost, true)
    const verifiedPluses = user && user.verifications && user.verifications.length
      && HelperService.getVerifiedPluses(user && user.verifications, isHost, true)

    return (
      <div
        className={`${classes.container} ${containerClass}`}
      >
        {
          isVerified ?
            <div className={`verified ${verifiedIconSize} ${verifiedPluses.length === 2 ? 'two-pluses' : ''}`}>
            {verifiedPluses}
          </div> : null
        }
        <Avatar
          {...props}
        />
      </div>
    )
  }
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  verifications: PropTypes.array,
  user: PropTypes.object,
  containerClass: PropTypes.string,
  verifiedIconSize: PropTypes.string,
}

UserAvatar.defaultProps = {
  classes: {},
  verifications: [],
  user: {},
  containerClass: '',
  verifiedIconSize: '',
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(UserAvatar)
