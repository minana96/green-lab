import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { loader } from 'graphql.macro'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import moment from 'moment'

// components
import Loader from '../commons/pageloader'
import BackButton from '../commons/back-button'
import Avatar from '../commons/avatar'

// materials component
import { Typography } from '@material-ui/core'

// utils
import * as commonFunctions from '../utilities/commonFunctions'

// styles
import styles from './styles'

// graphql
const poolDetails = loader('../../graphql/findpool/pooldetailsQuery.graphql')

class HostInfo extends Component {
  state = {
    loading: false,
    host: null
  }

  componentDidMount () {
    this.handleData()
  }

  handleData = () => {
    const poolId = this.props.match.params && this.props.match.params.poolId
    if (poolId) {
      this.setState({ loading: true }, async () => {
        try {
          const { data: { pool }} = await this.props.client.query({
            query: poolDetails,
            variables: { id: parseInt(poolId) },
            fetchPolicy: 'network-only'
          })

          this.setState({
            loading: false,
          }, () => {
            if (pool) {
              this.setState({
                host: {
                  ...(pool.createdBy),
                  verifications: pool.owner_verifications,
                },
              })
            }
          })
        } catch (e) {
          console.log('error', e)
          let errorMessage = commonFunctions.parseGraphQLErrorMessage(e)
          this.setState({
            loading: false,
            errorMessage,
          })
        }
      })
    }
  }

  getProfileImage = (image) => {
    return image ? image : window.location.origin + '/img/profile-icon.png'
  }

  getJoinedYear = (host) => {
    if (host && host.created_at) {
      return moment(host.created_at).year()
    }
  }

  getName = (host) => {
    return `Hi, I'm ${host && host.firstname ? host.firstname : ''}`
  }

  render () {
    const { classes } = this.props
    const { host } = this.state

    return (
      <Typography variant='body1' component='div'>
        <div className={classes.container}>
          <div className={classes.innerContainer}>
            <div className={`${classes.alignItemsCenter} ${classes.spaceBetween}`}>
              <BackButton />
            </div>
            <div className={classes.avatarContainer}>
              <Avatar
                className='avatar'
                src={this.getProfileImage(host && host.img_url)}
                alt='Avatar'
                user={host}
              />
              <p className='name'>{this.getName(host)}</p>
            </div>
            {
              host && <ul className={classes.verifiedList}>
                {
                  host.verifications
                  && host.verifications[0]
                  && host.verifications[0].passport_drive_url
                  && host.verifications[0].img_id_approved
                    ? <li className='verified-item'>
                      Identity
                    </li> : null
                }
                {
                  host.verifications
                  && host.verifications[0]
                  && host.verifications[0].pool_proof_url
                  && host.verifications[0].img_proof_approved
                    ? <li className='verified-item'>
                      Title
                    </li> : null
                }
                {
                  host && host.email_verified_at
                    ? <li className='verified-item'>
                      Email
                    </li> : null
                }
                {
                  host.verifications && host.verifications[0] && host.verifications[0].successful_booking
                    ? <li className='verified-item'>
                      Successful hosting
                    </li> : null
                }
              </ul>
            }
            <p className={classes.description}>{host && host.description}</p>
            {host && host.created_at ? <p className={classes.createdAt}>Joined in {this.getJoinedYear(host)}</p> : null}
            <div className={classes.divider} />
          </div>
        </div>
        {this.state.loading && <Loader />}
      </Typography>
    )
  }
}

HostInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

HostInfo.defaultProps = {
  classes: {},
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
)

export default enhance(HostInfo)