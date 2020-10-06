import React, { useContext } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import { loader } from "graphql.macro";
import * as commonFunctions from "./../utilities/commonFunctions";
import { withRouter } from "react-router-dom";
import Pageloader from "../commons/pageloader";
import Location from "./location";
import ListingInfo from "./listinginfo";
import AmenitiesList from "./amenitieslist";
import PricingGuest from "./pricingguest";
import AmenitiesAdditional from "./amenitiesadditional";
import Dimensions from "./dimensions";
import Privacy from "./privacy";
import Rules from "./rules";
import Images from "./images";
import CancellationPolicy from "./cancellationpolicy";
import Payout from "./payout";
import Profile from "./profile";
import Completed from "./completed";
import UserUtils from "./../utilities/UserUtils";
import HelperService from '../../services/helper'
import HostPlaceholder from '../shared/host-placeholder'

// on-boarding components
import Availability from './on-boarding/availability'
import LearnHowBook from './on-boarding/learn-how-book'
import RequestsInstruction from './on-boarding/requests-instruction'
import MonthsSettings from './on-boarding/monts-settings'
import DailyCalendarManagement from '../editpool/dayilyCalendarManagement';

// contexts
import UserContext from '../../contexts/UserContext'

// graphql
const getProfileDetails = loader("./../../graphql/user/me.graphql");
const stripeConnect = loader('./../../graphql/user/stripeConnect.graphql');
const poolDetailsMutation = loader('./../../graphql/findpool/pooldetailsQuery.graphql')
const queryString = require('query-string');

