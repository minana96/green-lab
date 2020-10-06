/* global navigator */
import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import { BrowserRouter, Switch } from 'react-router-dom'
import { publicRoutes } from './routes'
import PublicRoute from './public-route'
import IncompletePoolInfoPopup from '../host/IncompletePoolInfoPopup'

// context
import { RouterContext } from './router-context'

// services
import LocationService from '../../services/location'

// constants
import { REGION_REGEXP } from '../../constants'
import UserUtils from '../utilities/UserUtils'
import LeaveUsEmailPopup from '../leave-us-email-popup/leaveUsEmailPopup'

import { loader } from 'graphql.macro'

const getAmenitiesListQuery = loader('../../graphql/host/getamenitieslistquery.graphql')

class Router extends Component {
  constructor (props) {
    super(props)
    this.state = {
      region: '',
      baseName: '',
      loading: true,
      showDiscountPopup: false,
      allAmenities: [],
      showHostPopup: false,
      poolId: '',
      hostName: '',
      userRole: 'swimmer',
      infoIsComplete: true,
      onPressSettings: () => {}
    }
    this.setRegion = this.setRegion.bind(this)
    this.replaceRegion = this.replaceRegion.bind(this)
    this.setShowDiscountPopup = this.setShowDiscountPopup.bind(this)
    this.showIncompleteHostPopup = this.showIncompleteHostPopup.bind(this)
    this.hideIncompleteHostPopup = this.hideIncompleteHostPopup.bind(this)
  }

  componentWillMount () {
    const currentRegion = UserUtils.getCurrentRegion()
    UserUtils.setCurrentRegion('')
    if (!window.location.pathname.match(REGION_REGEXP) && !currentRegion) {
      LocationService.getUserLocation().then((region) => {
        if (region === 'au') {
          this.setRegion(region, true)
        } else {
          // this.setState({ loading: false })
        }
      })
    } else {
      const region = currentRegion || window.location.pathname.match(REGION_REGEXP)[1]
      this.setRegion(region)
    }

    this.props.client.query({
      query: getAmenitiesListQuery,				
      fetchPolicy:"network-only"
    })
    .then((res) => {
      if(res.data.amenities !== null) {
        this.setState({ 
          allAmenities: res.data.amenities, 
          loading: false,	
        });					
      } else {
        this.setState({ loading: false });
      }
    }).catch((error) => {
      // let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
      this.setState({ 
        loading: false,
      })
    });	
  }

  setShowDiscountPopup () {
    this.setState({
      showDiscountPopup: true
    })
  }

  setRegion (region, withReplace) {
    this.setState({
      region,
      baseName: region === 'us' ? '' : 'au',
      loading: false
    }, () => {
      if (withReplace) {
       this.replaceRegion(region)
      }
    })
  }

  showIncompleteHostPopup (data) {
    UserUtils.setHostDataIncomplete()
    this.setState({
      poolId: data.lastPool,
      hostName: data.userName,
      userRole: data.userRole,
      infoIsComplete: data.infoIsComplete,
      onPressSettings: data.onPressSettings,
      showHostPopup: true
    })
  }

  hideIncompleteHostPopup () {
    this.setState({ showHostPopup: false })
  }

  replaceRegion (nextRegion) {
    const location = REGION_REGEXP.test(window.location.pathname) ?
      window.location.pathname.replace(REGION_REGEXP, `/${nextRegion}/`)
      : window.location.pathname.replace(/^/, `/${nextRegion}`)
    window.location.replace(location)
  }

  render () {
    return (
      <RouterContext.Provider value={{ region: this.state.region, showPopupCallback: this.setShowDiscountPopup, showIncompleteHostPopup: this.showIncompleteHostPopup, hideIncompleteHostPopup: this.hideIncompleteHostPopup, allAmenities: this.state.allAmenities }}>
        <BrowserRouter basename={`/${this.state.baseName}`}>
          <Switch>
            {publicRoutes.map(({
              key, exact, path, component, layout, allowedRoles,
            }) => (
              <PublicRoute
                key={key}
                exact={exact}
                path={path}
                component={component}
                layout={layout}
                allowedRoles={allowedRoles}
              />
            ))}
          </Switch>
        </BrowserRouter>
        {this.state.showDiscountPopup
          ? <LeaveUsEmailPopup />
          : null
        }
        {this.state.showHostPopup
          ? <IncompletePoolInfoPopup onPressSettings={this.state.onPressSettings} poolId={this.state.poolId} hostName={this.state.hostName} userRole={this.state.userRole} infoIsComplete={this.state.infoIsComplete} />
          : null
        }
      </RouterContext.Provider>
    )
  }
}

const enhance = compose(
  withApollo
)

export default enhance( Router )
