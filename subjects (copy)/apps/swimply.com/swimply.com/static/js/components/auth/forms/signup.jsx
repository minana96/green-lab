import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import compose from 'recompose/compose';
import { withRouter, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { loader } from 'graphql.macro';
import ReactTooltip from 'react-tooltip';
import Grid from '@material-ui/core/Grid';
import TagManager from 'react-gtm-module';
import Pageloader from '../../commons/pageloader';
import * as commonFunctions from '../../utilities/commonFunctions';
import UserUtils from '../../utilities/UserUtils';
import FacebookButton from "../FacebookButton";
import UserContext from "../../../contexts/UserContext";
import { IS_SHVIMPLY } from '../../../config'

// components
import AppleButton from '../AppleButton'
import AppContext from "../../../contexts/AppContext";

const signupMutation = loader( './../../../graphql/auth/signup.graphql' );

const styles = theme => ( {
  signupContainer: {},
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  formInputBox: {
    '& label + div ': {
      marginTop: '0',
      marginBottom: '0',
      width: '100%',
    },

    position: 'relative',
    marginBottom: '15px',
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: 'uppercase',
      fontSize: '12px',
      letterSpacing: '0.6px',
      marginBottom: '3px',
    },
    '& input': {
      background: theme.palette.common.gray,
      position: 'relative',
      width: '100%',
      padding: '10px 15px ',
      fontWeight: 'normal',
      border: '1px solid #f3f5f5',
      fontSize: '13px',
      borderRadius: '5px',

      '&:focus': {
        border: '1px solid #00ade2',
      },
    },
    '& span': {
      position: 'absolute',
      top: '3px',
      bottom: '0',
      margin: 'auto',
      height: '0px',
      left: '9px',
    },

  },
  CheckboxBottm: {
    position: 'relative',
    marginTop: '-10px',
    '& span:last-child': {
      color: '#787878',
      fontSize: '13px',
    },
    '& img': {
      position: 'absolute',
      top: '14px',
      bottom: '0',
      left: '28px',
      width: '18px',
    },
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    paddingRight: '5px',
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
  dialogBoxContainer: {
    padding: '15px 22px',

    '& h3': {
      padding: '15px 22px',

    },
  },
  dialogBox: {
    minWidth: '280px',
    '@media (max-width:767px)': {
      paddingBottom: '8px',

    },
    '@media (max-width:480px)': {
      minWidth: '200px',
    },

    '& > label': {
      marginBottom: '15px',
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  signupToHostBtn: {
    marginBottom: '10px',
    '& span': {
      color: theme.palette.common.black,
      background: theme.palette.common.transparent,
      border: '2px solid #00ade2',
      padding: '6px 15px',
    },
  },
  alreadyHaveAccount: {
    background: theme.palette.common.gray,
    padding: '15px',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
    '& label': {
      fontSize: '13px',
      '& span': {
        color: theme.palette.common.blue,
        textTransform: 'uppercase',
        fontWeight: '500',
        cursor: 'pointer',
        '@media (max-width:767px)': {
          fontSize: '16px',
        },
      },
      '& span:hover': {
        color: theme.palette.common.black,
      },
    },

  },
  mobileIcon: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontFamily: '"Poppins", sans-serif',
    color: theme.palette.common.darkgray,
    paddingBottom: '15px',
    '& i': {
      position: 'absolute',
      left: '10px',
      fontSize: '27px',
      top: '7px',
      color: theme.palette.common.blue,
      '& img': {
        maxWidth: '20px',
        marginTop: '10px',
        marginLeft: '15px',
      },
    },

  },
  modalCloseIcons: {
    position: 'absolute',
    right: '20px',
    cursor: 'pointer',
    top: '-6px',
    '& img': {
      maxWidth: '30px',
      filter: 'grayscale(1)',
    },
    '& img:hover': {
      filter: 'grayscale(0)',
    },
  },

  textFieldTwo: {
    background: '#f3f5f5',
    width: '100%',
    marginTop: 0,
  },
  errorMessage: {
    '& input': {
      border: '1px solid red',
      borderRadius: '5px',
    },
  },

  inputTooltip: {
    display: 'none',
  },
  inputTooltipError: {
    position: 'absolute',
    top: '20px',
    right: '11px',
    background: '#ccc',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolTipForms: {
    color: '#ffffff',
    backgroundColor: 'green',
    maxWidth: '240px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
  },
  checkBoxMessage: {
    '& svg': {
      fill: 'red',
    },
  },
  paddingLeftZero: {
    paddingLeft: '7px !important',
  },
  paddingRightZero: {
    paddingRight: '7px !important',
  },
  closeBtn: {
    float: 'right',
    fontSize: '18px',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '10px',
    margin: 'auto',
    height: '17px',
    color: '#ff6161',
  },
  errorMsgClose: {
    position: 'relative',
  },
  blueCloseBtn: {
    float: 'right',
    fontSize: '18px',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '10px',
    margin: 'auto',
    height: '17px',
    color: '#2399c4',
    cursor: 'pointer',
  },
  blueErrorMsgClose: {
    position: 'relative',
    padding: '10px 30px 10px 10px',
    fontSize: '12px',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    background: '#daf4fe',
    color: '#107ba5',
  },
  sinupLabelMain: {
    display: 'inline-block',
    marginLeft: '-14px',
    '& label': {
      fontSize: '13px',
      verticalAlign: 'middle',
      '@media (max-width:767px)': {
        color: '#989fa2',
      },
      '@media (max-width:360px)': {
        fontSize: '11px',
      },
    },
    '& a': {
      textDecoration: 'underline',
      color: 'inherit',
    },

  },
  orText: {
    textAlign: 'center',
    margin: '8px 0',
  }
} );

class Signup extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      zipcode: '',
      email: '',
      password: '',
      termsConditions: false,
      showFirstnameError: false,
      showLastnameError: false,
      showPhoneNumberError: false,
      showEmailError: false,
      showPasswordError: false,
      showTermsandConditionError: false,
      showFormErrorMessage: false,
      loading: false,
      signupFailError: '',
      errorMessage: ''
    };
    this.handleCloseError = this.handleCloseError.bind( this );
    this.handleFirstName = this.handleFirstName.bind( this );
    this.handleLastName = this.handleLastName.bind( this );
    this.handlePhoneNumber = this.handlePhoneNumber.bind( this );
    this.handleZipcode = this.handleZipcode.bind( this );
    this.handleEmail = this.handleEmail.bind( this );
    this.handlePassword = this.handlePassword.bind( this );
    this.handleTermsConditions = this.handleTermsConditions.bind( this );
    this.validateFirstName = this.validateFirstName.bind( this );
    this.validateLastName = this.validateLastName.bind( this );
    this.validatePhoneNumber = this.validatePhoneNumber.bind( this );
    this.validateEmail = this.validateEmail.bind( this );
    this.validatePassword = this.validatePassword.bind( this );
    this.validateTermsandCondition = this.validateTermsandCondition.bind( this );
    this.onSubmitSignup = this.onSubmitSignup.bind( this );
    this.handleModel = this.handleModel.bind( this );
    this.onSubmitSignupHost = this.onSubmitSignupHost.bind( this );
    this.redirectToLogin = this.redirectToLogin.bind( this );
    this.validateZipcode = this.validateZipcode.bind( this );
  }

  handleCloseError() {
    this.setState( { signupFailError: '' } );
  }

  handleFirstName( e ) {
    this.setState( { firstName: e.target.value } );
  }

  handleLastName( e ) {
    this.setState( { lastName: e.target.value } );
  }

  handlePhoneNumber( e ) {
    const re = /^[0-9\b]+$/;
    const { value } = e.target;
    if ( value === '' || re.test( value ) ) {
      const input = value.substring( 0, 13 );
      if ( input.length < 13 ) {
        this.setState( { phoneNumber: value } );
      }
    }
  }

  handleZipcode( e ) {
    this.setState( { zipcode: e.target.value } );
  }

  handleEmail( e ) {
    this.setState( {
      email: e.target.value,
      signupFailError: '',
    } );
  }

  handlePassword( e ) {
    this.setState( {
      password: e.target.value,
      signupFailError: '',
    } );
  }

  handleTermsConditions( e ) {
    let hasError = false;
    if ( e.target.checked === false ) {
      hasError = true;
    }
    this.setState( {
      showTermsandConditionError: ( hasError === true ),
      termsConditions: e.target.checked,
    } );
  }

  validateFirstName() {
    const { firstName, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( commonFunctions.isEmpty( firstName ) ) {
      hasError = true;
    }
    this.setState( {
      showFirstnameError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validateLastName() {
    const { lastName, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( commonFunctions.isEmpty( lastName ) ) {
      hasError = true;
    }
    this.setState( {
      showLastnameError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validateZipcode() {
    const { zipcode, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( commonFunctions.isEmpty( zipcode ) ) {
      hasError = true;
    } else if ( zipcode.length < 4 || zipcode.length > 10 ) {
      hasError = true;
    }

    this.setState( {
      showZipcodeError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validatePhoneNumber() {
    const { phoneNumber, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( phoneNumber.length > 13 ) {
      hasError = true;
    } else if ( phoneNumber.length < 10 ) {
      hasError = true;
    }
    this.setState( {
      showPhoneNumberError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validateEmail() {
    const { email, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( commonFunctions.isEmpty( email ) ) {
      hasError = true;
    } else if ( !commonFunctions.validateEmail( email ) ) {
      hasError = true;
    }
    this.setState( {
      showEmailError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validatePassword() {
    const { password, showFormErrorMessage } = this.state;
    let hasError = false;
    const minLength = 6;
    if ( commonFunctions.isEmpty( password ) ) {
      hasError = true;
    } else if ( !commonFunctions.isValidPassword( password, minLength ) ) {
      hasError = true;
    }
    this.setState( {
      showPasswordError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validateTermsandCondition() {
    const { termsConditions, showFormErrorMessage } = this.state;
    let hasError = false;
    if ( termsConditions === false ) {
      hasError = true;
    }
    this.setState( {
      showTermsandConditionError: ( hasError === true ),
      showFormErrorMessage: ( showFormErrorMessage === true ) && false,
    } );
    return hasError !== true;
  }

  validateForm() {
    let hasError = false;
    if ( !this.validateFirstName() ) {
      hasError = true;
    }
    if ( !this.validateLastName() ) {
      hasError = true;
    }
    if ( !this.validateZipcode() ) {
      hasError = true;
    }
    if ( !this.validatePhoneNumber() ) {
      hasError = true;
    }
    if ( !this.validateEmail() ) {
      hasError = true;
    }
    if ( !this.validatePassword() ) {
      hasError = true;
    }
    if ( !this.validateTermsandCondition() ) {
      hasError = true;
    }

    this.setState( {
      showFormErrorMessage: ( hasError === true ),
    } );
    return hasError !== true;
  }

  onSubmitSignup() {
    this.signupSubmit( 'Swimmer' );
  }

  onSubmitSignupHost() {
    this.signupSubmit( 'Host' );
  }

  signupSubmit( role ) {
    const {
      firstName, lastName, email, password, phoneNumber, zipcode,
    } = this.state;
    let referral_code = UserUtils.getReferralId();
    if ( referral_code === undefined || referral_code === null || referral_code === '' ) {
      referral_code = '';
    }

    const dataLayerData = {
      'first name': firstName,
      'last name': lastName,
      'customer email': email,
      'phone number': phoneNumber,
      'zip code': zipcode,
    };

    const referralToken = UserUtils.getReferralToken()

    const data = {
      firstname: firstName,
      lastname: lastName,
      email,
      zipcode,
      password,
      role,
      phone_number: phoneNumber,
      referral_code,
      referral_token: referralToken,
    };
    if ( !this.validateForm() ) {
      return;
    }
    this.setState( { loading: true } );
    this.props.client.mutate( {
      mutation: signupMutation,
      fetchPolicy: 'no-cache',
      variables: {
        data,
      },
    } )
      .then( ( res ) => {
        UserUtils.removeReferralId();
        UserUtils.removeReferralToken();
        UserUtils.setEmail(email);
        UserUtils.setAccessToken( res.data.signUp.access_token );
        UserUtils.setRefreshToken(res.data.signUp.refresh_token);
        UserUtils.setUserRole( res.data.signUp.role[0].name );
        UserUtils.setUserCountry( res.data.signUp.country_code );
        UserUtils.setSwimmerCountry( res.data.signUp.country_code_swimmer );
        this.setState( { loading: false, signupFailError: '' } );
        this.handleInviteReferals( email, firstName );
        this.props.handleUser();
        if ( role === 'Host' ) {
          TagManager.dataLayer( {
            dataLayer: dataLayerData,
            events: {
              HostAccount: 'HostAccount',
            },
          } );
          const { history } = this.props;
          history.push( '/hostprompt' );
        } else {
          TagManager.dataLayer( {
            dataLayer: dataLayerData,
            events: {
              SwimmerAccount: 'SwimmerAccount',
            },
          } );
          const currentPage = this.props.match.path;
          if ( currentPage === '/payment/:id' && window.setAccessToken !== undefined ) {
            window.setAccessToken();
          }
          this.props.handleSignUp( res.data, referral_code, firstName, email );
        }
        this.props.toggleJoyspaceModal(true);
      } ).catch( ( error ) => {
        console.log( 'error', error );
        const errorMsg = commonFunctions.parseGraphQLErrorMessage( error );
        this.setState( {
          signupFailError: errorMsg,
          loading: false,
        } );
      } );
  }

  handleInviteReferals( emailAddress, firstName ) {
    window.invite_referrals = window.invite_referrals || {};
    ( function () {
      window.invite_referrals.auth = {
        bid_e: '35B20B04DB28FDCEF3DCACD87B6962B5',
        bid: '26502',
        t: '420',
        email: emailAddress,
        userParams: { fname: firstName },
      };
      window.invite_referrals.async = true;
      const script = document.createElement( 'script' );
      script.src = '//cdn.invitereferrals.com/js/invite-referrals-1.0.js';
      const entry = document.getElementsByTagName( 'script' )[0];
      entry.parentNode.insertBefore( script, entry );
    }() );
  }

  handleModel() {
    this.props.handleSignupClose();
  }

  redirectToLogin() {
    this.props.openLoginDialog();
  }

  showErrorMessage = (errorMessage = '') => {
    this.setState({
      errorMessage
    })
  }

  render() {
    const { classes, page } = this.props;
    const {
      signupFailError, loading, firstName, lastName, phoneNumber, email, password, zipcode, termsConditions, showFirstnameError, showLastnameError, showPhoneNumberError, showEmailError, showPasswordError, showZipcodeError, showTermsandConditionError,
    } = this.state;
    return (
      <div className={classes.signupContainer}>
        {loading === true ? <Pageloader loading={loading} /> : ''}
        {page !== undefined && page === 'listYourPools' ? (
          <Typography variant="h3" component="h3">First, Lets create an account</Typography>
        ) : (
          <Typography variant="h3" component="h3">Sign up</Typography>
        )}

        {signupFailError === '' ? '' : (
          <Typography variant="caption" component="p" className={classes.errorMsgClose}>
            {signupFailError}
            <i
              className={`fa fa-close ${classes.closeBtn}`}
              onClick={this.handleCloseError}
            />
          </Typography>
        )}
        {this.state.errorMessage && (
          <Typography variant="caption" component="p" className={classes.blueErrorMsgClose}>
            {this.state.errorMessage}
            <i
              className={`fa fa-close ${classes.blueCloseBtn}`}
              onClick={this.showErrorMessage.bind(this, '')}
            />
          </Typography>
        )}
        <p onClick={this.handleModel} className={classes.modalCloseIcons}>
          <img
            src={`${window.location.origin}/img/close-button.png`}
            alt=""
          />
        </p>
        <DialogContent className={classes.dialogBox}>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={6} className={classes.paddingRightZero}>
              <div className={classes.formInputBox}>
                <Typography variant="subtitle2" component="label"> First name</Typography>
                <TextField
                  id="outlined-first-name-input"
                  placeholder=""
                  className={showFirstnameError === false ? classes.textField : classes.errorMessage}
                  type="text"
                  name="pool"
                  margin="normal"
                  variant="outlined"
                  value={firstName}
                  onChange={this.handleFirstName}
                  onBlur={this.validateFirstName}
                />
                <p
                  className={showFirstnameError === false ? classes.inputTooltip : classes.inputTooltipError}
                  data-tip="First name should not be empty."
                >
                  <i className="fa fa-info" />
                </p>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} className={classes.paddingLeftZero}>
              <div className={classes.formInputBox}>
                <Typography variant="subtitle2" component="label">Last name</Typography>
                <TextField
                  id="outlined-last-name-input"
                  placeholder=""
                  className={showLastnameError === false ? classes.textField : classes.errorMessage}
                  type="text"
                  name="pool"
                  margin="normal"
                  variant="outlined"
                  value={lastName}
                  onChange={this.handleLastName}
                  onBlur={this.validateLastName}
                />
                <p
                  className={showLastnameError === false ? classes.inputTooltip : classes.inputTooltipError}
                  data-tip="Last name should not be empty."
                >
                  <i className="fa fa-info" />
                </p>
              </div>
            </Grid>
          </Grid>
          <div className={classes.formInputBox}>
            <Typography variant="subtitle2" component="label">Email</Typography>
            <TextField
              id="outlined-email-input"
              placeholder=""
              className={showEmailError === false ? classes.textField : classes.errorMessage}
              type="text"
              name="pool"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={this.handleEmail}
              onBlur={this.validateEmail}
            />
            <p
              className={showEmailError === false ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Doesn't look like a valid email."
            >
              <i className="fa fa-info" />
            </p>
          </div>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={6} className={classes.paddingRightZero}>
              <div className={classes.formInputBox}>
                <Typography variant="subtitle2" component="label">PHONE NUMBER</Typography>
                <TextField
                  id="outlined-phone-number-input"
                  placeholder=""
                  className={showPhoneNumberError === false ? classes.textField : classes.errorMessage}
                  type="text"
                  name="pool"
                  margin="normal"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={this.handlePhoneNumber}
                  onBlur={this.validatePhoneNumber}
                />
                <p
                  className={showPhoneNumberError === false ? classes.inputTooltip : classes.inputTooltipError}
                  data-tip="Phone number should be 10-12 digits."
                >
                  <i className="fa fa-info" />
                </p>
              </div>
            </Grid>

            <Grid item xs={6} sm={6} className={classes.paddingLeftZero}>
              <div className={classes.formInputBox}>
                <Typography variant="subtitle2" component="label">ZIP CODE</Typography>
                <TextField
                  id="outlined-zipcode-input"
                  placeholder=""
                  className={showZipcodeError === false ? classes.textField : classes.errorMessage}
                  type="text"
                  name="pool"
                  margin="normal"
                  variant="outlined"
                  value={zipcode}
                  onChange={this.handleZipcode}
                  onBlur={this.validateZipcode}
                />
                <p
                  className={showZipcodeError === false ? classes.inputTooltip : classes.inputTooltipError}
                  data-tip="Doesn't look like a valid Zip Code."
                >
                  <i className="fa fa-info" />
                </p>
              </div>
            </Grid>
          </Grid>
          <div className={classes.formInputBox}>
            <Typography variant="subtitle2" component="label">Create password</Typography>
            <TextField
              id="outlined-password-input"
              placeholder=""
              className={showPasswordError === false ? classes.textField : classes.errorMessage}
              type="password"
              name="pool"
              margin="normal"
              variant="outlined"
              value={password}
              onChange={this.handlePassword}
              onBlur={this.validatePassword}
            />
            <p
              className={showPasswordError === false ? classes.inputTooltip : classes.inputTooltipError}
              data-tip="Password should contain minimum 6 characters."
            >
              <i className="fa fa-info" />
            </p>
          </div>
          <div className={classes.CheckboxBottm}>
            <FormControlLabel
              className={showTermsandConditionError === false ? classes.labelInstantBook : classes.checkBoxMessage}
              control={(
                <Checkbox
                  checked={termsConditions}
                  onChange={this.handleTermsConditions}
                  value="termsandcondition"
                  classes={{
                    root: classes.checkBox,
                    checked: classes.checked,
                  }}
                />
                  )}
            />
            <Typography className={classes.sinupLabelMain}>
              <label className={classes.sinupLabel}>
                I agree to <Link to="termsandconditions">Swimply Terms & Conditions.</Link>
              </label>
            </Typography>

          </div>
          {page !== undefined && page === 'listYourPools' ? (
            <div className={classes.signupBtn} onClick={this.onSubmitSignupHost}>
              <Typography variant="button">
                    Next
              </Typography>
            </div>
          ) : (
            <div>
              <div className={classes.signupBtn} onClick={this.onSubmitSignup}>
                <Typography variant="button">
                      Sign Up
                </Typography>
              </div>
              {/*<div className={classes.signupToHostBtn} onClick={this.onSubmitSignupHost}>*/}
              {/*  <Typography variant="button">*/}
              {/*        Sign up to host*/}
              {/*  </Typography>*/}
              {/*</div>*/}
              {!IS_SHVIMPLY && <Typography variant='p' component='label' className={classes.orText}>or</Typography>}
              {IS_SHVIMPLY ? null
                : <FacebookButton
                  handleSignUpScreen={this.props.handleSignUpScreen}
                  handleOauthLogin={this.props.handleOauthLogin}
                  showErrorMessage={this.showErrorMessage}
                />
              }
              {!IS_SHVIMPLY ? <AppleButton
                handleSignUpScreen={this.props.handleSignUpScreen}
                handleOauthLogin={this.props.handleOauthLogin}
                showErrorMessage={this.showErrorMessage}
              /> : null}
            </div>
          )}

        </DialogContent>
        <div className={classes.alreadyHaveAccount} onClick={this.redirectToLogin}>
          <Typography variant="h6" component="label">
Already have an account?
            <span> Login</span>
          </Typography>
        </div>
        <ReactTooltip place="top" className={classes.toolTipForms} type="error" effect="solid" />
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles( styles ),
  withRouter,
  withApollo,
);

function SignupContainer(props) {
  const appContext = useContext(AppContext)
  return (
    <UserContext.Consumer>
      {(context) => {
        return <Signup {...context} {...appContext} {...props} />
      }}
    </UserContext.Consumer>
  )
}

export default enhance( SignupContainer );
