import React, {Component, useContext} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'

// components
import HostPlaceholder from '../../shared/host-placeholder'
import BackButton from '../../commons/back-button'
import Loader from '../../commons/pageloader'

// services
import HelperService from '../../../services/helper'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'

// contexts
import UserContext from '../../../contexts/UserContext'
import RegionContext from '../../../contexts/RegionContext'

// materials component
import { Typography } from '@material-ui/core'

// styles
import styles from './styles'

// graphql
const getReferralData = loader('../../../graphql/referral/getReferralData.graphql')

const actionsList = {
  'signed_up': 'Signed up',
  'first_booking': 'Made his first booking',
  'first_pool_booked': 'Had his first booking',
  'first_pool': 'Listed a pool'
}

class ReferralInfo extends Component {
  state = {
    loading: false,
    showHostPlaceholder: HelperService.handleHostPlaceholder(),
    info: null,
    referralLink: `${window.location.origin}/referral`
  }

  componentDidMount () {
    this.getReferralInfo()
  }

  getReferralInfo = () => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { getReferralData: info } } = await this.props.client.mutate({
          mutation: getReferralData,
        })

        this.setState({
          loading: false,
          referralLink: HelperService.createReferralLink(info.referral_token),
          info
        })
      } catch (e) {
        console.log('error', e)
        this.setState({ loading: false }, async () => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
          if (errorMsg === 'Unauthenticated.') {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.getReferralInfo()
            }
          }
        })
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  copyLink = (link, event) => {
    HelperService.copyToClipboard(link)
    HelperService.showTooltip(event.pageY, event.pageX, 'Copied')
  }

  render () {
    const { classes, user } = this.props
    const { info } = this.state

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder withLogout />
    }

    const isHost = user && user.roles && user.roles[0].name === 'Host'

    const balance = info && info.balance ? info.balance : 0
    const referredPeople = info && info.referred_people ? info.referred_people : 0
    const referredPools = info && info.referred_pools ? info.referred_pools : 0

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={`${classes.alignItemsCenter} ${classes.spaceBetween}`}>
              <BackButton />
            </div>
            <div className={`${classes.flexColumn} ${classes.marginVertical}`}>
              <img
                className={classes.bankIcon}
                src={window.location.origin + '/img/screens/profile/colored-swimply-bank.png'}
                alt='Bank Icon'
              />
              <h2 className={classes.title}>{isHost ? 'Invite friends to book your pool!' : 'Swimply Bank'}</h2>
              <p className={`${classes.alignItemsCenter} ${classes.reduceMargin}`}>
                <span className={classes.dollar}>$</span>
                <span className={classes.credits}>{balance}</span>
              </p>
            </div>
            <div className={classes.textAlignCenter}>
              <p className={`${classes.text} ${classes.info}`}>
                {
                  isHost ?
                    `Share a link with your friends and we will give them their first $5 on the house. Invite a host and you will both get a $50 bonus after their first booking!`
                    : `Refer friends to Swimply! Get $5 for every friend you invite (they will get $5 too) and another $45 if anyone of them becomes a host and get their first booking!`
                }
              </p>
            </div>
            <div className={classes.textAlignCenter}>
              <p className={`${classes.text} ${classes.linkTopText}`}>
                Tap to copy the link
              </p>
              <div
                className={classes.link}
                title={this.state.referralLink}
                onClick={this.copyLink.bind(this, this.state.referralLink)}
              >
                <p>
                  {this.state.referralLink.slice(0, 40)}
                  {this.state.referralLink.length > 40 ? '...' : ''}
                </p>
              </div>
            </div>
            <Typography variant='button' className={classes.inviteByEmail} onClick={() => this.props.history.push('/profile/invite-friends')}>
              Invite by email
            </Typography>
          </div>
          <div className={`${classes.innerContainer} mobile-without-margin`}>
            <div className={classes.referralInfoContainer}>
              <div className='referral people'>
                <p className='referral-text'>Referred people</p>
                <p className='referral-count'>{referredPeople}</p>
              </div>
              <div className='referral pools'>
                <p className='referral-text'>Referred pools</p>
                <p className='referral-count'>{referredPools}</p>
              </div>
            </div>
          </div>
          {
            this.state.info && this.state.info.referrals.length ?
              <div className={`${classes.innerContainer} mobile-without-margin`}>
                <h3 className={classes.sectionTitle}>HISTORY LIST</h3>
                <ul className={classes.historyList}>
                  {this.state.info.referrals.map((item, index) => {
                    return (
                      <li className='item' key={`history-${index}`}>
                        <div className='info'>
                          <p className='email'>{item.email}</p>
                          <p className='action'>{actionsList[item.action] || item.action}</p>
                        </div>
                        <p className='credits'>+ ${item.amount}</p>
                      </li>
                    )
                  })}
                </ul>
              </div> : null
          }
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}


ReferralInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

ReferralInfo.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

function ReferralInfoContainer (props) {
  const context = useContext(UserContext)
  const { region } = useContext(RegionContext)
  return <ReferralInfo region={region} {...context} {...props} />
}

export default enhance(ReferralInfoContainer)
