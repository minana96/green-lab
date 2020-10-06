import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchPool from './searchpool';
import ViewPool from './viewpool';
import { geolocated } from 'react-geolocated';
import UserUtils from './../utilities/UserUtils';
import { loader } from 'graphql.macro';
import Pageloader from './../commons/pageloader';
import { withApollo } from "react-apollo";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IS_US } from '../../config';


const verifyEmailMutation = loader('./../../graphql/user/verifyemail.graphql');
const getAddress = loader('./../../graphql/location/getAddress.graphql');

const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '0 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:980px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    }
  },
  headingHTwo: {
    '& span': {
      fontSize: "14px",
      float: "right",
      textTransform: "uppercase",
      cursor: "pointer",
      paddingRight: "0px",
      '&:hover': {
        color: theme.palette.common.blue,
      },
      '@media (max-width:767px)': {
        position: 'absolute',
        top: '20px',
        right: '14px',
      }
    },
    '& img': {
      paddingLeft: "5px",
      verticalLine: "middle",
    }
  },
  discoverySection: {
    position: "relative",
    padding: "50px 0",
    '& h3': {
      fontWeight: "500",
      margin: "0 0 5px",
      '& span': {
        float: "right",
        textTransform: "uppercase",
        '& img': {
          paddingRight: 10,
        },
      },
    }
  },
  subtitleSpacing: {
    marginBottom: "30px",
    marginTop: "5px",
  },
  verifySucc: {
    textAlign: 'center',
    padding: '25px 0',
    '& img': {
      maxWidth: '90px',
      marginBottom: '25px',
    }
  },
  verifySuccClose: {
    width: '31px',
    position: 'absolute',
    top: '4px',
    right: '6px',
    cursor: 'pointer'
  },
  discoverySectionPadding: {
    padding: '0 0 50px'
  }


});

class FindPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      currentLocation: '',
      loading: false,
      emailVerificationPopup: false,
      verifySuccess: false
    }

    this.closeVerifyPopup = this.closeVerifyPopup.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }


  componentDidMount() {
    window.scrollTo(0, 0);

    // preload image
    const img = new Image();
    img.src = window.location.origin + '/img/leave_us_email_popup.jpg';

    let referral_code_status = UserUtils.getReferralIdStatus();
    if (referral_code_status !== undefined && referral_code_status !== null && referral_code_status === 'referred') {
      UserUtils.removeReferralIdStatus();
      window.headerComponent.handleSignup();
    }

    this.getCurrentLocation();

    /*
    * Verify the email address
    */
    let verification_id = UserUtils.getVerifyEmailId();
    if (verification_id !== undefined && verification_id !== null && verification_id !== '') {
      UserUtils.removeVerifyEmailId()
      this.setState({
        loading: true
      })
      let data = {
        token: verification_id
      }
      this.props.client.mutate({
        mutation: verifyEmailMutation,
        variables: {
          data: data
        },
      })
        .then((res) => {
          if (res.data.verifyUserEmail.status === 'EMAIL_VERIFIED') {
            UserUtils.setAccessToken(res.data.verifyUserEmail.access_token);
            UserUtils.setRefreshToken(res.data.verifyUserEmail.refresh_token);
            UserUtils.setUserRole(res.data.verifyUserEmail.role[0].name);
            window.headerComponent.handleLogin();
            this.setState({
              emailVerificationPopup: true,
              verifySuccess: true,
              loading: false
            })
          } else {
            this.setState({
              emailVerificationPopup: true,
              verifySuccess: false,
              loading: false
            })
          }

        }).catch((error) => {
          this.setState({
            emailVerificationPopup: true,
            verifySuccess: false,
            loading: false
          });
        });

    }

  }

  getCurrentLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if(location) {
      location.getCurrentPosition(
        position => {
          this.props.client.query({
            query: getAddress,
            variables: {
              data: {
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude),
              }
            },
            fetchPolicy: 'network-only',
          }).then(({ data: { getAddress: address } }) => {
            this.setState({
              geo_location: address
            })
          }).catch((error) => {
            console.log('error', error.graphQLErrors)
            this.setState({
              geo_location: IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia'
            })
          })
        },
        error => {
          this.setState({
            geo_location: IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia'
          })
        }
      );
    } else {
      this.setState({
        geo_location: IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia'
      })
    }
  }

  closeVerifyPopup() {
    this.setState({
      emailVerificationPopup: false
    })
  }

  redirectSearchPage = () => {
    let { history } = this.props;
    let { geo_location } = this.state;
    if(geo_location) {
      UserUtils.setAddress(geo_location);
    } else {
      UserUtils.setAddress(IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia');
    }
    history.push('/search')
  }



  render() {
    const { classes } = this.props;
    let { loading, emailVerificationPopup, verifySuccess } = this.state;

    return (
      <Typography variant="body1" component={'span'} id='mainbody'>
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <div>
          <SearchPool redirectSearchPage={this.redirectSearchPage}/>
          <div className={classes.discoverySection + " " + classes.discoverySectionPadding}>
            <ViewPool redirectSearchPage={this.redirectSearchPage}/>
          </div>
        </div>
        <Dialog
          open={emailVerificationPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.calenderManegemetPop}>
            <DialogContentText id="alert-dialog-description">
              <div className={classes.verifySucc}>
                <img className={classes.verifySuccClose} src='img/close-button.png' alt='' onClick={this.closeVerifyPopup} />
                {verifySuccess === true ? <img alt='' src="img/verified.png" /> : <img alt='' src="img/close.png" />}
                <Typography variant="h3">{verifySuccess === true ? 'Your email verified successfully.' : 'Your email verification failed.'}</Typography>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Typography>
    )
  }
}

FindPool.propTypes = {
  classes: PropTypes.object.isRequired,
};

const geoLocation = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  geoLocation,
  withApollo
);

export default enhance(FindPool);


