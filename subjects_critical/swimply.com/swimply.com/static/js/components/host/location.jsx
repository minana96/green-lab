import React, {useContext} from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withApollo } from "react-apollo";
import Pageloader from "../commons/pageloader";
import TextField from "@material-ui/core/TextField";
import PlacesAutocomplete, { geocodeByAddress }  from "react-places-autocomplete";
import { withRouter } from "react-router-dom";
import Stepper from "./stepper";
import { loader } from "graphql.macro";
import TagManager from 'react-gtm-module';
import * as commonFunctions from "./../utilities/commonFunctions";
import UserUtils from "./../utilities/UserUtils";

// config
import { IS_US } from '../../config'

// services
import HelperService from '../../services/helper'
import { sendAnalytics } from '../utilities/analyticsUtils';

// constants
import { STRIPE_SUPPORT_COUNTRIES_CODES, ADVANCE_NOTICES, AVAILABILITY_WINDOW } from '../../constants'

// contexts
import UserContext from '../../contexts/UserContext'

const locationHostMutation = loader(
  "./../../graphql/host/locationmutation.graphql"
);
const pooldetailsQuery = loader(
  "./../../graphql/findpool/pooldetailsQuery.graphql"
);
const changeRole = loader('./../../graphql/user/changerole.graphql')

const styles = theme => ({
  addPoolContainer: {
    "& p": {
      fontWeight: "100"
    }
  },
  formInputBox: {
    "& > div > div ": {
      padding: "0"
    },
    "& label + div ": {
      marginTop: "0",
      marginBottom: "0",
      width: "100%",
      "& :before": {
        content: "none"
      },
      "& :after": {
        content: "none"
      }
    },

    position: "relative",
    marginBottom: "20px",
    "& fieldset": {
      opacity: 0
    },

    "& label": {
      textTransform: "uppercase",
      fontSize: "12px",
      marginBottom: "5px",
      letterSpacing: "1px"
    },
    "& input": {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.5"
      }
    },
    "& textarea": {
      background: theme.palette.common.gray,
      padding: "10px 25px 10px 15px ",
      border: "1px solid #f3f5f5",
      fontSize: "13px",
      width: "calc(100% - 40px)",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #00ade2"
      },
      "&::placeholder": {
        color: "#000",
        opacity: "0.5"
      }
    }
  },
  backStep: {
    marginBottom: "10px",
    color: theme.palette.common.blue,
    fontWeight: "500",
    cursor: "pointer",
    "& a": {
      color: theme.palette.common.blue,
      fontWeight: "500"
    },
    "& i": {
      fontSize: "22px",
      verticalAlign: " text-bottom",
      marginRight: "3px",
      marginTop: "-1px"
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: "0px",
      "& i": {
        fontSize: "30px",
      }
    }
  },
  ContentContainer: {
    paddingTop: "15px",
    "& p": {
      fontWeight: "100",
      fontSize: "13px"
    }
  },
  formContainer: {
    maxWidth: "350px",
    paddingTop: "20px",
    '@media (max-width:767px)': {
      maxWidth: "100%",
    },

  },
  nextButton: {
    marginTop: "35px"
  },

  disableBtn: {
    background: "#ccc",
    width: "100%",
    padding: "10px 15px",
    cursor: "default",
    marginTop: "22px",
    "&:hover": {
      background: "#ccc"
    }
  },
  searchLocationPlaces: {
    marginBottom: '20px',
    '& > div': {
      width: '100%',
      margin: '0',
      '& > div': {
        '&:before': {
          display: 'none'
        },
        '&:after': {
          display: 'none'
        }
      },
      '& input': {
        width: '100%',
        background: '#f3f5f5',
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        fontSize: '13px',
        boxSizing: 'border-box',
        '&:focus': {
          outline: 'none'
        }
      },
      '& ul': {
        position: 'absolute',
        background: '#f3f5f5',
        color: '#000',
        listStyle: 'none',
        width: '100%',
        padding: '0',
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '5px',
        marginTop: '5px',
        zIndex: '9',
        maxHeight: '200px',
        overflow: 'auto',
        '&.active': {
          border: '1px solid #d7d9d9',
        },
        '& li': {
          textAlign: 'left',
          padding: '5px 20px',
          borderBottom: '1px solid #f9f9f9',
          maxHeight: '150px',
          overflowY: 'auto',
          fontSize: '13px',
          cursor: 'pointer',
          background: '#f5df36',
          '&:first-child': {
            paddingTop: '15px'
          },
          '&:last-child': {
            paddingBottom: '15px'
          },
          '&:hover': {
            background: '#ced0d0'
          },
          '&.suggestion-item--active': {
            background: '#ced0d0'
          },
        }
      }
    },
    '& i': {
      marginLeft: '-35px',
      color: '#000',
      zIndex: '1',
      fontSize: '20px',
      cursor: 'pointer'
    }
  },
  locationBottom: {
    fontSize: "13px",
    margin: '3px 0',
  },
  locationInput:{
  	position:'relative'
  },
  inputPlaceHolder:{
	position: 'absolute',
	paddingLeft: '15px',
	color: '#7e7f7f',
	fontSize: '13px',
	pointerEvents: 'none',
	top:'34px'
  },
  hiddenInputPlaceHolder:{
  	display:'none'
  },
  flexRow: {
    display: 'flex',
  },
  icon: {
    marginRight: 8,
    width: '16px',
    height: '21px',
  },
  blueBox: {
    margin: '10px 0',
    padding: '12px',
    border: `1px solid ${theme.palette.common.blue}`,
    '& p': {
      margin: '0'
    }
  },
});

class PoolLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 8.3,
      specialInstructions: "",
      fullAddress: "",
      placeHolderAddress: "",
      streetNumber: "",
      state: "",
      zipCode: "",
      route: "",
      city: "",
      loading: false,
      hostError: "",
      addressStatus: false,
      poolID: "",
      addressDetails: {},
      address: '',
      addressSelected: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSpecialInstructions = this.handleSpecialInstructions.bind(this);
    this.redirectToListingInfo = this.redirectToListingInfo.bind(this);
    this.redirectToBackBtn = this.redirectToBackBtn.bind(this);
    this.setSearchOptions = this.setSearchOptions.bind(this);
  }

  componentWillMount () {
    this.setSearchOptions()
  }

  componentDidMount() {
    let poolID = UserUtils.getHostPoolID();

    if (poolID) {
      this.setState({ loading: true });
      this.props.client
        .query({
          query: pooldetailsQuery,
          variables: {
            id: poolID
          },
          fetchPolicy: "network-only"
        })
        .then(res => {
          if (res.data.pool !== null) {
            const regex = /(<([^>]+)>)/ig;
            if (res.data.pool.special_access_instruction !== null && res.data.pool.special_access_instruction !== '') {
              res.data.pool.description = res.data.pool.special_access_instruction.replace(regex, '');
            }

            this.setState({
              fullAddress: res.data.pool.full_address,
              address: res.data.pool.full_address,
              placeHolderAddress: res.data.pool.full_address,
              specialInstructions: res.data.pool.special_access_instruction,
              poolID: poolID,
              loading: false,
              addressSelected: !!res.data.pool.full_address
            });
            UserUtils.setHostPoolID(res.data.pool.id);
          } else {
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loading: false,
            hostError: errorMsg
          });
        });
    }
  }
  setSearchOptions () {
    this.setState({
      searchOptions: {
        componentRestrictions: {
          country: IS_US ? STRIPE_SUPPORT_COUNTRIES_CODES : 'au'
        }
      }
    })
  }
  onChange (address) {
    this.setState({
      address,
      addressSelected: false
    })
  }
  onSelect(address) {
    this.setState({
      address,
      addressSelected: true
    });
  }
  handleSpecialInstructions(e) {
    this.setState({ specialInstructions: e.target.value });
  }

  async redirectToListingInfo() {
    let { specialInstructions, poolID, address } = this.state;
    let { backBtnChange, history } = this.props;
    this.setState({ loading: true });

    if (this.props.user.roles[0].name === 'Swimmer') {
      await this.convertToHost()
    }

    // TODO need to change to server request
    const results = await geocodeByAddress( address );

    const addressDetails = results[0].address_components
      ? HelperService.parseAddressComponents( results[0].address_components )
      : {};

    const data = {
      full_address: address || '',
      street_number: addressDetails.street_number || '',
      state: addressDetails.stateFullDetail && addressDetails.stateFullDetail.long_name ? addressDetails.stateFullDetail.long_name : '',
      zip_code: addressDetails.postal_code || '',
      route: addressDetails.route ? addressDetails.route : '',
      city: addressDetails.cityFullDetail && addressDetails.cityFullDetail.long_name ? addressDetails.cityFullDetail.long_name : '',
      pool_id: poolID,
      special_access_instruction: specialInstructions,
      advance_notice: ADVANCE_NOTICES[0].key,
      availability_window: AVAILABILITY_WINDOW[3].key,
    }

    this.props.client
      .mutate({
        mutation: locationHostMutation,
        variables: {
          data: data
        }
      })
      .then(async (res) => {
        UserUtils.setHostPoolID(res.data.savePoolLocation.pool_id);
        //Step 1 Save
        TagManager.dataLayer({
          dataLayer: {
            poolId: res.data.savePoolLocation.pool_id,
            address: data.full_address,
            City: data.city,
            State: data.state,
            ZIP: data.zip_code,
            specialInstructions:data.special_access_instruction
          },
          events: {
            RegistrationStep1: 'RegistrationStep1'
          }
        });

        if (backBtnChange === true) {
          history.push("editpool");
        } else {
          let locationStatus = true;
          this.props.redirectToListingInfo(locationStatus);
        }

        const fullAddressArr = address.split( ',' ).reverse()

        const analyticsData = {
          timestamp: new Date().toISOString(),
          'event_type': 'pool-location',
          fullAddress: address,
          country: fullAddressArr[0],
          city: fullAddressArr[IS_US ? 2 : 1],
          platform: 'web',
          location: IS_US ? 'US' : 'AU',
          userId: UserUtils.getUserID(),
          userRole: 'host',
        };
        sendAnalytics( this.props.client, analyticsData );
        UserUtils.setCreatePoolTime( new Date() );
        UserUtils.setCreatePoolIDEvent( res.data.savePoolLocation.pool_id );
        this.props.handleUser()
      })
      .catch(error => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error, 'debugMessage');
        this.setState({
          hostError: errorMsg,
          loading: false
        });
      });
  }

  convertToHost = async () => {
    try {
      const { data: { changeRole: data } } = await this.props.client
        .mutate({
          mutation: changeRole,
        })

      if (data.status) {
        this.setState({
          errorMessage: ''
        })
        this.props.handleUser({
          ...this.props.user,
          roles: [{ name: 'Host' }]
        })
        UserUtils.setUserRole('Host')
      } else {
        this.setState({
          loading: false,
          errorMessage: data.message
        })
      }
    } catch (error) {
      let errorMessage = commonFunctions.parseGraphQLErrorMessage(error)
      this.setState({
        loading: false,
        errorMessage,
      }, async () => {
        if (errorMessage === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.convertToHost()
          }
        }
      })
    }
  }

  redirectToBackBtn() {
    let status = UserUtils.getEditPoolStatus();
    let isAnyPool = this.props.isAnyPool;
    let { history } = this.props;
    if (status === "location") {
      history.push("editpool");
    } else {
      if (isAnyPool === true) {
        history.push("/host");
      } else {
        history.push("/hostprompt");
      }
    }
  }

  render() {
    const { classes, backBtnChange } = this.props;
    let {
      loading,
      activeStep,
      specialInstructions,
      hostError
    } = this.state;

    let re = /<\/?\w*>/g

    if (specialInstructions && specialInstructions.match(re)) {
      specialInstructions.match(re).map(item => {
        specialInstructions = specialInstructions.replace(item, '')
        return null
      })
    }

    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.locationMain}>
          <div className={classes.backStep} onClick={this.redirectToBackBtn}>
            <font>
              <i className="fa fa-angle-left" aria-hidden="true" /> BACK
            </font>
          </div>
          {backBtnChange === true ? "" : <Stepper activeStep={activeStep} />}
          <div className={classes.ContentContainer}>
            <Typography variant="h3">Where is your pool located?</Typography>
            {hostError === "" ? (
              ""
            ) : (
                <Typography variant="caption" component="p">
                  {hostError}
                </Typography>
              )}
          </div>
          <div className={classes.formContainer}>
            <div className={classes.formInputBox + " " + classes.searchLocationPlaces}>
              <Typography variant='subtitle2' component='label'>
                Enter Address
              </Typography>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.onChange}
                onSelect={this.onSelect}
                debounce={1000}
                shouldFetchSuggestions={this.state.address.length >= 2}
                // searchOptions={this.state.searchOptions}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps
                }) => {
                  return (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: 'e.g. 123 pacific ave',
                          className: 'location-search-input'
                        })}
                      />
                      <ul className={`autocomplete-dropdown-container ${suggestions.length ? 'active' : ''}`}>
                        {suggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item'
                          const style = suggestion.active
                            ? { backgroundColor: '#f3f5f5', cursor: 'pointer' }
                            : { backgroundColor: '#fff', cursor: 'pointer' }
                          return (
                            <li
                              key={`location-${index}`}
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <font>{suggestion.description}</font>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                }}
              </PlacesAutocomplete>
            </div>

            <div className={classes.formInputBox}>
              <Typography variant="subtitle2" component="label">
                Special access instructions
              </Typography>
              <TextField
                id="outlined-email-input"
                placeholder="e.g. Once you come up to the front door, you'll find a keypad on which you'll need to enter a combination..."
                type="text"
                name="email"
                autoComplete=""
                margin="normal"
                variant="outlined"
                fullWidth={true}
                multiline={true}
                rowsMax={8}
                rows={8}
                value={specialInstructions}
                onChange={this.handleSpecialInstructions}
              />
            </div>
            <div className={`${classes.flexRow} ${classes.blueBox}`}>
              <img className={classes.icon} alt='Light' src={`${window.location.origin}/img/icons/light_bulb.png`} />
              <p className={classes.locationBottom}>
                Address and access instructions will only be shown to confirmed guests.
              </p>
            </div>
            {this.state.address && this.state.addressSelected ? (
              <div className={classes.nextButton}>
                <Typography
                  variant="button"
                  onClick={this.redirectToListingInfo}
                >
                  {backBtnChange === true ? "Save" : "Next"}
                </Typography>
              </div>
            ) : (
                <Button variant="button" className={classes.disableBtn}>
                  Next
              </Button>
              )}
          </div>
        </div>
      </Typography>
    );
  }
}
PoolLocation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  withApollo,
  withRouter
);

function PoolLocationContainer (props) {
  const userContext = useContext(UserContext)
  return <PoolLocation {...userContext} {...props} />
}

export default enhance(PoolLocationContainer);
