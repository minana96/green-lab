import React, { useContext, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import compose from 'recompose/compose'

// context
import { RouterContext } from '../../router/router-context'

// styles
import styles from './styles'

// utils
import UserUtils from '../../utilities/UserUtils'

// constants
import { REGION_REGEXP } from '../../../constants'

export function ToggleRegion ({ classes, children, from }) {
  const context = useContext(RouterContext)
  const [region, setRegion] = useState(context.region)

  function toggleRegion (prevRegion) {
    let needToRedirect = UserUtils.getHostDataIncomplete()
    const nextRegion = prevRegion !== 'au' ? 'au' : 'us'
    UserUtils.setCurrentRegion(nextRegion).then(() => {
      const location = REGION_REGEXP.test(window.location.pathname)
        ? window.location.pathname.replace(REGION_REGEXP, `${nextRegion === 'us' ? '/' : '/au/'}`)
        : window.location.pathname.replace(/^/, `${nextRegion === 'us' ? '/' : '/au'}`)
      setRegion(nextRegion)
      if (from === 'addpool' && needToRedirect) {
        let url=(nextRegion === 'us' ? '/' : '/au/') + 'host'
        window.location.replace(url)
      } else {
        window.location.replace(location)
      }
    })
  }

  if (children) {
    return (
      <span onClick={toggleRegion.bind(null, region)}>
        {children}
      </span>
    )
  }

  return (
    <div
      className={classes.regionToggleContainer}
      onClick={toggleRegion.bind(null, region)}
    >
      <span className={`toggle ${region === 'au' ? 'active' : ''}`}/>
      <span className={`margin ${region !== 'au' ? 'active' : ''}`}>US</span>
      <span className={region === 'au' ? 'active' : ''}>AU</span>
    </div>
  )
}

const enhance = compose(
  withStyles(styles),
)

export default enhance(ToggleRegion)
