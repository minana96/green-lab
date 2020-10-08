import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { geolocated } from "react-geolocated";
import { withApollo } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import UserUtils from "./../utilities/UserUtils";
import * as commonFunctions from "./../utilities/commonFunctions";
import styles from './style';
import PlacesAutocomplete  from "react-places-autocomplete";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { IS_US, IS_SHVIMPLY } from '../../config'
import { STRIPE_SUPPORT_COUNTRIES_CODES } from '../../constants'

class SearchPool extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      currentLocation: "",
      address: "",
      showSearchLocationError: false,
      showFormErrorMessage:false,
      onFocusGoogle:false,
      searchOptions: null
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSearchLocation = this.handleSearchLocation.bind(this);
    this.onFocusGooglePlces = this.onFocusGooglePlces.bind(this);
    this.onBlurFocusOut = this.onBlurFocusOut.bind(this);
  }

  /**
   * @param {*} event
   */

  componentWillMount() {
    this.setSearchOptions()
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

  searchPools = () => {
    let { address } = this.state;
    let { history } = this.props;
    if(address === undefined && address === '') {
     address = IS_US ? 'Los Angeles, CA, USA' : 'Sydney NSW, Australia';
    }
    UserUtils.setAddress(address);
      history.push('/search')
  }

  onFocusGooglePlces() {
    this.setState({ onFocusGoogle: true });
  }

  onBlurFocusOut() {
    this.setState({
      onFocusGoogle: false,
      onFocusCalender: false,
      onFocusTimer: false
    });
    let { currentLocation, showFormErrorMessage } = this.state;

    let hasError = false;
    if (commonFunctions.isEmpty(currentLocation)) {
      hasError = true;
    }
    this.setState({
      showSearchLocationError: hasError === true ? true : false,
      showFormErrorMessage: showFormErrorMessage === true && false
    });
    return hasError === true ? false : true;
  }

  handleAddress(address) {
    this.setState({ currentLocation: address, address });
  }

  handleSearchLocation(address) {
    UserUtils.setPoolSearchPage(1);
    if(address !== undefined && address !== '') {
      let { history } = this.props;
      UserUtils.setAddress(address);
      history.push('/search')
    }
  }

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    const {
      showSearchLocationError,
      // onFocusGoogle,
      currentLocation
    } = this.state;

    // let popularDestinations = ['Miami Beach, Florida',
    //   'Houston, Texas',
    //   'Los Angeles, California',
    //   'Brooklyn, New York',
    //   'Phoenix, Arizona'];

    return (
      <div>
        <div className={classes.mainBanner}>
          <div className={classes.container}>
            <div className={classes.newBannerMain}>
              <div className={classes.newBannerContent}>
                <Typography variant="h1">{IS_SHVIMPLY ? 'Book a Private Pool' : 'Escape Locally'}</Typography>
                <Typography component="h4">{IS_SHVIMPLY ? 'Enjoy Kosher Contact-Free Staycations by the hour' : 'Book a local private pool by the hour'}</Typography>
                <div className={classes.homeNewFormGroup}>
                  <PlacesAutocomplete
                    value={currentLocation}
                    onChange={this.handleAddress}
                    onSelect={this.handleSearchLocation}
                    onBlur={this.onBlurFocusOut}
                    debounce={1000}
                    shouldFetchSuggestions={currentLocation.length >= 2}
                    // searchOptions={this.state.searchOptions}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading
                    }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Where would you like to take a dip?",
                              className: "location-search-input"
                            })}
                            onFocus={this.onFocusGooglePlces}
                            onBlur={this.onBlurFocusOut}
                            className={
                              showSearchLocationError === false
                                ? ""
                                : classes.errorMessage
                            }
                          />
                          {/*{ currentLocation ==='' && onFocusGoogle === true &&*/}
                          {/*<ul className="autocomplete-dropdown-container">                        */}
                          {/*  {popularDestinations.map((destination) => {*/}
                          {/*    return (*/}
                          {/*    <li className={classes.popularDestnation} onMouseDown={()=>this.handleSearchLocation(destination)}>*/}
                          {/*      <font>{destination}</font>*/}
                          {/*    </li>  */}
                          {/*    );*/}
                          {/*  })}*/}
                          {/*</ul>*/}
                          {/*}*/}

                          <ul className="autocomplete-dropdown-container">
                            {loading && (
                              <div className={classes.loadinAuto}>Loading...</div>
                            )}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? "suggestion-item--active"
                                : "suggestion-item";
                              const style = suggestion.active
                                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                : { backgroundColor: "#ffffff", cursor: "pointer" };
                              return (
                                <li
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <font>{suggestion.description}</font>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                  </PlacesAutocomplete>
                  <i className="fa fa-search" onClick={this.searchPools}></i>

                </div>
                <Typography component="p">
                  <span onClick={this.props.redirectSearchPage}><i className="fas fa-compass"></i> What's Near Me?</span>
                </Typography>
                <Typography component="p" className={classes.howItWorks}>
                  <span >
                    <AnchorLink offset={() => 80} href='#how_swimply_works'>
                      <i className="fas fa-question-circle"></i> {IS_SHVIMPLY ? 'How Shvimply Works?' : 'How Swimply Works?'}
                    </AnchorLink>
                   </span>
                </Typography>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchPool.propTypes = {
  classes: PropTypes.object.isRequired
};

const geoLocation = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  geoLocation,
  withApollo
);

export default enhance(SearchPool);
