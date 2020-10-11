import React, {Component, useContext} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import HostPlaceholder from '../../shared/host-placeholder'
import BackButton from '../../commons/back-button'

// constants
// import { IS_US } from '../../../config'

// contexts
import UserContext from '../../../contexts/UserContext'

// services
import HelperService from '../../../services/helper'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

class ContactUs extends Component {
  state = {
    showHostPlaceholder: HelperService.handleHostPlaceholder()
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { classes } = this.props

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    const rightBlueArrow = <i className={`${classes.rightBlueArrow} fa fa-angle-right`} aria-hidden='true' />

    const host = HelperService.isHost(this.props.user)

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={`${classes.alignItemsCenter} ${classes.spaceBetween}`}>
              <BackButton />
            </div>
            <h2 className={classes.title}>Contact us</h2>
            {/* {
              host ?  <a href={IS_US ? 'callto:+12122020472' : 'callto:+1098765567'} className={classes.item}>
                <p className={`${classes.beforeImage} call`}>Call us</p>
                <p className={classes.light}>{IS_US ? '+ 1 212 202 0472' : '+ 1 098 765 567'}</p>
                {rightBlueArrow}
              </a> : null
            } */}
            <a href={host ? 'mailto:HostCare@swimply.com' : 'mailto:info@swimply.com'} className={classes.item}>
              <p className={`${classes.beforeImage} email`}>Email us</p>
              <p className={classes.light}>
                {host ? 'HostCare@swimply.com' : 'info@swimply.com'}
              </p>
              {rightBlueArrow}
            </a>
          </div>
        </div>
      </Typography>
    )
  }
}


ContactUs.propTypes = {
  classes: PropTypes.object.isRequired,
}

ContactUs.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function ContactUsContainer (props) {
  const context = useContext(UserContext)
  return <ContactUs {...context} {...props} />
}

export default enhance(ContactUsContainer)
