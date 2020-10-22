import React from 'react'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

// material components
import { Typography} from '@material-ui/core'

// components
import ToggleRegion from '../toggle-region'

// styles
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

// utils
import UserUtils from '../../utilities/UserUtils'

// constants
import { REGIONS } from '../../../constants'

function HostPlaceholder ({ history, classes, withLogout, from}) {
  const countryCode = UserUtils.getUserCountry()
  const region = REGIONS.find(item => countryCode.toLowerCase() === item.code)
  const userCountry = region ? region.displayName : 'Australian'

  function logout () {
    UserUtils.logout()
    history.push('/')
  }

  return (
    <Typography variant='body1' component='div'>
      <div className={classes.placeholderContainer}>
        <p>
          {withLogout && <span className={`${classes.link} ${classes.logout}`} onClick={logout}>LOG OUT</span>}
          You are an {userCountry} host, do you want to
          <ToggleRegion from={from}>
            <span className={classes.link}>
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

export default enhance( HostPlaceholder )