const styles = theme => ({
  container: {
    maxWidth: "1170px",
    margin: "0 auto",
    width: "100%",
    padding: '0 15px',
    "@media (max-width:1170px)": {
      maxWidth: "992px"
    },
    "@media (max-width:1000px)": {
      maxWidth: "750px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)",
      position:'fixed',
      background: '#fff',
      zIndex: '9',
      top:'0',
      overflow:'auto',
      height:'100%',
    }
  },
  addPoolContainer: {
    maxWidth: "500px",
    padding: "60px 0",
    "@media (max-width:767px)": {
      padding: "20px 0 100px 0",
    }
  },
  initialWidth: {
    maxWidth: 'initial'
  },
  reducePadding: {
    padding: navigator.appVersion.indexOf("Chrome/") !== -1 ? '0' : '0 15px'
  }
});


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolData: {},
      completionProgress: 0,
      lastStep: 1,
      locationStatus: false,
      listingInfoStatus: false,
      pricingGuest: false,
      amenitiesListStatus: false,
      amenitiesAdditionalStatus: false,
      dimensionsStatus: false,
      privacyStatus: false,
      rulesStatus: false,
      imagesStatus: false,
      cancellationPolicyStatus: false,
      payoutStatus: false,
      profileStatus: false,
      completedStatus: false,
      profileImage: "",
      description: "",
      stripe_id: "",
      stripe_url: "",
      backBtnChange: false,
      isAnyPool:false,
      showHostPlaceholder: HelperService.handleHostPlaceholder(),
      showAvailabilityScreen: false,
      showLearnHowBookScreen: false,
      showRequestsInstructionScreen: false,
      showMonthsSettingsScreen: false,
      showManageCalendarScreen: false,
      availableMonths: [],
    };
  }
  componentDidMount() {
    let { history, location } = this.props;
    let parsed = queryString.parse(this.props.location.search);

    let { lastStep } = location.state || {}
    let completionProgress = (location.state && location.state.completionProgress) || 0

    if(parsed.code !== undefined && parsed.code !== '') {
      this.setState({
        lastStep,
        completionProgress,
        loading: true
      })
      this.props.client.mutate({
        mutation: stripeConnect,
        variables: {
          data: {
          "code":parsed.code
          }
        },
      })
      .then((res) => {
        if(res.data.saveConnectedAccount.status) {
          this.setState({
            loading: false,
            errorMessage:'',
            successMessage:res.data.saveConnectedAccount.message,
            stripe_id:'connected'
          });
          this.checkAddPoolDetails('payout');
          history.push('/addpool')
        } else {
          this.setState({
            loading: false,
            errorMessage:res.data.saveConnectedAccount.message,
            successMessage:''
          });
          this.checkAddPoolDetails('payout');
        }
      }).catch((error) => {
        console.log('error', error)
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          profileFailError: errorMsg,
          loading: false
        });
      });
    } else {
      this.checkAddPoolDetails();
    }
  }

  checkAddPoolDetails(type) {
    let status = UserUtils.getEditPoolStatus();
    let { location } = this.props;
    let lastStep = location.state && location.state.lastStep
    let completionProgress = (location.state && location.state.completionProgress) ||this.state.completionProgress || 0
    if (lastStep) {
      this.setState({
        [lastStep]: true,
        completionProgress
      })
    }

    if (!lastStep) {
      if (status !== null) {
        this.setState({ backBtnChange: true });
      }
      if (status === "listing_info") {
        this.setState({ listingInfoStatus: true });
      } else if (status === "images") {
        this.setState({ imagesStatus: true });
      } else if (status === "amenties") {
        this.setState({ amenitiesListStatus: true });
      } else if (status === "additional_amenties") {
        this.setState({ amenitiesAdditionalStatus: true });
      } else if (status === "pricing_guest") {
        this.setState({ pricingGuest: true });
      } else if (status === "cancellation_policy") {
        this.setState({ cancellationPolicyStatus: true });
      } else if (status === "rules") {
        this.setState({ rulesStatus: true });
      } else if (status === "privacy") {
        this.setState({ privacyStatus: true });
      } else if (status === "location") {
        this.setState({ locationStatus: true });
      } else if (status === "dimension") {
        this.setState({ dimensionsStatus: true });
      } else if (status === 'availability') {
        this.setState({ showAvailabilityScreen: true });
      } else {
        if(type === undefined) {
          this.setState({ locationStatus: true });
        }
      }
    }

    this.getProfileDetails(type)
    this.getPoolDetails()
  }

  getProfileDetails = (type) => {
    this.props.client
      .query({
        query: getProfileDetails,
        fetchPolicy: "network-only"
      })
      .then(res => {
        this.setState({
          profileImage: res.data.me.img_url || "",
          description: res.data.me.description || "",
          loading: false,
          stripe_id: res.data.me.stripe_id,
          stripe_url: res.data.me.stripe_connect_url,
          isAnyPool:res.data.me.isAnyPool,
          tutorial_status:res.data.me.tutorial_status
        });
        UserUtils.setUserID(res.data.me.id)
        if(type === 'payout') {
          this.setState({
            payoutStatus:true
          })
        }
        UserUtils.setUserCountry(res.data.me.country_code);
        UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
        UserUtils.setLastPoolId(res.data.me.last_pool_id);
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getProfileDetails(type)
          }
        }
      });
  }

  getPoolDetails = async () => { // refactored
    try {
      const poolId = parseInt(UserUtils.getHostPoolID(), 10)
      const { data: { pool: poolData }} = await this.props.client
        .query({
          query: poolDetailsMutation,
          variables: { id: poolId },
          fetchPolicy: 'network-only',
        })

      this.setState({ poolData })
    } catch (e) {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
      this.setState({ loading: false })
      if (errorMsg === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          this.getPoolDetails()
        }
      }
    }
  }

  handleLocation(locationStatus) {
    if (locationStatus === true) {
      this.setState({
        locationStatus: false,
        listingInfoStatus: true,
        isAnyPool:true,
      });
    } else {
      this.setState({
        locationStatus: true,
        listingInfoStatus: false,
        isAnyPool:true,
      });
    }
  }
  handleListingInfo(listingInfoStatus) {
    if (listingInfoStatus === true) {
      this.setState({
        amenitiesListStatus: true,
        listingInfoStatus: false
      });
    } else {
      this.setState({
        amenitiesListStatus: false,
        listingInfoStatus: true
      });
    }
  }
  handlePricingGuest(pricingGuestStatus) {
    let incompleteHostInfo = UserUtils.getHostDataIncomplete()
    if (incompleteHostInfo && (this.state.poolData && this.state.poolData.images && !this.state.poolData.images.length > 0)) {
      this.setState({
        imagesStatus: true,
        pricingGuest: false
      });
    } else if (incompleteHostInfo) {
      this.setState({
        showAvailabilityScreen: true,
        pricingGuest: false
      });
    } else {
      if (pricingGuestStatus === true) {
        this.setState({
          privacyStatus: true,
          pricingGuest: false
        });
      } else {
        this.setState({
          privacyStatus: false,
          pricingGuest: true
        });
      }
    }
  }
  handleAmenitiesList(amenitiesListStatus) {
    if (amenitiesListStatus === true) {
      this.setState({
        amenitiesAdditionalStatus: true,
        amenitiesListStatus: false
      });
    } else {
      this.setState({
        amenitiesAdditionalStatus: false,
        amenitiesListStatus: true
      });
    }
  }

  handleAmenitiesAdditional(dimensionsStatus) {
    if (dimensionsStatus === true) {
      this.setState({
        amenitiesAdditionalStatus: false,
        dimensionsStatus: true
      });
    } else {
      this.setState({
        amenitiesAdditionalStatus: true,
        dimensionsStatus: false
      });
    }
  }
  handleDimensions(privacyStatus) {
    if (privacyStatus === true) {
      this.setState({
        dimensionsStatus: false,
        pricingGuest: true
      });
    } else {
      this.setState({
        dimensionsStatus: true,
        pricingGuest: false
      });
    }
  }
  handlePrivacy(rulesStatus) {
    if (rulesStatus === true) {
      this.setState({
        privacyStatus: false,
        rulesStatus: true
      });
    } else {
      this.setState({
        privacyStatus: true,
        rulesStatus: false
      });
    }
  }
  handleRules(imagesStatus) {
    if (imagesStatus === true) {
      this.setState({
        rulesStatus: false,
        imagesStatus: true
      });
    } else {
      this.setState({
        rulesStatus: true,
        imagesStatus: false
      });
    }
  }
  handleImages(cancellationPolicyStatus) {
    let incompleteHostInfo = UserUtils.getHostDataIncomplete()
    if (incompleteHostInfo) {
      this.setState({
        showAvailabilityScreen: true,
        imagesStatus: false
      });
    } else if (this.state.completionProgress >= 14) {
      this.setState({
        completedStatus: true,
        imagesStatus: false
      });
    } else {
      if (cancellationPolicyStatus === true) {
        this.setState({
          imagesStatus: false,
          cancellationPolicyStatus: true
        });
      } else {
        this.setState({
          imagesStatus: true,
          cancellationPolicyStatus: false
        });
      }
    }
  }
  handleCancellationPolicy(payoutStatus) {
    this.setState({
      cancellationPolicyStatus: !payoutStatus,
      showAvailabilityScreen: payoutStatus
    })
  }

  handlePayout(profileStatus) {
    let incompleteHostInfo = UserUtils.getHostDataIncomplete()
    if (incompleteHostInfo) {
      this.setState({
        completedStatus: true,
        payoutStatus: false
      });
    } else {
      if (profileStatus === true) {
        this.setState({
          payoutStatus: false,
          profileStatus: true
        });
      } else {
        this.setState({
          payoutStatus: true,
          profileStatus: false
        });
      }
    }
  }

  handleProfile(completedStatus) {
    if (completedStatus === true) {
      this.setState({
        profileStatus: false,
        completedStatus: true
      });
    } else {
      this.setState({
        profileStatus: true,
        completedStatus: false
      });
    }
  }

  handleNextScreen = (prev, next) => {
    this.setState({
      [prev]: false,
      [next]: true,
      prevScreen: prev
    })
  }

  setAvailableMonths = (months = []) => {
    this.setState({
      availableMonths: months
    })
  }

  render() {
    const { classes } = this.props;
    const {
      backBtnChange,
      loading,
      locationStatus,
      listingInfoStatus,
      stripe_url,
      amenitiesListStatus,
      pricingGuest,
      amenitiesAdditionalStatus,
      dimensionsStatus,
      privacyStatus,
      rulesStatus,
      imagesStatus,
      cancellationPolicyStatus,
      payoutStatus,
      profileStatus,
      completedStatus,
      stripe_id,
      profileImage,
      description,
      isAnyPool,
      tutorial_status,
      showAvailabilityScreen,
      showLearnHowBookScreen,
      showRequestsInstructionScreen,
      showMonthsSettingsScreen,
      showManageCalendarScreen,
      prevScreen,
    } = this.state;

    if (this.state.showHostPlaceholder) {
      return <HostPlaceholder from={'addpool'} />
    }

    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={`${classes.container} ${showManageCalendarScreen ? classes.reducePadding : {}}`}>
          <div className={`${classes.addPoolContainer} ${showManageCalendarScreen ? classes.initialWidth : {}}`}>
            {locationStatus === true ? (
              <Location
                backBtnChange={backBtnChange}
                isAnyPool={isAnyPool}
                redirectToListingInfo={this.handleLocation.bind(this)}
              />
            ) : (
              ""
            )}
            {listingInfoStatus === true ? (
              <ListingInfo
                backBtnChange={backBtnChange}
                redirectToPricingGuest={this.handleListingInfo.bind(this)}
                redirectToLocation={this.handleLocation.bind(this)}
              />
            ) : (
              ""
            )}
            {amenitiesListStatus === true ? (
              <AmenitiesList
                backBtnChange={backBtnChange}
                redirectToAmenitiesAdditional={this.handleAmenitiesList.bind(
                  this
                )}
                redirectToPricingGuest={this.handleListingInfo.bind(this)}
              />
            ) : (
              ""
            )}
            {amenitiesAdditionalStatus === true ? (
              <AmenitiesAdditional
                backBtnChange={backBtnChange}
                redirectToDimensions={this.handleAmenitiesAdditional.bind(this)}
                redirectToAmenitiesList={this.handleAmenitiesList.bind(this)}
              />
            ) : (
              ""
            )}
            {dimensionsStatus === true ? (
              <Dimensions
                backBtnChange={backBtnChange}
                redirectToPrivacy={this.handleDimensions.bind(this)}
                redirectToAmenitiesAdditional={this.handleAmenitiesAdditional.bind(
                  this
                )}
              />
            ) : (
              ""
            )}
            {pricingGuest === true ? (
              <PricingGuest
                backBtnChange={backBtnChange}
                redirectToAmenitiesList={this.handlePricingGuest.bind(this)}
                redirectToListingInfo={this.handleDimensions.bind(this)}
              />
            ) : (
              ""
            )}
            {privacyStatus === true ? (
              <Privacy
                backBtnChange={backBtnChange}
                redirectToRules={this.handlePrivacy.bind(this)}
                redirectToDimensions={this.handlePricingGuest.bind(this)}
              />
            ) : (
              ""
            )}
            {rulesStatus === true ? (
              <Rules
                backBtnChange={backBtnChange}
                redirectToImages={this.handleRules.bind(this)}
                redirectToPrivacy={this.handlePrivacy.bind(this)}
              />
            ) : (
              ""
            )}
            {imagesStatus === true ? (
              <Images
                backBtnChange={backBtnChange}
                redirectToCancellationPolicy={this.handleImages.bind(this)}
                redirectToRules={this.handleRules.bind(this)}
              />
            ) : (
              ""
            )}
            {cancellationPolicyStatus === true ? (
              <CancellationPolicy
                backBtnChange={backBtnChange}
                redirectToPayout={this.handleCancellationPolicy.bind(this)}
                redirectToImages={this.handleImages.bind(this)}
              />
            ) : (
              ""
            )}
            {showAvailabilityScreen && <Availability
              isEditing={backBtnChange}
              handleNextScreen={this.handleNextScreen}
            />}
            {showLearnHowBookScreen && <LearnHowBook
              isEditing={backBtnChange}
              handleNextScreen={this.handleNextScreen}
              prevScreen={prevScreen}
            />}
            {showRequestsInstructionScreen && <RequestsInstruction
              isEditing={backBtnChange}
              handleNextScreen={this.handleNextScreen}
            />}
            {showMonthsSettingsScreen && <MonthsSettings
              isEditing={backBtnChange}
              handleNextScreen={this.handleNextScreen}
              setAvailableMonths={this.setAvailableMonths}
              prevScreen={prevScreen}
            />}
            {showManageCalendarScreen && <DailyCalendarManagement
              handleNextScreen={this.handleNextScreen}
              availableMonths={this.state.availableMonths}
              isAddPool
            />}
            {payoutStatus === true ? (
              <Payout
                backBtnChange={backBtnChange}
                stripe_id={stripe_id}
                stripe_url={stripe_url}
                redirectToProfile={this.handlePayout.bind(this)}
                redirectToCancellationPolicy={this.handleCancellationPolicy.bind(this)}
                handleNextScreen={this.handleNextScreen}
              />
            ) : (
              ""
            )}
            {profileStatus === true ? (
              <Profile
                backBtnChange={backBtnChange}
                profileImage={profileImage}
                description={description}
                stripe_id={stripe_id}
                stripe_url={stripe_url}
                redirectToCompletedStatus={this.handleProfile.bind(this)}
                redirectToPayout={this.handlePayout.bind(this)}
                handleNextScreen={this.handleNextScreen}
              />
            ) : (
              ""
            )}
            {completedStatus === true ? <Completed tutorial_status={tutorial_status}/> : ""}
          </div>
        </div>
      </Typography>
    );
  }
}
Results.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

function ResultsContainer (props) {
  const userContext = useContext(UserContext)
  return <Results {...userContext} {...props} />
}

export default enhance(ResultsContainer);
