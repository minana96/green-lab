import React, { useContext } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import Pageloader from "./../commons/pageloader";
import { withRouter } from "react-router-dom";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import _ from 'lodash';
import Progress from 'react-progressbar'

// utils
import * as commonFunctions from './../utilities/commonFunctions'
import UserUtils from './../utilities/UserUtils'

// components
import HostPlaceholder from '../shared/host-placeholder'
import ConnectStripeButton from '../commons/connect-stripe-button'

// constants
import { POOL_SCREENS } from '../../constants'
import { IS_SHVIMPLY } from '../../config'

// services
import HelperService from '../../services/helper'
import StripeService from '../../services/stripe'

// contexts
import UserContext from '../../contexts/UserContext'
import SocialIcons from "../shared/social-icons";

// graphql
const getProfileDetails = loader('./../../graphql/user/me.graphql')
const myPoolQuery = loader("./../../graphql/host/mypool.graphql");

const styles = theme => ({
  container: {
    maxWidth: "1170px",
    margin: "0 auto",
    width: "100%",
    padding: "0 15px",
    "@media (max-width:1170px)": {
      maxWidth: "992px"
    },
    "@media (max-width:1000px)": {
      maxWidth: "750px"
    },
    "@media (max-width:767px)": {
      width: "calc(100% - 30px)"
    }
  },
  hostContainer: {
    padding: "60px 0",
    "& h2": {
      marginBottom: "25px",
      "& span": {
        fontSize: "12px",
        float: "right",
        padding: "7px 25px",
        '@media (max-width:767px)': {
          display: 'none',
        }
      }
    }
  },
  noPools: {
    display: "flex",
    alignItems: "center",
    "& figure": {
      marginLeft: "0",
      marginRight: "25px",
      "& img": {
        maxWidth: "100px"
      }
    },
    '@media (max-width:767px)': {
      display: "table",
      textAlign: 'center',
    }
  },
  hostPools: {
    maxWidth: "500px",
    minHeight: 'calc(100vh - 240px)',
    "& p": {
      fontWeight: "300	"
    }
  },
  myPoolBox: {
    position: 'relative',
    "& figure": {
      margin: "0",
      position: "relative",
      minHeight: "50px",
      "& span": {
        position: "absolute",
        bottom: "20px",
        left: "15px",
        padding: "4px 20px",
        fontSize: "13px"
      }
    },
    "& img": {
      width: "100%",
      borderRadius: '4px'
    },
    "& h3": {
      marginTop: "15px"
    },
    "& p": {
      marginTop: "7px"
    }
  },
  accorodianBox: {
    "& ul": {
      listStyle: "none",
      paddingLeft: "0",
      marginRight: "5px",
      marginTop: "10px",
      "& li": {
        padding: "12px 15px",
        border: "1px solid #ccc",
        borderBottom: "0",
        cursor: "pointer",
        "&:last-child": {},
        "& i": {
          fontSize: "22px",
          float: "right",
          color: '#7b858b'
        },
        '& .fa-exclamation-circle': {
          float: 'left',
          color: 'red',
          fontSize: 20
        },
        "& .creditIcon": {
          float: 'left !important',
          marginRight: 8,
          color: theme.palette.common.blue
        },
        "& img": {
          maxWidth: "23px",
          verticalAlign: "middle",
          marginTop: "-2px",
          marginRight: "5px"
        }
      }
    }
  },
  connectStripe: {
    color: 'red',
    display: 'flex',
    justifyContent: 'space-between',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& .with-margin': {
        marginRight: 10
      }
    }
  },
  greenBtn: {
    background: '#008000'
  },
  redBtn: {
    background: '#ff0000'
  },
  lastLink: {
    borderBottom: "1px solid #ccc  !important"
  },
  contentBox: {
    borderBottom: "1px solid #ccc"
  },
  mobileBtnAdd: {
    display: 'none',
    '@media (max-width:767px)': {
      display: 'block',
      marginTop: '25px',
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  finishListingPoolContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div img.image': {
      marginRight: '8px'
    }
  },
  stepperContainer: {
    flexDirection: 'column',
  },
  stepperNew: {
    padding: '0',
    maxWidth: '375px',
    width: '100%',
    background: '#f3f5f5',
    '& div': {
      height: '5px !important'
    },
  },
  progressLabel: {
    fontSize: 11,
    color: 'gray',
    margin: '0px !important',
    alignSelf: 'flex-start'
  }
});

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe_url: null,
      stripe_id: null,
      realStripeAccount: false,
      myPools: [],
      lastStep: null,
      loading: false,
      hostError: "",
      lastPoolId: null,
      showHostPlaceholder: HelperService.handleHostPlaceholder(),
      lastPoolLastStep: null
    };
    this.redirectToAddPool = this.redirectToAddPool.bind(this);
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.redirectToStripeDashboard = this.redirectToStripeDashboard.bind(this);
    this.redirectToStripe = this.redirectToStripe.bind(this);
    this.getMissingDetails = this.getMissingDetails.bind(this);
  }
  componentDidMount() {
    this.getProfileDetails()
    this.getPoolDetails()
  }

  getPoolDetails = () => {
    this.setState({ loading: true })
    this.props.client
      .query({
        query: myPoolQuery,
        fetchPolicy: "no-cache"
      })
      .then(res => {
        if (res.data.myPools !== null) {
          this.setState({
            myPools: res.data.myPools,
            loading: false,
            showHostPlaceholder: HelperService.handleHostPlaceholder(),
            incompleteHostData: UserUtils.getHostDataIncomplete() || null,
            lastPoolLastStep: res.data.myPools[0].last_step
          });
        } else {
          this.setState({
            loading: false,
            myPools: [],
            showHostPlaceholder: HelperService.handleHostPlaceholder()
          });
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          loading: false,
          hostError: errorMsg
        });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getPoolDetails()
          }
        }
      });
  }

  getProfileDetails () { // TODO will need to handle placeholder with context.
    this.setState({ loading: true })
    this.props.client.query({
      query: getProfileDetails,
      fetchPolicy: 'network-only'
    })
      .then((res) => {
        UserUtils.setUserCountry(res.data.me.country_code)
        UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer)
        UserUtils.setLastPoolId(res.data.me.last_pool_id)
        if (res.data.me.notify_olden) {
          UserUtils.removeHostDataIncomplete()
        }
        this.setState({
          loading: false,
          showHostPlaceholder: HelperService.handleHostPlaceholder(),
          stripe_url: res.data.me.stripe_connect_url,
          stripe_id: res.data.me.stripe_id,
          lastPoolId: res.data.me.last_pool_id,
          realStripeAccount: res.data.me.stripe_account_onboard
        })
      }).catch((error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error)
        this.setState({ loading: false }, async () => {
          if (errorMsg === 'Unauthenticated.') {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.getProfileDetails()
            }
          }
        })
    })
  }

  redirectToAddPool() {
    let { history } = this.props;
    let { myPools } = this.state;
    UserUtils.removeEditPoolStatus();
    UserUtils.removeHostPoolID();
    if (myPools.length > 0) {
      history.push("/addpool");
    } else {
      history.push("/hostprompt");
    }
  }
  redirectToEditPool(id) {
    let { history } = this.props;
    UserUtils.setHostPoolID(id);
    history.push("editpool");
  }

  goToFinishListingYourPool = (lastScreenKey, poolId) => {
    const lastStep = POOL_SCREENS.find(screen => screen.key === lastScreenKey).value
    UserUtils.setHostPoolID(poolId)
    this.props.history.push({
      pathname: '/addpool',
      state: { lastStep, completionProgress: this.state.lastPoolLastStep }
    })
  }

  getPercentage = (lastStep, data) => {
    let totalSteps = 14
    let resultPercentage = parseInt((100 / totalSteps) * lastStep)

    let imagesStep = POOL_SCREENS.find(screen => screen.value === 'imagesStatus').key

    if (!data.images.length && lastStep > imagesStep) {
      resultPercentage = resultPercentage - parseInt(100 / totalSteps)
      data.actualStep = 9
    }

    if (this.state.incompleteHostData) {
      data.actualStep = 3
      if (data.last_step > imagesStep) {
        resultPercentage = resultPercentage - (parseInt(100 / totalSteps) * 5)
      } else if (data.last_step > 3) {
        resultPercentage = resultPercentage - parseInt(100 / totalSteps)
      } else {
        resultPercentage = parseInt((100 / totalSteps) * data.last_step)
      }
    }

    return resultPercentage
  }

  showFinishListingYourPool = (lastStep, data) => {
    let showFinishListing = typeof lastStep === 'number' && !isNaN(lastStep) && lastStep < 14
    if (!data.images.length) {
      showFinishListing = true
      data.actualStep = 9
    } 
    if (this.state.incompleteHostData) {
      showFinishListing = true
      data.actualStep = 3
    }
    if (lastStep < 2) {
      data.actualStep = 2
    }
    return showFinishListing
  }

  redirectToStripeDashboard() {
    StripeService.redirectToStripeDashboard()
  }

  getMissingDetails(step, actualStep, data) {
    let missingThings = ''

    if (!data.images.length) {
      missingThings = ' images'
    }
    let needToCompleteHost = this.state.incompleteHostData
    if (step < 2) {
      missingThings = ' pool name, images, pricing, availability'
    } else if ((step < 3 || actualStep < 3 || needToCompleteHost) && !data.images.length) {
      missingThings = ' images, pricing, availability'
    } else if (step < 3 || actualStep < 3 || needToCompleteHost) {
      missingThings = ' pricing, availability'
    }
    return missingThings
  }
  
  redirectToStripe() {
		let { stripe_url } = this.state;
		stripe_url = stripe_url+'&redirect_uri='+window.location.href;
		window.open(stripe_url,'_self');
	}

  render() {
    const { classes } = this.props;
    const { loading, myPools, showHostPlaceholder } = this.state;

    if (showHostPlaceholder) {
      return <HostPlaceholder />
    }

    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.hostContainer}>
          <div className={classes.container}>
            <div className={classes.hostPools}>
              <Typography variant="h2">
                My Pools
                <Typography variant="button" onClick={this.redirectToAddPool}>
                  Add a pool
                </Typography>
              </Typography>
              {myPools.length === 0 ? (
                <div className={classes.noPools}>
                  <figure>
                    <img alt="" src="/img/ONB-EnjoySwimming.png" />
                  </figure>
                  <p>Begin earning an effortless income by adding your pool to {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}!</p>
                </div>
              ) : (
                  <div className={classes.myPools}>
                    {myPools.map((data, poolIndex) => {
                      let status = "";
                      if (data.status === 0) {
                        status = "PENDING INSPECTION";
                      } else if (data.status === 1 || data.status === 5) {
                        status = "Active";
                      } else if (data.status === 2 || data.status === 6) {
                        status = "PENDING SWIMPLY APPROVAL";
                      } else if (data.status === 3) {
                        status = "INACTIVE";
                      } else {
                        status = "PENDING APPROVAL";
                      }

                      let coverImage = _.filter(data.images, { 'cover': true });
                      if (coverImage.length >= 1) {
                        coverImage = coverImage[0].url;
                      } else {
                        coverImage = '';
                      }

                      return (
                        <div key={poolIndex}>
                          {data.status === 4 ? (
                            ""
                          ) : (
                              <div className={classes.myPoolBox}>
                                <div className="social-icons-absolute top right">
                                  <SocialIcons
                                    poolId={data.id}
                                    userRole="host"
                                    poolStatus={data.status}
                                  />
                                </div>
                                <figure>
                                  <img alt="" src={coverImage === '' ? "/img/default-pool.png" : coverImage} />

                                  <Typography className={(status === 'PENDING INSPECTION' || status === 'PENDING APPROVAL' || status === 'PENDING SWIMPLY APPROVAL') ? classes.greenBtn : (status === 'INACTIVE') ? classes.redBtn : ''} variant="button" >{status}</Typography>
                                </figure>
                                <Typography variant="h3">
                                  {data.title === ""
                                    ? ""
                                    : data.title}
                                </Typography>
                                <p>
                                  {data.full_address}
                                </p>
                                <div className={classes.accorodianBox}>
                                  <ul>
                                    {this.showFinishListingYourPool(data.last_step, data) &&
                                    <li className={classes.finishListingPoolContainer} onClick={this.goToFinishListingYourPool.bind(this, (parseInt(data.actualStep) || data.last_step + 1), data.id)}>
                                      <div className={classes.flex}>
                                        <img className='image' alt='Finish Listing Your Pool' src='/img/finish_listing_your_pool.png' />
                                        <div className={`${classes.flex} ${classes.stepperContainer}`}>
                                          <span>Finish Listing Your Pool {`(${this.getPercentage(data.last_step, data)}%)`}</span>
                                          <p className={classes.progressLabel}>Missing: {this.getMissingDetails(data.last_step, data.actualStep, data)}</p>
                                          <Progress completed={this.getPercentage(data.last_step, data)} className={classes.stepperNew} color='#22bfea' />
                                        </div>
                                      </div>
                                      <i className="fa fa-angle-right"/>
                                    </li>}
                                    <li
                                      onClick={this.redirectToEditPool.bind(
                                        this,
                                        data.id
                                      )}
                                    >
                                      <img alt="" src="/img/Pool-Details.png" /> Edit
                                      Pool Details <i className="fa fa-angle-right" />
                                    </li>
                                    {this.state.stripe_id
                                      ? (this.state.realStripeAccount
                                        ? <li onClick={this.redirectToStripeDashboard}>
                                          <i className={`${classes.customColor} creditIcon fas fa-credit-card`} />
                                          View payments
                                          <i className="fa fa-angle-right" />
                                        </li>
                                        : <li onClick={this.redirectToStripeDashboard} style={{color: 'red'}}>
                                          <i className={`${classes.customColor} creditIcon fas fa-credit-card`} />
                                          Setup your Stripe account
                                          <i className="fa fa-angle-right" />
                                        </li>
                                    ):(
                                      <ConnectStripeButton>
                                        <li className={classes.connectStripe}>
                                          <div>
                                            <i className={`${classes.customColor} creditIcon fas fa-credit-card`} />
                                            Connect to Stripe
                                          </div>
                                          <div>
                                            <i className="fa fa-exclamation-circle with-margin" />
                                            <i className="fa fa-angle-right" />
                                          </div>
                                        </li>
                                      </ConnectStripeButton>
                                    )}
                                    <Link to={"/daily-calendar-management/" + data.id}>
                                      <li>
                                        <img alt="" src="/img/Date-Active.png" />{" "}
                                        Manage Calendar{" "}
                                        <i className="fa fa-angle-right" />
                                      </li>
                                    </Link>
                                    {/*{data.createdBy.tutorial_status === true?(*/}
                                    {/*  <Link to={"/calendar-management/" + data.id}>*/}
                                    {/*    <li>*/}
                                    {/*      <img alt="" src="/img/Date-Active.png" />{" "}*/}
                                    {/*      Manage Availability{" "}*/}
                                    {/*      <i className="fa fa-angle-right" />*/}
                                    {/*    </li>*/}
                                    {/*  </Link>*/}
                                    {/*):(*/}
                                    {/*  <Link to={"/tutorial/" + data.id}>*/}
                                    {/*    <li>*/}
                                    {/*      <img alt="" src="/img/Date-Active.png" />{" "}*/}
                                    {/*      Manage Availability{" "}*/}
                                    {/*      <i className="fa fa-angle-right" />*/}
                                    {/*    </li>*/}
                                    {/*  </Link>*/}
                                    {/*)}*/}

                                    <Link to="/host-reservation">
                                      <li className={classes.lastLink}>
                                        <img alt="" src="/img/starr-n.png" /> Manage
                                        Reservations <i className="fa fa-angle-right" />
                                      </li>
                                    </Link>
                                  </ul>
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
            <Typography variant="button" className={classes.mobileBtnAdd} onClick={this.redirectToAddPool}>
              Add a pool
            </Typography>

          </div>
        </div>
      </Typography>
    );
  }
}
Host.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

function HostContainer (props) {
  const userContext = useContext(UserContext)
  return <Host {...userContext} {...props} />
}

export default enhance(HostContainer);
