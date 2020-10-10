import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import { loader } from 'graphql.macro';
import Typography from '@material-ui/core/Typography';
// import GuestPopup from '../commons/guestpopup';
import FiltersPopup from './filtersPopup';
import TimerPopup from '../commons/timerpopup';
import CalendarPopUp from '../commons/calenderPopup';
import { withApollo } from 'react-apollo';
import PlacesAutocomplete from 'react-places-autocomplete';
import UserUtils from '../utilities/UserUtils';
import { sendAnalytics } from '../utilities/analyticsUtils';
import * as commonFunctions from './../utilities/commonFunctions';
import { IS_US } from '../../config'
import { STRIPE_SUPPORT_COUNTRIES_CODES } from '../../constants'
import moment from "moment";
import _ from 'lodash'
const searchPoolPaginatedQuery = loader('./../../graphql/findpool/searchPoolQuery.graphql');


const styles = theme => ({
  resultFormMain: {
    paddingTop: '40px',
    '@media (max-width:767px)': {
      paddingTop: '20px'
    }
  },
  searchResultContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'row wrap',
    '& > div:nth-child(2)': {
      width: '14%',
      '@media (max-width:767px)': {
        display:' inline-block',
        width: 'calc(50% - 7px)',
        marginRight:' 7px',
      }
    },
    '& > div:nth-child(3)': {
      width: '17%',
      '@media (max-width:767px)': {
        display:' inline-block',
        width: 'calc(50% - 7px)',
        marginLeft:' 7px',
        marginRight:' 0px',
      }
    },
    // '& > div:nth-child(4)': {
    //   width: '23%',
    //   '@media (max-width:767px)': {
    //     width: '100%',
    //   }
    // },
    alignItems: 'center',
    '@media (max-width:767px)': {
      // display: 'table',
      width: '100%',

    }
  },
  formInputBox: {
    position: "relative",
    marginRight: '15px',
    marginBottom: "0",
    width: '16%',
    zIndex: 8,

    '@media (max-width:767px)': {
      width: '100%',
      marginBottom: '15px',
      marginRight: 0,
      zIndex: 'unset',
    },
    '& fieldset': {
      opacity: 0,
    },
    '& label': {
      textTransform: "uppercase",
      paddingBottom:'2px',
    },
    '& input': {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "11px 35px ",
      fontWeight: "normal",
      '&:focus': {
        outline: 'none',
        boxShadow: theme.shape.boxShadow,
      },

    },
    '& span': {
      position: "absolute",
      top: "0",
      bottom: "0",
      margin: "auto",
      height: "21px",
      left: "9px",
      filter: 'grayscale(1)'
    },
    '& > div > div:last-child': {
      minWidth: '320px',
      textAlign: 'right',

      '@media (max-width:767px)': {
        minWidth: '270px',

      },
    }
  },
  searchLocationBox: {
    width: '26%',
    '& input': {
      paddingRight: '65px',
      width: 'calc(100% - 100px)',
      fontSize: '13px',
      border: 'none',
      fontFamily: 'inherit',
      borderRadius:'5px',
      color: '#949494'
    },
    '& ul': {
      listStyle: 'none',
      background:theme.palette.common.white,
      paddingLeft: 0,
      width: 'calc(100% + 70px)',
      position: 'absolute',
      zIndex: '1',
      display: 'block',
      top: '35px',
      boxShadow: ' 0 0 3px #ccc',
      maxHeight:'150px',
      overflow:'auto',
    },
    '& li': {
      padding: '7px 15px',
      width: 'calc(100% - 30px)',
      display: 'block',
      fontSize: '12px',
      overflow: 'hidden',
      color: theme.palette.common.black,
    },

    '@media (max-width:767px)': {
      width: '100%',
    },

  },
  clearText: {
    fontSize: '13px',
    float: 'right',
    position: 'absolute',
    textAlign: 'right',
    color: '#949494',
    width: 'auto',
    top: '12px',
    right: '15px',
    cursor: 'pointer',
    '& hover': {
      color: 'green',
    }

  },
  textField: {
    position: "relative",
    width: "100%",
    margin: 0,
  },
  dropDownSelect: {
    background: theme.palette.common.gray,
    color: '#939393',
    padding: "11px 35px 11px 35px",
    borderRadius:'5px',
    fontWeight: "normal",
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& i': {
      float: "right",
      fontSize: "22px",
      position: 'absolute',
      right: '10px',
      top: '10px'
    },
  },
  dropDownSelectTime: {
    background: theme.palette.common.gray,
    color: '#939393',
    padding: "11px 15px 11px 35px",
    fontSize: "13px",
    height: '20px',
    borderRadius:'5px',
    fontWeight: "normal",
    whiteSpace: 'pre',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
    '& i': {
      float: "right",
      fontSize: "22px",
      cursor: 'pointer',
    }
  },
  CheckboxBottm: {
    position: "relative",
    marginTop: "10px",
    '& img': {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px",
    },
  },
  formIconBox: {
    position: "relative",
    marginRight: '15px',
    marginBottom: "0",
    width: 'auto',
    fontSize: 15,
    zIndex: 8,
    '@media (max-width: 767px)': {
      width: '100%',
      margin: '0 0 15px',
      zIndex: 'unset',
    },
    '& > div > div:last-child': {
      minWidth: '320px',

      '@media (max-width:767px)': {
        minWidth: '270px',

      },
    },
    '& .filter-icon': {
      position: 'absolute',
      top: 12,
      left: 9,
      '&.active:after': {
        content: `''`,
        position: 'absolute',
        top: '-2px',
        right: '-5px',
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'red',
      }
    }
  },
  dropDownSelectBlue: {
    flex: 1,
    marginRight: '10px',
    zIndex: 8,
    '& a': {
      textDecoration: "none",
      display: 'flex',
      '@media (max-width:767px)': {
        display: 'unset',
      },
    },
    '& span': {
      width: "100%",
      background: theme.palette.common.transparent,
      border: '2px solid #1db6e5',
      marginTop: "0px",
      color: theme.palette.common.black,
      padding: '7px 25px',
      '@media (max-width:767px)': {
        width: 'auto',
      },
    },
    '@media (max-width:767px)': {
      marginRight: 0,
      zIndex: 'unset',
    },
  },
  labelInstantBook: {
    '& span + span': {
      paddingLeft: "20px",
    },
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
  timerPopup: {
    '& > div': {
      marginTop: '5px',
      minWidth: '300px',
      '& label': {
        paddingLeft: '0',
      },
      '& span': {
        position: "relative",
        left: 'inherit',
        top: 'inherit',
        height: 'inherit',
        marginLeft: '0px',
        padding: '0px 0px',
      }
    }
  },
  calenderPopupMain: {
    '& > div': {
      marginTop: '5px',
      minWidth: '350px',
      '& span': {
        position: "relative",
        left: 'inherit',
        top: 'inherit',
        marginLeft: '0px',
        padding: '0px 0px',
      }
    }
  },
  searchLocationPlaces: {
    width: 'calc(100% - 70px)'
  },

  onFocusGoogle: {
    '& input': {
      color: theme.palette.common.black,
    },
    '& span': {
      filter: 'grayscale(0)'
    }

  },
  onFocusCalender: {
    '& > div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
    },
    '& span': {
      filter: "grayscale(0)"
    },

  },
  onFocusTimer: {
    '& > div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
    },
    '& span': {
      filter: "grayscale(0)"
    },
    '& > div > div > div > div': {

    },
    '& > div:last-child > div':{
      left:'-160px'
    }
  },
  onFocusGuest: {
    '& > div:first-child': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      '& i': {
        transform: 'rotate(180deg)'
      }
    },
    '& span': {
      filter: "grayscale(0)"
    },

  },
  underlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.7,
    pointerEvents: 'none',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 8
  },
  loadinAuto: {
    padding:'15px 15px 5px',
    color:theme.palette.common.black,
  },
  divErrorMessage: {
    '& input' :{
      border: '1px solid red',
      borderRadius:'5px',
    },
    '& input:focus' :{
      boxShadow:'none'
    }
  },
  timerSet:{
    '@media (max-width:767px)':{
      left:'-160px',
    }
  },
  popularDestnation:{
    backgroundColor: "#ffffff",
    cursor: "pointer",
    '&:hover':{
      backgroundColor: 'rgb(250, 250, 250)'
    }
  },
  cursorPointer: {
    cursor: 'pointer',
  }
});

