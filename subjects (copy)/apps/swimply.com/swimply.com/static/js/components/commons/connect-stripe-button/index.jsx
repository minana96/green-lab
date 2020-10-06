import React, { Component, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'

// materials components
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContent from '@material-ui/core/DialogContent'

// components
import Loader from '../../commons/pageloader'

// utils
import * as commonFunctions from '../../utilities/commonFunctions'

// styles
import styles from './styles'

// constants
import { US_REGION_REGEXP } from '../../../constants'

// contexts
import UserContext from '../../../contexts/UserContext'

// services
import StripeService from '../../../services/stripe'

// graphql
const accurateCountryMutation = loader('../../../graphql/host/accurateCountryMutation.graphql')
const getProfileDetails = loader('../../../graphql/user/me.graphql')

class ConnectStripeButton extends Component {
  state = {
    loading: false,
    showStripeCountrySelectPopup: false
  }

  handleError = (error, callback = () => {}) => {
    console.log('error', error)
    this.setState({
      loading: false,
      showStripeCountrySelectPopup: false
    }, async () => {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          callback()
        }
      } else {
        this.props.handleErrorMessage('Something went wrong.')
      }
    })
  }

  handleStripeCountrySelectPopup = (show) => {
    this.setState({
      showStripeCountrySelectPopup: show,
      country: this.props.user.country_code
    })
  }

  onSelect = ({ target: { value: country }}) => {
    this.setState({ country })
  }

  handleNewStripeUrl = () => {
    this.setState({ loading: true }, async () => {
      try {
        await this.props.client.mutate({
          mutation: accurateCountryMutation,
          variables: {
            data: {
              code: this.state.country
            }
          }
        })

        const { data: { me: user }} = await this.props.client.query({
          query: getProfileDetails,
          fetchPolicy: 'network-only'
        })

        this.setState({
          loading: false,
          showStripeCountrySelectPopup: false,
        }, () => {
          this.handleRedirect(user)
        })
      } catch (error) {
        this.handleError(error, this.handleNewStripeUrl)
      }
    })
  }

  connectStripeAccount = () => {
    if (this.props.user) {
      if (US_REGION_REGEXP.test(this.props.user.country_code)) {
        this.handleStripeCountrySelectPopup(true)
      } else {
        this.handleRedirect(this.props.user)
      }
    }
  }

  handleRedirect = (user) => {
    if (user.stripe_id && !user.stripe_account_onboard) {
      StripeService.redirectToStripeDashboard()
    } else {
      this.redirectToStripe(user.stripe_connect_url)
    }
  }

  redirectToStripe = (stripeUrl = '') => {
    stripeUrl = stripeUrl || this.state.stripe_url
    stripeUrl = stripeUrl+'&redirect_uri='+window.location.href
    window.open(stripeUrl,'_self')
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <div onClick={this.connectStripeAccount}>
          {this.props.children}
        </div>
        <Dialog className={classes.popup} keepMounted open={this.state.showStripeCountrySelectPopup}>
          <DialogContent className={classes.popupContainer}>
            <Typography variant='body1' component='div'>
              <p className={`${classes.subTitle}`}>
                Choose your country
              </p>
              <Select
                className={classes.select}
                value={this.state.country}
                onChange={this.onSelect}
              >
                <MenuItem value='US'>USA</MenuItem>
                <MenuItem value='CA'>CANADA</MenuItem>
              </Select>
            </Typography>
            <div className={classes.buttonsContainer}>
              <Typography
                variant='button'
                className={classes.okButton}
                onClick={this.handleNewStripeUrl}
              >
                Next
              </Typography>
              <Typography
                variant='button'
                className={classes.cancelButton}
                onClick={this.handleStripeCountrySelectPopup.bind(this, false)}
              >
                Cancel
              </Typography>
            </div>
          </DialogContent>
        </Dialog>
        {this.state.loading && <Loader loading />}
      </Fragment>
    )
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
)

function ConnectStripeButtonContainer (props) {
  const userContext = useContext(UserContext)
  return <ConnectStripeButton {...userContext} {...props} />
}


export default enhance(ConnectStripeButtonContainer)

ConnectStripeButton.propTypes = {
  client: PropTypes.shape({
    mutate: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

ConnectStripeButton.defaultProps = {
  client: {},
  classes: {},
  children: null
}
