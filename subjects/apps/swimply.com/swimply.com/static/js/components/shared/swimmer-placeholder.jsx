import React from 'react'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

// material components
import { Typography} from '@material-ui/core'

// components
import ToggleRegion from './toggle-region'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './host-placeholder/styles'

// utils
import UserUtils from './../utilities/UserUtils'

// constants
import { REGIONS } from '../../constants'

function SwimmerPlaceholder ({ poolCountryCode, history, classes, withLogout, user, currentPoolId }) {
  const region = REGIONS.find(item => poolCountryCode.toLowerCase() === item.code)
  const userCountry = region ? region.displayName : 'Australian'

  function logout () {
    UserUtils.logout()
    history.push('/')
  }

  function proceedToPoolDetails() {
    if (userCountry === 'Australian') {
      history.replace('/au/search')
    } else {
      history.replace('/search')
    }
    history.push(`/pooldetails/${currentPoolId}`)
  }

  return (
    <Typography variant='body1' component='div' style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 8, paddingTop: '15%'}}>
      <div className={classes.placeholderContainer}>
        <p>
          {withLogout && <span className={`${classes.link} ${classes.logout}`} onClick={logout}>LOG OUT</span>}
          You are an {userCountry} {user}, do you want to
          <ToggleRegion>
            <span className={classes.link} onClick={proceedToPoolDetails}>
              switch to the {userCountry} website?
            </span>
          </ToggleRegion>
        </p>
      </div>
    </Typography>
  )
}

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withRouter
)

export default enhance( SwimmerPlaceholder )