class SearchResultForm extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      availableDate:'',
      openGuest: false,
      locationPopup: false,
      timerShow: false,
      calenderShow: false,
      checkedInstantBooking: false,
      startTime: '',
      endTime: '',
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      currentLocation: '',
      address: '',
      latitude: '',
      longitude: '',
      timerRange: {
        min: 2,
        max: 10
      },
      updateBtn: true,
      onFocusGoogle: false,
      onFocusCalender: false,
      onFocusTimer: false,
      onFocusGuest: false,
      showFilters: false,
      selectedAmenities: [],
      startPrice: 15,
      endPrice: 200,
      budget: {
        low: 15,
        high: 200
      },
      searchFields: {
        checkedInstantBooking: false,
        checkedFlexibleTime: false,
        startTime: '',
        endTime: '',
        timerRange: {
          min: 2,
          max: 10
        },
        startPrice: 15,
        childrenCount: 0,
        infantCount: 0,
        amenities: [],
        endPrice: 200,
        adultCount: 1,
        budget: {
          low: 15,
          high: 200
        },
        available_date: new Date().toISOString(),
        anytime: false,
        anyDate: false,
      },
      showSearchLocationError: false,
      showFormErrorMessage: false,
      page: 1,
      limit: 4,
      searchOptions: null,
      minDate: moment().format(),
      maxDate: moment().add('year', 1).format(),
    };
    this.handleCalenderCancel = this.handleCalenderCancel.bind(this);
    this.handleTimerCancel = this.handleTimerCancel.bind(this);
    this.handleFiltersCancel = this.handleFiltersCancel.bind(this);
    this.handleInstantBooking = this.handleInstantBooking.bind(this);
    this.modifySearchResult = this.modifySearchResult.bind(this);
    this.handleSearchLocation = this.handleSearchLocation.bind(this);
    this.handleClearText = this.handleClearText.bind(this);
    this.onFocusGooglePlces = this.onFocusGooglePlces.bind(this);
    this.onBlurFocusOut = this.onBlurFocusOut.bind(this);
    this.checkDate = this.checkDate.bind(this);
  }

  /**
   * @param {*} event
   */
  
  componentDidMount() {
    this.setSearchOptions()
    let { searchFields } = this.props;
    searchFields.adultCount = 1
    let instantBook = (searchFields.checkedInstantBooking === "true" || searchFields.checkedInstantBooking === true) ? true : false;
    let flexibleTime = (searchFields.checkedFlexibleTime === "true" || searchFields.checkedFlexibleTime === true) ? true : false;

    let date = new Date(searchFields.available_date || this.state.selectedDate);
    if (!date.getDate()) {
      // legacy users with legacy local storage
      // just as fallback
      date = new Date()
    }

    let ifTomorrow = this.checkDate(date)
    if (ifTomorrow) {
      date = ifTomorrow
    }

    searchFields = this.checkInitialTime(searchFields)

		let day = date.getDate();
		let year = date.getFullYear();
    let monthVal = date.getMonth() + 1;
    
    let available = year + '-' + monthVal + '-' + day;
    this.setState({
      adultCount: parseInt(searchFields.adultCount),
      childrenCount: parseInt(searchFields.childrenCount),
      infantCount: parseInt(searchFields.infantCount),
      startTime: searchFields.startTime,
      endTime: searchFields.endTime,
      currentLocation: searchFields.address,
      checkedInstantBooking: instantBook,
      checkedFlexibleTime: flexibleTime,
      availableDate: available,
      selectedDate: date,
      amenities: searchFields.amenities,
      timerRange: {
        min: searchFields.timerRange.min,
        max: searchFields.timerRange.max
      },
      budget: {
        low: searchFields.budget.low,
        high: searchFields.budget.high
      },
      searchFields: { ...searchFields },
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { searchFields } = this.props
    if (
      searchFields
      && Object.keys(searchFields).length
      && !_.isEqual(searchFields, prevProps.searchFields)
    ) {
      this.setState({
        adultCount: parseInt(searchFields.adultCount),
        childrenCount: parseInt(searchFields.childrenCount),
        infantCount: parseInt(searchFields.infantCount),
        currentLocation: searchFields.address,
        checkedInstantBooking: !!searchFields.checkedInstantBooking,
        startPrice: searchFields.budget.low,
        endPrice: searchFields.budget.high,
        amenities: searchFields.amenities,
        budget: {
          low: searchFields.budget.low,
          high: searchFields.budget.high
        },
        searchFields: searchFields,
        selectedAmenities: searchFields.amenities,
      })
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
  
  checkInitialTime(searchFields) {
    if (searchFields.anytime) {
      return searchFields
    }

    const currentDate = new Date()
    const selectedDayNumber = new Date(searchFields.available_date).getDate()
    const nowTime = currentDate.getHours()
    const nowDayNumber = currentDate.getDate()

    let minTime = searchFields.timerRange.min
    let maxTime = searchFields.timerRange.max

    if (
      (selectedDayNumber === nowDayNumber && (minTime < nowTime + 2))
      || minTime < 7
      || nowTime >= 22
    ) {
      searchFields.anytime = true
      maxTime = 24
      minTime = 7
    }

    if (maxTime >= 24) {
      maxTime = 24
    }

    if (minTime > 12) {
      searchFields.startTime = (minTime - 12) + ":00 PM";
    } else if (minTime === 12) {
      searchFields.startTime = (minTime) + ":00 PM";
    } else {
      searchFields.startTime = minTime + ":00 AM";
    }
    
    if (maxTime > 12) {
      searchFields.endTime = (maxTime - 12) + ":00 PM";
    } else if (maxTime === 12) {
      searchFields.endTime = (maxTime) + ":00 PM";
    } else {
      searchFields.endTime = maxTime + ":00 AM";
    }

    searchFields.timerRange.max = maxTime
    searchFields.timerRange.min = minTime

    return searchFields
  }

  checkDate (selectedDate) {
    if (new Date(selectedDate).getDate() === new Date().getDate() && new Date(selectedDate).getMonth() === new Date().getMonth()) {
      if (new Date().getHours() >= 22) {
        let tomorrow = new Date(selectedDate)
        tomorrow.setDate(tomorrow.getDate() + 1)
        this.setState({
          selectedDate: tomorrow
        })
        return tomorrow
      }
    } else if (new Date(selectedDate).getDate() < new Date().getDate() && new Date(selectedDate).getMonth() === new Date().getMonth()) {
      let tomorrow = new Date(selectedDate)
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.setState({
        selectedDate: tomorrow
      })
      return tomorrow
    }
    return null
  }

  onFocusGooglePlces() {
    this.setState({ onFocusGoogle: true })
  }

  onBlurFocusOut() {
    this.setState({
      onFocusGoogle: false,
      onFocusCalender: false,
      onFocusTimer: false
    })
    let { currentLocation, showFormErrorMessage } = this.state;
    let hasError = false;
    if (commonFunctions.isEmpty(currentLocation)) {
      hasError = true;
    }
    this.setState({
      showSearchLocationError: (hasError === true) ? true : false,
      showFormErrorMessage: (showFormErrorMessage === true) && false
    });
    return (hasError === true) ? false : true;
  }

  handleClearText() {
    this.setState({
      currentLocation: "",
      address: "",
      locationPopup: false
    })
  }

  handleSearchLocation(address) {
    this.setState({
      currentLocation: address,
      address: address,
      locationPopup: true,
      calenderShow: false,
      timerShow: false,
      openGuest: false
    });
    UserUtils.setAddress(address);
  }


  handleCalender(val) {
    this.setState({
      calenderShow: val === true ? true : false,
      openGuest: false,
      timerShow: false,
      locationPopup: false,
      onFocusCalender: true,
      onFocusTimer: false,
      onFocusGuest: false
    });
  }

  handleCalenderApply(selectedDate) {
    let tomorrow = this.checkDate(selectedDate)
    let date
    if (tomorrow) {
      date = new Date(tomorrow);
    } else {
      date = new Date(selectedDate);
    }
    let day = date.getDate();
    let year = date.getUTCFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let month = monthNames[date.getMonth()];
    let monthVal = date.getMonth() + 1;
    let available = year+ '-'+monthVal+ '-'+day;
    this.setState({
      calenderShow: false,
      selectedDate: month + ' ' + day + ', ' + year,
      availableDate: available,
      onFocusCalender: false,
      searchFields: {
        ...this.state.searchFields,
        anyDate: false
      }
    });
    UserUtils.setAvailableDate(date);
  }

  handleCalenderCancel(val) {
    this.setState({
      calenderShow: val === true ? true : false,
      openGuest: false,
      timerShow: false,
      onFocusCalender: true,
      onFocusTimer: false,
      onFocusGuest: false
    });
  }

  handleTimer(val) {
    this.setState({
      timerShow: val === true ? true : false,
      calenderShow: false,
      openGuest: false,
      locationPopup: false,
      onFocusTimer: true,
      onFocusCalender: false,
      onFocusGuest: false
    });
  }

  returnSuffix = (hours, adding = 0) => {
    if (0 <= (parseInt(hours) + adding) && (parseInt(hours) + adding) < 12) {
      return ':00 AM'
    } else if (24 > (parseInt(hours) + adding) && (parseInt(hours) + adding) >= 12) {
      return ':00 PM'
    } else if (36 > (parseInt(hours) + adding) && (parseInt(hours) + adding) >= 24) {
      return ':00 AM'
    } else if (-12 <= (parseInt(hours) + adding) && (parseInt(hours) + adding) < 0) {
      return ':00 PM'
    }
  }

  handleTimerApply(data) {
    let selectedDate = this.state.selectedDate
    if (new Date(selectedDate).getDate() === new Date().getDate() && new Date(selectedDate).getMonth() === new Date().getMonth()) {
      let newDateHours = new Date().getHours()

      if (data.startTime < newDateHours + 1) {
        data.endTime = (newDateHours + 3) + this.returnSuffix(newDateHours, 3)
        data.startTime = (newDateHours + 1) + this.returnSuffix(newDateHours, 1)
        data.timerRange.max = (newDateHours + 3)
        data.timerRange.min = (newDateHours + 1)
      }

      if (new Date().getHours() >= 22) {
        let tomorrow = new Date(this.state.selectedDate)
        tomorrow.setDate(tomorrow.getDate() + 1)
        this.setState({
          selectedDate: tomorrow
        })
        data.endTime = 9 + this.returnSuffix(9)
        data.startTime = 7 + this.returnSuffix(7)
        data.timerRange.max = 9
        data.timerRange.min = 7
      }
    }

    let { startTime: prevStartTime, endTime: prevEndTime, anytime } = this.state.searchFields
    anytime = anytime && data.startTime === prevStartTime && data.endTime === prevEndTime

    this.setState({
      timerShow: false,
      checkedFlexibleTime: data.checkedFlexibleTime,
      startTime: data.startTime,
      endTime: data.endTime,
      timerRange: data.timerRange,
      onFocusTimer: false,
      searchFields: {
        checkedFlexibleTime: data.checkedFlexibleTime,
        startTime: data.startTime,
        endTime: data.endTime,
        timerRange: {
          min: data.timerRange.min,
          max: data.timerRange.max
        },
        adultCount: data.adultCount,
        childrenCount: data.childrenCount,
        infantCount: data.infantCount,
        anyDate: this.state.searchFields.anyDate,
        anytime,
      }
    });

  }

  handleTimerCancel() {
    this.setState({
      timerShow: false,
      onFocusTimer: false,
    });
  }

  handleCount(val) {
    let { onFocusGuest } = this.state;
    this.setState({
      openGuest: val === true ? true : false,
      calenderShow: false,
      timerShow: false,
      onFocusGuest: onFocusGuest === true ? false : true,
      locationPopup: false,
    });
  }


  handleFilters() {
    this.setState({
      timerShow: false,
      calenderShow: false,
      openGuest: false,
      locationPopup: false,
      onFocusTimer: false,
      onFocusCalender: false,
      onFocusGuest: !this.state.onFocusGuest,
      showFilters: !this.state.showFilters
    });
  }

  handleActiveFilters = () => {
    return this.state.checkedInstantBooking
      || (this.state.selectedAmenities && this.state.selectedAmenities.length)
      || (this.state.adultCount !== 1)
      || (this.state.childrenCount !== 0)
      || (this.state.infantCount !== 0)
      || (this.state.startPrice !== 15)
      || (this.state.endPrice !== 200)
  }

  handleFiltersApply(data) {
    this.setState({
      showFilters: false,
      onFocusGuest: false,
      selectedAmenities: data.selectedAmenities,
      adultCount: data.adultCount,
      childrenCount: data.childrenCount,
      infantCount: data.infantCount,
      startPrice: data.budget.low,
      endPrice: data.budget.high,
      checkedInstantBooking: data.checkedInstantBooking,
      searchFields: {
        adultCount: data.adultCount,
        childrenCount: data.childrenCount,
        infantCount: data.infantCount,
        amenities: data.selectedAmenities,
        checkedInstantBooking: data.checkedInstantBooking,
        startPrice: data.startPrice,
        endPrice: data.endPrice,
        budget: {
          low: data.budget.low,
          high: data.budget.high
        },
        anytime: this.state.searchFields.anytime,
        anyDate: this.state.searchFields.anyDate,
      }
    }, () => {this.modifySearchResult()})
  }


  handleFiltersCancel() {
    this.setState({
      showFilters: false,
     });
  };

  handleInstantBooking(e) {
    this.setState({ checkedInstantBooking: e.target.checked });
    UserUtils.setInstantBooking(e.target.checked);
  };

  validateForm() {
    let hasError = false;
    if (!this.onBlurFocusOut()) {
      hasError = true;
    }
    this.setState({
      showFormErrorMessage: (hasError === true) ? true : false,
    });
    return (hasError === true) ? false : true;
  }

  modifySearchResult() {
    if (!this.validateForm()) {
      return
    }
    let { currentLocation,
      checkedInstantBooking, 
      adultCount,
      childrenCount,
      checkedFlexibleTime,
      timerRange,
      infantCount,
      availableDate,
      startTime,
      endTime,
      // budget,
      startPrice,
      endPrice,
      selectedAmenities
    } = this.state;

    const currentLocationArr = currentLocation.split( ',' ).reverse();
    const analyticsData = {
      timestamp: new Date().toISOString(),
      'event_type': 'manual-search',
      fullAddress: currentLocation,
      country: currentLocationArr[0],
      city: currentLocationArr[IS_US ? 2 : 1],
      weekDay: this.state.searchFields.anyDate ? 'Anytime' : moment( availableDate ).format( 'dddd' ),
      startTime: this.state.searchFields.anytime ? '7:00 AM' : startTime,
      endTime: this.state.searchFields.anytime ? '12:00 AM' : endTime,
      platform: 'web',
      location: IS_US ? 'US' : 'AU',
      userId: UserUtils.getUserID(),
      userRole: 'swimmer',
    };
    sendAnalytics( this.props.client, analyticsData );

    UserUtils.setAdultCount(adultCount);
    UserUtils.setChildCount(childrenCount);
    UserUtils.setInfantCount(infantCount);
    UserUtils.setFlexibleHours(checkedFlexibleTime);
    UserUtils.setStartTime(startTime);
    UserUtils.setEndTime(endTime);
    UserUtils.setTimerMin(timerRange.min);
    UserUtils.setTimerMax(timerRange.max);
    UserUtils.setStartPrice(startPrice);
    UserUtils.setEndPrice(endPrice);
    UserUtils.setAmenities(selectedAmenities);
    let address = currentLocation;
    let available_date = availableDate;
    let available_time_from = startTime;
    let available_time_to = endTime;
    let adult = adultCount;
    let children = childrenCount;
    let infants = infantCount;
    let instant_booking = checkedInstantBooking;
    let tempAmenities = selectedAmenities
    let tempstartPrice = startPrice
    let tempendPrice = endPrice

    this.props.emptySearchResult();
    let data = {
      address: address,
      available_date: available_date,
      startTime: available_time_from,
      endTime: available_time_to,
      adultCount:adult,
      childrenCount:children,
      infantCount:infants,
      checkedInstantBooking:instant_booking,
      checkedFlexibleTime:checkedFlexibleTime,
      timerRange: {
        min: timerRange.min,
        max: timerRange.max
      },
      startPrice: tempstartPrice,
      endPrice: tempendPrice,
      budget: {
        low: tempstartPrice,
        high: tempendPrice
      },
      amenities: tempAmenities,
      anytime: this.state.searchFields.anytime,
      anyDate: this.state.searchFields.anyDate,
    }
    
    const { limit, page } = this.state
    let restroom = tempAmenities.includes('restroom')
    let amenities = tempAmenities.filter(item => item !== 'restroom')
    amenities = amenities.map(item => parseInt(item))
    this.props.client.query({
      query: searchPoolPaginatedQuery,
      variables: {
        datas: {
          address: address,
          available_date: this.state.searchFields.anyDate ? '' : available_date,
          available_time_from: this.state.searchFields.anytime && this.state.searchFields.anyDate ? '' : available_time_from,
          available_time_to: this.state.searchFields.anytime && this.state.searchFields.anyDate ? '' : available_time_to,
          adult:adult,
          children:children,
          infants:infants,
          instant_booking:instant_booking,
          flexible_hours:checkedFlexibleTime,
          budget: {
            low: startPrice,
            high: endPrice
          },
          amenities: amenities,
          restroom: restroom
        },
        count: limit,
        page,
      },
      fetchPolicy:"network-only"
    })
      .then((res) => {
        this.props.modifySearchResult(res.data.searchPoolPaginated.data, data, res.data.searchPoolPaginated.paginatorInfo.total, true, 'onSearchClick');
      }).catch((error) => {
      this.props.turnOffLoading();
      });

  }

  /**
   * render
   */

  render() {
    const { classes } = this.props;
    const {
      searchFields,
      locationPopup,
      onFocusGuest,
      onFocusTimer,
      guestUpdatedData,
      onFocusCalender,
      onFocusGoogle,
      updateBtn,
      currentLocation,
      selectedDate,
      // openGuest,
      calenderShow,
      adultCount,
      childrenCount,
      infantCount,
      timerShow,
      timer,
      startTime,
      endTime,
      checkedInstantBooking,
      selectedAmenities,
      showSearchLocationError,
      startPrice,
      endPrice,
      budget
    } = this.state;

    let date = new Date(selectedDate);
    let day = date.getDate();
    let year = date.getFullYear();
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let month = monthNames[date.getMonth()];
    let calenderLabel = selectedDate !== "" ? (month + ' ' + day + ', ' + year) : selectedDate;
    // let guests = "";
    // if (!adultCount && !childrenCount && !infantCount) {
    //   guests = "Select guests";
    // } else {
    //   guests = "";
    // }
    // let aCount = "";
    // let aLabel = "";
    // if(adultCount === 0) {
    //   aCount = "";
    //   aLabel = "";
    // } else if (adultCount === 1) {
    //   aCount = adultCount;
    //   aLabel = (childrenCount === 0 && infantCount === 0 ) ? "Adult" : "Adult,";
    // } else {
    //   aCount = adultCount;
    //   aLabel = (childrenCount === 0 && infantCount === 0) ? "Adults" : "Adults,";
    // }
    // let cCount = "";
    // let cLabel = "";
    // if(childrenCount === 0) {
    //   cCount = "";
    //   cLabel = "";
    // } else if (childrenCount === 1) {
    //   cCount = childrenCount;
    //   cLabel = infantCount === 0 ? "Children" : "Children,";
    // } else {
    //   cCount = childrenCount;
    //   cLabel = infantCount === 0 ? "Childrens" : "Childrens,";
    // }
    // let iCount = "";
    // let iLabel = "";
    // if(infantCount === 0) {
    //   iCount = "";
    //   iLabel = "";
    // } else if (infantCount === 1) {
    //   iCount = infantCount;
    //   iLabel = "Infant";
    // } else {
    //   iCount = infantCount;
    //   iLabel = "Infants";
    // }

    let popularDestinations = IS_US ? [
      'Miami Beach, Florida',
      'Houston, Texas',
      'Los Angeles, California',
      'Brooklyn, New York',
      'Phoenix, Arizona'
    ] : [
      'New South Wales, Sidney',
      'Victoria, Melbourne',
      'Queensland, Brisbane',
      'South Australia, Adelaide',
    ]

    return (
      <div>
      {this.state.showFilters && <div className={classes.underlay} onClick={(e)=>{e.preventDefault(); e.stopPropagation();}} />}
      <div className={classes.resultFormMain}>
        <div className={classes.searchResultContainer}>
          <div   className={classes.formInputBox + " " + classes.searchLocationBox + ' ' + (onFocusGoogle === true ? classes.onFocusGoogle : '')}>
             <PlacesAutocomplete
              value={currentLocation}
              onChange={this.handleSearchLocation}
              onSelect={this.handleSelect}
              onBlur={this.onBlurFocusOut}
              debounce={1000}
              shouldFetchSuggestions={currentLocation.length >= 2}
              // searchOptions={this.state.searchOptions}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className={showSearchLocationError === false ? "" : classes.divErrorMessage}>
                  <input
                    {...getInputProps({
                      placeholder: IS_US ? 'Los Angeles' : 'Sydney',
                      className: 'location-search-input',
                    })}
                    onFocus={this.onFocusGooglePlces}
                    onBlur={this.onBlurFocusOut}
                  />
                  {currentLocation===''&&onFocusGoogle === true&&
                    <ul className="autocomplete-dropdown-container">

                      {popularDestinations.map((destination) => {
                        return (
                        <li className={classes.popularDestnation} onMouseDown={()=>this.handleSearchLocation(destination)}>
                          <font>{destination}</font>
                        </li>
                        );
                      })}
                    </ul>
                  }
                 {locationPopup !== true ? "": <ul className="autocomplete-dropdown-container">
                    {loading && <div className={classes.loadinAuto}>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#fff', cursor: 'pointer' };
                      return (
                        <li
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <font>{suggestion.description}</font>
                        </li>
                      );
                    })}
                  </ul>}
                </div>
              )}
            </PlacesAutocomplete>
            <span><img src={window.location.origin + "/img/search-green.png"} alt="" /></span>
            <div className={classes.clearText} onClick={this.handleClearText}>CLEAR</div>
          </div>

          <div className={classes.formInputBox + " " + (onFocusCalender === true ? classes.onFocusCalender : "")}>
            <div className={classes.dropDownSelectTime} onClick={this.handleCalender.bind(this, calenderShow === true ? false : true)} >
              {searchFields.anyDate ? 'Anytime' : calenderLabel}
            </div>
            <span className={classes.cursorPointer}><img src={window.location.origin + "/img/calender-green2.png"} alt="" /></span>
            {calenderShow === true ?
              <div className={classes.calenderPopupMain}>
                <CalendarPopUp
                  selectedDate = {selectedDate}
                  anytime={searchFields.anytime}
                  updateBtn={updateBtn}
                  maxDate={this.state.maxDate}
                  handleCalenderCancel={this.handleCalenderCancel}
                  handleCalenderApply={this.handleCalenderApply.bind(this)}
                />
              </div>
              : ''
            }
          </div>
          <div className={classes.formInputBox + " " + (onFocusTimer === true ? classes.onFocusTimer : "")}>
            <div className={classes.dropDownSelectTime} onClick={this.handleTimer.bind(this, timerShow === true ? false : true)} >

              {
                searchFields.anytime ?
                    'Anytime' : (!startTime || !endTime) ? "Select Time" : (startTime + " - " + endTime)
              }

            </div>
            <span className={classes.cursorPointer}><img src={window.location.origin + "/img/timer.png"} alt="" /></span>
            {timer === 0 ? "" : timer}
            {timerShow === true ?
              <div className={classes.timerPopup}>
                <TimerPopup
                  updateBtn={updateBtn}
                  searchFields={searchFields}
                  handleTimerCancel={this.handleTimerCancel}
                  handleTimerApply={this.handleTimerApply.bind(this)}
                />
              </div>
              : ""}
          </div>
          {/* <div className={classes.formInputBox + " " + (onFocusGuest === true ? classes.onFocusGuest : "")} >
            <div className={classes.dropDownSelect} onClick={this.handleCount.bind(this, openGuest === true ? false : true)}>
              {guests}
              {aCount} {aLabel} &nbsp;
              {cCount} {cLabel} &nbsp;
              {iCount} {iLabel}
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
            <span><img src={window.location.origin + "/img/user-ic.png"} alt="" /></span>
            {openGuest === true ?
              <GuestPopup
                guestUpdatedData = {guestUpdatedData}
                updateBtn={updateBtn}
                searchFields={searchFields}
                adultCountNew={adultCount}
                childrenCountNew={childrenCount}
                infantCountNew={infantCount}
                handleGuestCancel={this.handleGuestCancel}
                handleGuestApply={this.handleGuestApply.bind(this)}
              /> : ""}
          </div> */}

          <div className={classes.formIconBox + " " + (onFocusGuest === true ? classes.onFocusGuest : "")}>
            {/* <div onClick={this.handleFilters.bind(this)}>
              <i class="fas fa-sliders-h" />
            </div> */}
              <div className={classes.dropDownSelect} onClick={this.handleFilters.bind(this)}>
                Filters
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </div>
              <span className={`filter-icon ${this.handleActiveFilters() ? 'active' : ''}`}><i class="fas fa-sliders-h" /></span>
            {this.state.showFilters
              ?
                <FiltersPopup
                  selectedAmenities={selectedAmenities}
                  guestUpdatedData={guestUpdatedData}
                  updateBtn={updateBtn}
                  searchFields={searchFields}
                  adultCountNew={adultCount}
                  childrenCountNew={childrenCount}
                  infantCountNew={infantCount}
                  handleFiltersCancel={this.handleFiltersCancel}
                  handleFiltersApply={this.handleFiltersApply.bind(this)}
                  checkedInstantBooking={checkedInstantBooking}
                  budget={budget}
                  startPrice={startPrice}
                  endPrice={endPrice}
                />
              : null
            }
          </div>
          <div className={classes.dropDownSelectBlue} onClick={this.modifySearchResult}>
            <Link to="/search">
              <Typography variant="button">
                Search
              </Typography>
            </Link>
          </div>
        </div>
        {/* <div className={classes.CheckboxBottm}>
          <FormControlLabel
            className={classes.labelInstantBook}
            control={
              <Checkbox
                checked={checkedInstantBooking}
                onChange={this.handleInstantBooking}
                disableRipple={true}
                value='instabooking'
                classes={{
                  root: classes.checkBox,
                  checked: classes.checked,
                }}
              />
            }
            label="Instant Booking"
          />
          <img src={window.location.origin + "/img/time.png"} alt="" />
        </div> */}

      </div>
      </div>
    );
  }
}

SearchResultForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(SearchResultForm);
