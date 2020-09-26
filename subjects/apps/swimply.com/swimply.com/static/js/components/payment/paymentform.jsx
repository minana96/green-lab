import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import GuestPopup from '../commons/guestpopup';
// import CalendarPopUp from '../commons/calenderPopup';
import UserUtils from '../utilities/UserUtils';
import cloneDeep from 'lodash/cloneDeep';
import './index.css';
import * as commonFunctions from '../utilities/commonFunctions';
import Pageloader from './../commons/pageloader';
import Moment from 'react-moment';
import moment from 'moment';
import _ from 'lodash';
import TagManager from 'react-gtm-module';
import PoolAvailabilities from '../results/poolAvailabilities';
import {IS_US, timeArray} from "../../config";
import {sendAnalytics} from "../utilities/analyticsUtils";
import UserContext from "../../contexts/UserContext";
import SelectDateAndTime from "../contact-host/select-date-and-time";
import Toggle from "../commons/toggle";

// services
import HelperService from '../../services/helper'

// contexts
import RegionContext from '../../contexts/RegionContext'

const bookPoolMutation = loader('./../../graphql/findpool/bookPoolMutation.graphql');
const userDetailsQuery = loader('./../../graphql/user/me.graphql');
const verifyPromocode = loader('./../../graphql/reservations/verifyPromocode.graphql');


const styles = theme => ({
  paymentFormGuest: {
    '& p': {
      marginBottom: '0',
      '& span': {
        float: 'right',
        color: theme.palette.common.blue,
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
        '&:hover': {
          color: theme.palette.common.black,
        }
      }
    },
    '@media (max-width:850px)':{
      display:'inline-block',
      '& p': {
        '& span': {
          display: 'block',
          width: '100px',
          left: '14px',
          position: 'absolute',
          paddingTop:'8px',
          marginTop:'15px',
        }
      }
    }
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.palette.common.black,
    fontSize: 18,
    '& .bold': {
      marginRight: 4,
      fontWeight: 500,
      color: theme.palette.common.black,
    },
    '& .light': {
      color: theme.palette.common.darkgray,
      fontWeight: 400
    },
    '& .big': {
      fontSize: 28
    },
    '& img': {
      marginRight: 7
    }
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
  searchpoolContainer: {
    padding: '25px',
    width: '100%',
    maxWidth: '500px',
    position: "relative",
    overflow: "inherit",
    border: '1px solid #f3f5f5',
    boxSizing: 'border-box',
    '& h3': {
      fontWeight: "500",
      lineHeight: "30px",
      margin: "0 0 20px",
    },
    '@media (max-width:1000px)': {
      padding: '15px',
    },
    '@media (max-width:850px)': {
      width: 'calc(100% - 30px)',
      maxWidth: 650,
      padding: '25px 15px',
      marginBottom:'50px',
      border:'none',
      boxShadow:'none',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    '@media (max-width:400px)': {
      boxSizing: 'border-box',
      padding: '25px 15px',
      width: '100%',
      maxWidth: "100%",
    },
    '& h6': {
      color: theme.palette.common.black,
      marginBottom: '15px',
      fontSize: '13px',
      fontWeight: '500'
    }
  },
  formInputBox: {
    position: "relative",
    marginBottom: "15px",
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: "uppercase",
      fontWeight: 600,
      '&.light': {
        fontSize: 12,
        fontWeight: 300
      }
    },
    '& input': {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "15px 35px ",
      fontWeight: "normal",
    },
    '& span': {
      filter: 'grayscale(1)',
      position: "absolute",
      top: "1px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "7px",
    },
  },
  formInputBoxPromocode: {
    '& .promocode-input': {
      width: '100%',
      height: '45px',
      margin: '0',
    },
    '& input': {
      padding:'12px',
      background: 'white'
    },
    '& input:focus': {
      outline: 'none',
      boxShadow: '0 0 2px #00ade2'
    },
    '& label + div': {
      display:'flex',
      '& > div' :{
        marginTop:'5px',
        border: '1px solid #23d1f2',
      },
      '& > div:last-child': {
        // marginTop:'8px',
        // marginLeft:'25px',
        '& span': {
          height: '45px',
          filter:'none',
          margin: '0',
        }
      }
    }
  },
  onFocusCalender: {
    '& div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    '& span': {
      filter: "grayscale(0)"
    }
  },
  onFocusTimer: {
    '& div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    '& span': {
      filter: "grayscale(0)"
    }
  },
  textField: {
    position: "relative",
    width: "100%",
    margin: 0,
  },
  onFocusGuest: {
    '& > label + div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
      '& i': {
        transform: 'rotate(180deg)'
      }
    },
    '& span': {
      filter: "grayscale(0)"
    },
    '& div > div': {
      '& Button': {
        marginBottom: '5px'
      }
    }
  },
  dropDownSelect: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: "14px 15px 13px 15px",
    fontWeight: "normal",
    border: '1px solid #e8e8e8',
    '& i': {
      float: "right",
      fontSize: "22px",
      color: theme.palette.common.darkgray,
    }
  },
  dropDownSelectTime: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: "14px 15px 13px 35px",
    fontSize: "14px",
    fontWeight: "normal",
    whiteSpace: 'pre',
    border: '1px solid #e8e8e8',
    '& i': {
      float: "right",
      fontSize: "22px",
    }
  },
  selectReason: {
    width: 'calc(100% - 30px)',
    padding: '9px 15px',
    fontSize: '14px',
    background: theme.palette.common.white,
    border: '1px solid #e8e8e8',
    '& i': {
      float: "right",
      fontSize: "22px",
      color: theme.palette.common.darkgray,
    },
    '&:before': {
      opacity: '0'
    },
    '&:after': {
      opacity: '0'
    },
    '& div > div': {

      '&:focus': {
        backgroundColor: '#fff'
      }
    }
  },
  CheckboxBottm: {
    position: "relative",
    '& img': {
      position: "absolute",
      top: "14px",
      bottom: "0",
      left: "28px",
      width: "18px",
    },
  },
  dropDownSelectBlue: {
    background: '#00b6e7',
    '& a': {
      textDecoration: "none",
    },
    '& span': {
      marginTop: "25px",
      background: '#00b6e7',
    },
  },
  labelInstantBook: {
    '& span:last-child': {
      paddingLeft: "20px",
    },
  },
  reasonBooking: {
    width: 'calc(100% - 30px)',
    background: theme.palette.common.gray,
    height: '45px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  optional: {
    float: 'right',
    color: '#ffa16b',
    textTransform: 'capitalize',
    display: 'inline-block',
    fontSize: '12px'
  },


  divider: {
    borderTop: '1px solid #e8e8e8',
    margin: '20px 0 25px',
    position: 'relative',
    width: '100%',
    '@media (max-width:850px)':{
      marginLeft:'-25px',
      marginRight:'-25px',
    }
  },
  paymentDetails: {
    '& p': {
      fontSize: '16px',
      marginBottom: '5px',
      color: 'black',
      fontWeight: 300
    },
    '& p.bold': {
      fontWeight: 'bold'
    },
    '& span.last': {
      fontWeight: 500,
      float: 'right',
      color: theme.palette.common.black,
    },
    '& p:nth-child(2)': {
      fontSize: '13px',
      marginBottom: '10px',
      color: '#ccc',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
  },
  cancelApplyBtn: {
    marginBottom: '15px',
    textAlign: 'right',
    '& Button:first-child': {
      background: theme.palette.common.transparent,
      padding: '2px 15px',
      '& span': {
        color: theme.palette.common.blue,
      }
    },
    '& Button:last-child': {
      background: theme.palette.common.transparent,
      border: "2px solid #12bfea",
      padding: "0px 25px",
      '& span': {
        color: theme.palette.common.black,
      }
    }
  },
  starIcon: {
    width: 25,
    height: 25,
    marginBottom: -5
  },
  selectMenuPopup: {
    fontSize: '12px',
    padding: '5px 15px',
  },
  paddingNoneright: {
    paddingRight: '0 !important',
  },
  defaultReservationBtn: {
    '& span': {
      background: '#ccc',
      marginTop: '25px',
    },
    '& span:hover': {
      background: '#ccc',
      cursor: 'default'
    },
    '@media (max-width:850px)':{
      marginBottom:'50px',
    }
  },
  activeReservationBtn: {
    // marginTop: '5px !important',
    // marginBottom: 8,
    // marginLeft: '0 !important',
    '& span': {
      borderRadius: 0,
      padding: '10px 25px'
    }
  },
  totalValue: {
    marginBottom: '0px',
    '& h3': {
      textTransform: 'uppercase',
      '& span': {
        float: 'right'
      }
    }
  },
  totalIncludingCredits: {
    '& h4': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .flex': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    '& .increase': {
      color: theme.palette.common.blue,
    }
  },
  dropdownStyle: {
    borderRadius: "5%",
    backgroundColor: '#fff',
  },
  paymentFormContainer:{
    '@media (max-width:850px)':{
      display:'inline-block',
      marginRight:'35px',
      marginBottom:'15px',
      verticalAlign:'top',
    }
  },
  error: {
    margin: '15px 0',
    textAlign: 'center',
    color: 'red'
  },
  success: {
    color: 'green'
  },
  active: {
    background: 'red'
  },
  cancellationPolicyBox: {
		padding: '5px 15px 15px 2px',
		color: theme.palette.common.black,
		marginTop: '15px',
		maxWidth: '300px',
		fontWeight: '300',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'row',
		'& h5': {
			margin: '0',
			fontSize: '14px',
			fontWeight: '400',
			marginBottom: '5px'
		},
		'& p': {
			marginTop: '0',
      fontSize: '13px',
      color: theme.palette.common.darkgray,
    },
    '& i': {
      color: '#22bfea',
      fontSize: 20,
      margin: '0 7px 0 0'
    },
    '& img': {
      margin: '0 7px 0 0'
    }
  },
  promocodeDiscount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .bold': {
      fontWeight: '500'
    }
  },
  promocodeContainer: {
    position: 'relative',
    display: 'flex',
    borderRadius: '30px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .promocode-input': {
      height: '45px',
      width: '100%',
      margin: '0',
      border: '1px solid #23d1f2',
      borderRight: 'none',
      borderTopLeftRadius: '30px',
      borderBottomLeftRadius: '30px',
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        padding: '5px 112px 5px 15px',
        height: '100%',
      },
      '& > div': {
        height: '100%',
      }
    },
    '& .promocode-button': {
      position: 'absolute',
      right: '0',
      height: '45px',
      minWidth: '100px',
      // border: '1px solid #23d1f2',
      // background: 'linear-gradient(90deg,#23d1f2,#14c8ef,#04bfeb,#00b6e7,#00ade2)',
      '& span': {
        height: '100%',
        borderRadius: '30px',
        padding: '10px 25px'
      }
    },
  },
  addPromoCodeButton: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '180px',
    margin: '15px 0 20px',
    cursor: 'pointer',
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginRight: '6px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: `url('/img/screens/pool-details/blue-plus-in-circle.png')`,
    },
    '& p': {
      margin: '0',
      fontSize: '16px',
      fontWeight: '400',
      color: theme.palette.common.blue,
    },
  },
  applyCreditsContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .info': {
      display: 'flex',
      alignItems: 'center',
      '& p': {
        margin: '0',
        fontSize: '16px',
        fontWeight: '500',
        color: theme.palette.common.black,
      },
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '20px',
        height: '20px',
        marginRight: '6px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundImage: `url('/img/commons/swimply-bank.png')`,
      },
      '& .credits': {
        marginLeft: '10px',
        color: theme.palette.common.blue,
      }
    }
  },
  caption: {
    margin: '10px 0',
  }
});


/**
 * Payment Form
 */
const time_array = timeArray.map(item => {
  item.hoverClass = ''
  return item
})

class PaymentForm extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      selectedDate: new Date(),
      openGuest: false,
      timerShow: false,
      calenderShow: false,
      checkedInstantBooking: false,
      startTime: '',
      endTime: '',
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      modifySearch: false,
      updateBtn: true,
      searchFields: {},
      timerRangeMax: 0,
      timerRangeMin: 0,
      selectReason: '',
      availableDate: '',
      cardBrand: '',
      cardLastFourDigit: '',
      timeDetails: time_array,
      defaultTime: time_array,
      timeEnd: '',
      timeStart: '',
      onFocusCalender: false,
      onFocusTimer: false,
      onFocusGuest: false,
      errorMessage: '',
      totalHours: 0,
      loading: false,
      isStartedBooking: false,
      modify:{
        date:new Date(),
        startTime:'',
        endTime:'',
        startRange:'',
        endRange:'',
        adultCount: 1,
        childrenCount: 0,
        infantCount: 0,
        referral:false,
        customerInfo: {}
      },
      promocode:'',
      promoCodeError:'',
      isPromocodeApplied:false,
      appliedPromocode:'',
      promo_type:'',
      promo_percentage:'',
      isDefaultInstantBooking: false,
      minDate: null,
      maxDate: null,
      bookingData: null,
      preApprovedFlow: false,
      showPromoCodeInput: false,
      applyCredits: false,
      fromPage: null,
      selectedDateIsInvalid: false,
      allDatesIsInvalid: false,
      firstAvailableDate: null,
    };
    this.timeStartBooking = null;
    this.sendAnalyticsData = this.sendAnalyticsData.bind(this);
    this.handleCalenderCancel = this.handleCalenderCancel.bind(this);
    this.handleGuestCancel = this.handleGuestCancel.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleTimerCancel = this.handleTimerCancel.bind(this);
    this.handleTimerApply = this.handleTimerApply.bind(this);
    this.handleSelectReason = this.handleSelectReason.bind(this);
    this.handleRequestReservation = this.handleRequestReservation.bind(this);
    this.clickTime = this.clickTime.bind(this);
    this.handleLoginModelOpen = this.handleLoginModelOpen.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
    // this.getModifyTimerSet = this.getModifyTimerSet.bind(this);
    this.getExtraGuestFee = this.getExtraGuestFee.bind(this);
    this.updateAvalibilities = this.updateAvalibilities.bind(this);
    window.setAccessToken = this.setAccessToken.bind(this);
  }



  /**
   * @param {*} event
   */

  componentDidMount() {
    let accessToken = UserUtils.getAccessToken();
    let available_date = UserUtils.getAvailableDate();
    let adultCount = UserUtils.getAdultCount();
    let childrenCount = UserUtils.getChildCount();
    let infantCount = UserUtils.getInfantCount();
    let startTime = UserUtils.getStartTime();
    let endTime = UserUtils.getEndTime();
    let timerRangeMin = UserUtils.getTimerMin();
    let timerRangeMax = UserUtils.getTimerMax();
    let cardBrand = UserUtils.getCardBrand();
    let cardLastFourDigit = UserUtils.getCardLastFourDigit();
    let paymentReason = UserUtils.getPaymentReason();
    if(paymentReason === null) {
      paymentReason = '';
    }
    if(cardLastFourDigit === '' || cardLastFourDigit === null) {
      cardLastFourDigit = '';
    }
    let currentHour = new Date().getHours();
    if (timerRangeMin == null) {
      if (currentHour >= 18) {
        currentHour = 18;
      }
    }
    available_date = available_date === null ? new Date() : available_date;
    let date = new Date(available_date);
    let day = date.getDate();
    let year = date.getUTCFullYear();

    let monthVal = date.getMonth() + 1;
    let available = year + '-' + monthVal + '-' + day;

    let currentTime = cloneDeep(this.state.defaultTime)
    let start = this.state.timeStart
    let end = this.state.timeEnd
    currentTime.map((item, index) => {
      if (item.timeNumber === parseInt(timerRangeMin)) {
        if (!this.state.timeDetails[index].disable) {
          currentTime[index].activeClass = 'active'
          start = item.timeNumber
        }
      } else if (item.timeNumber === parseInt(timerRangeMax)) {
        if (!this.state.timeDetails[index].disable) {
          currentTime[index].activeClass = 'active'
          end = item.timeNumber
        }
      }
      this.setState({
        timeDetails: currentTime,
        timeStart: start,
        timeEnd: end
      })
      return null
    })

    let selectedDate = new Date(available_date)
    // get data from chat booking
    const bookingData = this.props.location.state && this.props.location.state.bookingData
      ? JSON.parse(this.props.location.state.bookingData) : null

    const fromPage = this.props.location.state && this.props.location.state.from
      ? this.props.location.state.from : null

    const preApprovedFlow = bookingData && bookingData.booking_status === 8
    if (bookingData) {
      let selectedDate = moment(bookingData.date)
      let from = time_array.find(item => item.time_insert === bookingData.from)
      let toIndex = time_array.findIndex(item => item.time_insert === bookingData.to) + 1
      let to = time_array[toIndex]
      startTime = from.displayFormattedTime
      endTime = to.displayFormattedTime
      start = from.timeNumber
      end = to.timeNumber
      timerRangeMin = from.timeNumber
      timerRangeMax = to.timeNumber
      adultCount = bookingData.adult_guests
      childrenCount = bookingData.children_guests
      infantCount = bookingData.infant_guests
      date = new Date(selectedDate)
      day = date.getDate()
      year = date.getUTCFullYear()
      monthVal = date.getMonth() + 1
      available = year + '-' + monthVal + '-' + day
    }

    const { invalidDates, selectedDateIsInvalid, firstAvailableDate } = commonFunctions.getInvalidDates(this.props.poolDetails, selectedDate)
    const unAvailableMonths = this.getUnAvailableMonths(this.props.poolDetails)
    const maxPoolDate = this.getMaxDate()
    const currentSelectedMonthNumber = moment(selectedDate).month() + 1
    const isNotAvailableDate = unAvailableMonths.includes(currentSelectedMonthNumber)
      || moment(maxPoolDate) < moment(selectedDate)

    if (selectedDateIsInvalid) {
      available = ''
      selectedDate = null
      startTime = null
      endTime = null
    }

    this.setState({
      accessToken: accessToken === null ? '' : accessToken,
      minDate: moment().format(),
      maxDate: moment().add('year', 1).format(),
      startTime: !startTime || isNotAvailableDate ? '' : startTime,
      endTime: !endTime || isNotAvailableDate ? '' : endTime,
      timerRangeMin: timerRangeMin === null ? currentHour + 1 : timerRangeMin,
      timerRangeMax: timerRangeMax === null ? currentHour + 2 : timerRangeMax,
      adultCount: adultCount === null ? 1 : parseInt(adultCount),
      childrenCount: childrenCount === null ? 0 : parseInt(childrenCount),
      infantCount: infantCount === null ? 0 : parseInt(infantCount),
      timeStart: start,
      timeEnd: end,
      availableDate: available,
      searchFields: {
        adultCount: adultCount === null ? 1 : parseInt(adultCount),
        childrenCount: childrenCount === null ? 0 : parseInt(childrenCount),
        infantCount: infantCount === null ? 0 : parseInt(infantCount),
      },
      cardBrand: cardBrand,
      cardLastFourDigit: cardLastFourDigit,
      totalHours: timerRangeMax - timerRangeMin,
      selectReason:paymentReason,
      defaultTimeSelection: startTime,
      allDatesIsInvalid: selectedDateIsInvalid && !firstAvailableDate,
      firstAvailableDate,
      bookingData,
      preApprovedFlow,
      unAvailableMonths,
      maxPoolDate,
      fromPage,
      invalidDates,
      selectedDateIsInvalid,
      selectedDate,
    },() => {
      this.handleModifySearch(true, 'date')
    })
    this.props.client.query({
      query: userDetailsQuery,
      fetchPolicy: "network-only"
    })
      .then((res) => {
        this.setState({
          referral: res.data.me.awards,
          cardBrand: res.data.me.card_brand,
          cardLastFourDigit: res.data.me.card_last_four,
          customerInfo: res.data.me
        })
      }).catch((error) => {
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && this.props.user && !this.state.customerInfo) {
      this.setState({
        customerInfo: this.props.user
      })
    }
  }

  getUnAvailableMonths = (poolDetails) => {
    const { months } = poolDetails
    const unAvailableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    for (let i = 0; i < months.length; i++) {
      const index = unAvailableMonths.indexOf(months[i].month_number)
      if (index !== -1) {
        unAvailableMonths.splice(index, 1)
      }
    }
    return unAvailableMonths
  }

  getMaxDate = () => {
    const { availability_window } = this.props.poolDetails
    // const lastMonthIndex = months && months.length ? months.reduce((prev, next) => {
    //   return next.month_number > prev ? next.month_number : prev
    // }, 0) : -1
    // const lastAvailableMonth = moment().set('month', lastMonthIndex - 1).endOf('month').format()
    const availabilityWindow = moment().add( availability_window, 'days' ).format()
    // return lastAvailableMonth <= availabilityWindow ? lastAvailableMonth : availabilityWindow
    return availabilityWindow
  }

  getMinDate = () => {
    const { months } = this.props.poolDetails
    const currentDate = moment()
    const currentMonthIndex = currentDate.month()
    const firstMonthIndex = months && months.length ? months[0].month_number - 1 : currentMonthIndex
    const firstMonthDate = moment().set('month', firstMonthIndex)
    if (firstMonthIndex >= currentMonthIndex) {
      return currentMonthIndex === firstMonthIndex ? firstMonthDate.format() : firstMonthDate.startOf('month').format()
    } else {
      return currentDate.format()
    }
  }

  setAccessToken() {
    let accessToken = UserUtils.getAccessToken();
    this.setState({ accessToken: accessToken });
    this.props.client.query({
      query: userDetailsQuery,
      fetchPolicy: "network-only"
    })
    .then((res) => {

      this.setState({
        cardBrand: res.data.me.card_brand,
        cardLastFourDigit: res.data.me.card_last_four,
        customerInfo: res.data.me
      })
    }).catch((error) => {
    });
  }

  handleLoginModelOpen(callback) {
    window.headerComponent.handleLoginModelOpen({callback});
  }

  handleCalender(val) {
    this.setState({
      calenderShow: val === true ? true : false,
      openGuest: false,
      timerShow: false,
      onFocusCalender: true,
      onFocusTimer: false,
      onFocusGuest: false
    });
    if (!this.timeStartBooking) {
      this.timeStartBooking = new Date()
    }
  }

  updateAvalibilities(from, initialRender = false) {
    let { poolDetails } = this.props;
    let { adultCount, childrenCount, modify, startTime, endTime, timeStart, timeEnd, selectedDateIsInvalid } = this.state;
    let selectedDate;
    if (from === 'modify') {
      selectedDate = UserUtils.getAvailableDate();
    } else {
      selectedDate = modify.date;
    }

    if (initialRender) {
      selectedDate = UserUtils.getAvailableDate() || modify.date;
    }

    let defaultTime = cloneDeep(time_array)

    if (initialRender && selectedDateIsInvalid) {
      defaultTime = defaultTime.map(item => {
        item.disable = true
        return item
      })
      this.setState({
        timeDetails: defaultTime,
        startTime: null,
        endTime: null,
        timeStart: null,
        timeEnd: null,
        defaultTime,
      })
      return
    }

    selectedDate = selectedDate === null ? new Date().setHours(0,0,0,0) : selectedDate;
    let date = new Date(selectedDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    date = year + '-' + month + '-' + day;

    const currentSelectedMonthNumber = moment(selectedDate).month() + 1
    const isNotAvailableDate = this.state.unAvailableMonths.includes(currentSelectedMonthNumber)
      || moment(this.state.maxPoolDate) < moment(selectedDate)

    // Get All Selected day bookings
    const bookings = HelperService.filterBookings(poolDetails.bookings, date)
    const bookingTimes = HelperService.getBookingsTimes(bookings)

    // set starTime no less than available_from of pool and set endTime no more than available_to of pool
    let startTimeNumber = startTime ? time_array.find(item => item.displayFormattedTime === startTime).timeNumber : null
    let endTimeNumber = endTime ? time_array.find(item => item.displayFormattedTime === endTime).timeNumber : null
    let startFrom = defaultTime.find(time => time.time_insert === poolDetails.available_from).timeNumber
    let endAt = defaultTime.find(time => time.time_insert === poolDetails.available_to).timeNumber
    startTimeNumber = startTimeNumber ? startTimeNumber && (startTimeNumber < startFrom) ? startFrom : startTimeNumber : null
    endTimeNumber = endTimeNumber ? endTimeNumber && (endTimeNumber > endAt) ? endAt : endTimeNumber : null
    startTime = startTimeNumber ? time_array.find(item => item.timeNumber === startTimeNumber).displayFormattedTime : null
    endTime = endTimeNumber ? time_array.find(item => item.timeNumber === endTimeNumber).displayFormattedTime : null
    let advanceNotice = poolDetails.advance_notice

    const questsCount = adultCount + childrenCount
    const isDefaultInstantBooking = poolDetails.default_instant_booking
      && (poolDetails.instant_group_size >= questsCount)
      && (poolDetails.max_guests >= questsCount)
    this.setState({
      isDefaultInstantBooking
    })

    // Loop the 24 hours
    let minAvailableDate = moment().add(advanceNotice, 'hours')

    if (new Date(this.state.minDate) > new Date(minAvailableDate)) {
      minAvailableDate = this.state.minDate
    }

    let firstAvailableTimeSlot = 0
    for(let i = 0; i < time_array.length; i++) {
      // Check time is booked or unavailable
      const dayUnavailable = poolDetails.unavailable_dates ? poolDetails.unavailable_dates.find(day => moment(day).isSame(moment(selectedDate), 'day')) : null
      const unvalibilities = poolDetails.pool_unavailabilities.filter(unavailability => moment(unavailability.date).isSame(moment(selectedDate), 'day'));
      const unvalibilityIndex = _.filter( unvalibilities, { time: defaultTime[i]['time_insert'] } );
      const bookingIndex = bookingTimes.indexOf(defaultTime[i]['timeNumber']);
      const currentDate = moment(selectedDate).hours(time_array[i].timeNumber)

      if (
        isNotAvailableDate
        || unvalibilityIndex.length >= 1
        || bookingIndex >= 0
        // || (sameDay === true && time_array[i].timeNumber < hour + (isDefaultInstantBooking ? advanceNotice : 0))
        || defaultTime[i].timeNumber < startFrom
        || defaultTime[i].timeNumber > endAt
        || dayUnavailable
        || currentDate < minAvailableDate
      ) {
        defaultTime[i].disable = true;
      } else if (!firstAvailableTimeSlot) {
        firstAvailableTimeSlot = defaultTime[i].timeNumber
      }

      if (!defaultTime[i].disable && isDefaultInstantBooking) {
        defaultTime[i].instaBookingClass = 'insta_booking'
      }

      /*
        ***Check time having instabooking or not
        ** if insta booking and time is disable remove insta booing
      */

      // //In last loop assign time details to state variable
      // if(i === time_array.length - 1) {
      //
      // }
    }

    // check if first available time slot more than first selected time slot
    if (firstAvailableTimeSlot > startTimeNumber) {
      // check if will the new selected range be more than one hour
      if ((endTimeNumber - firstAvailableTimeSlot) >= 1) {
        // set startTime to first available time slot
        startTimeNumber = firstAvailableTimeSlot
        startTime = time_array.find(item => item.timeNumber === startTimeNumber).displayFormattedTime
      } else {
        // clear selected time and active time slots
        startTimeNumber = null
        endTimeNumber = null
        startTime = null
        endTime = null
        timeStart = null
        timeEnd = null
        defaultTime = defaultTime.map((item) => {
          item.active = false
          return item
        })
      }
    }

    const { startTime: availableStartTime, endTime: availableEndTime } = HelperService.getAvailableStartEndTime({
      poolUnAvailabilities: poolDetails.pool_unavailabilities,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      startTime: timeStart,
      endTime: timeEnd,
      bookingTimes,
    })

    startTime = HelperService.formatTime(availableStartTime)
    endTime = HelperService.formatTime(availableEndTime)

    this.setState({
      startTime,
      endTime,
      timeStart: startTimeNumber,
      timeEnd: endTimeNumber,
      defaultTime: defaultTime,
      timeDetails: defaultTime
    })
  }

  handleCalenderApply(selectedDate) {
    let date = new Date(selectedDate);
    let { modify } = this.state;
    modify.date = date

    let day = date.getDate();
    let year = date.getUTCFullYear();
    let monthVal = date.getMonth() + 1;
    let available = year + '-' + monthVal + '-' + day;
    UserUtils.setAvailableDate(modify.date);

    let startTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if (!startTime) {
      closeModify = true;
    }

    this.setState({
      calenderShow: false,
      modify:modify,
      onFocusCalender: false,
      selectedDate: modify.date,
      availableDate: available,
      modifySearch: closeModify,
    }, () => {
      this.updateAvalibilities('date');
    });

  }

  handleCalenderCancel() {
    let startTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if (!startTime) {
      closeModify = true;
    }

    this.setState({
      calenderShow: false,
      onFocusCalender: false,
      modifySearch: closeModify,
    });
  }

  handleCount(val) {
    let { onFocusGuest, modify } = this.state;
    this.setState({
      searchFields: {
        adultCount: modify.adultCount,
        childrenCount: modify.childrenCount,
        infantCount: modify.infantCount,
      },
      openGuest: val === true ? true : false,
      calenderShow: false,
      timerShow: false,
      onFocusGuest: onFocusGuest === true ? false : true
    });
  }

  handleTimer(initialRender) {
    let { modify, defaultTime, timeDetails, timeStart, timeEnd } = this.state;
    defaultTime = cloneDeep(defaultTime);
    if (!!modify.startTime && !!modify.endTime) {
      let presentTime = cloneDeep(timeDetails);
      timeStart = parseInt(modify.startRange);
      timeEnd = parseInt(modify.endRange);
      let modifyStartRangeIndex = time_array.findIndex(time => time.timeNumber === timeStart)
      let modifyEndpointMessageRangeIndex = time_array.findIndex(time => time.timeNumber === timeEnd)
      for (let i = parseInt(modifyStartRangeIndex); i <= parseInt(modifyEndpointMessageRangeIndex); i++) {
        if (!presentTime[i].disable) {
          defaultTime[i].activeClass = 'active';
          if (i === modifyEndpointMessageRangeIndex) {
            this.setState({
              timeDetails: defaultTime
            });
          }
        } else {
          this.setState({
            timeDetails: defaultTime
          });
          break;
        }
      }
    } else{
      this.setState({
        timeDetails: defaultTime
      });
      timeStart = '';
      timeEnd = '';
    }

    this.setState({
      timeStart:timeStart,
      timeEnd:timeEnd,
      timerShow: !initialRender,
      onFocusTimer: true,
      onFocusCalender: false,
      onFocusGuest: false,
      calenderShow: false,
    });
  }

  //Cancel time
  handleTimerCancel() {
    let startTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if (!startTime) {
      closeModify = true;
    }

    this.setState({
      timerShow: false,
      onFocusTimer: false,
      timeStart:'',
      timeEnd:'',
      modifySearch: closeModify,
    }, () => this.updateAvalibilities('modify'));
  }

  handleGuestApply(data) {
    const { poolDetails } = this.props
    let startTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if(startTime === null || startTime === '') {
      closeModify = true;
    }

    let { modify } = this.state;
    modify.adultCount = data.adultCount;
    modify.childrenCount = data.childrenCount;
    modify.infantCount = data.infantCount;
    UserUtils.setAdultCount(modify.adultCount);
    UserUtils.setChildCount(modify.childrenCount);
    UserUtils.setInfantCount(modify.infantCount);
    const questsCount = modify.adultCount + modify.childrenCount
    const isDefaultInstantBooking = poolDetails.default_instant_booking
      && (poolDetails.instant_group_size >= questsCount)
      && (poolDetails.max_guests >= questsCount)
    this.setState({
      modify:modify,
      openGuest: false,
      onFocusGuest: false,
      adultCount: modify.adultCount,
      childrenCount: modify.childrenCount,
      infantCount: modify.infantCount,
      modifySearch: closeModify,
      isDefaultInstantBooking
    });
  };

  handleGuestCancel() {
    let startTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if (!startTime) {
      closeModify = true;
    }
    this.setState({
      openGuest: false,
      onFocusGuest: false,
      modifySearch: closeModify,
    });
  };

  onSubmitSearchPool() {
  }

  handleModifySearch(initialRender, from = 'modify') {
    let { adultCount, childrenCount, infantCount, selectedDate, startTime, endTime, timerRangeMax,timerRangeMin } = this.state;
    let modify = {
      date: new Date(selectedDate),
      startTime: startTime,
      endTime: endTime,
      adultCount: adultCount,
      childrenCount: childrenCount,
      infantCount: infantCount,
      startRange: timerRangeMin,
      endRange: timerRangeMax
    }
    this.setState({ modifySearch: true, defaultTimeSelection:'', modify:modify},()=>{
      this.handleTimer(initialRender);
      this.updateAvalibilities(from, initialRender);
    });
    if (!this.timeStartBooking) {
      this.timeStartBooking = new Date()
    }
  }

  handleSelectReason(e) {
    UserUtils.setPaymentReason(e.target.value);
    this.setState({ selectReason: e.target.value });
    if (!this.timeStartBooking) {
      this.timeStartBooking = new Date()
    }
  }

  handlePromocode = e => {
    this.setState({
      promocode:e.target.value
    })
  }

  handleRequestReservation() {
    let { isDefaultInstantBooking, customerInfo, totalHours, availableDate,selectedDate, isPromocodeApplied, appliedPromocode, cardLastFourDigit, adultCount, childrenCount, infantCount, startTime, endTime, selectReason, preApprovedFlow } = this.state;
    let { hourlyPrice, serviceCharge } = this.props;

    let defaultStartTime = this.state.defaultTimeSelection;
    let closeModify = false;
    if(defaultStartTime === null || defaultStartTime === '') {
      closeModify = true;
    }

    let totalPrice = hourlyPrice * totalHours;
    if((cardLastFourDigit !== '' && cardLastFourDigit !== null && isDefaultInstantBooking && selectReason) || (!isDefaultInstantBooking && selectReason)) {
      let { poolId, history, poolDetails } = this.props;
      if (startTime && endTime && selectedDate) {
        let startRange = UserUtils.getTimerMin();
        let compairDate = moment(selectedDate).format('DD-MM-YYYY');
        let presentDate = moment(new Date()).format('DD-MM-YYYY');
        let hour = new Date().getHours()+1;

        const currentSelectedMonthNumber = moment(selectedDate).month() + 1
        const isNotAvailableDate = this.state.unAvailableMonths.includes(currentSelectedMonthNumber)
          || moment(this.state.maxPoolDate) < moment(selectedDate)

        if (isNotAvailableDate) {
          this.setState({ errorMessage: 'Booking is not allowed for selected date.' });
          window.scrollTo(0, 0);
        } else if(compairDate === presentDate && startRange < hour) {
          this.setState({ errorMessage: 'Booking is not allowed for selected time slots.' });
          window.scrollTo(0, 0);
        } else {
          let status = ''
          if (isDefaultInstantBooking || preApprovedFlow) {
            status = "book_this_pool";
          } else {
            status = "request_reservation";
          }
          this.setState({
            errorMessage: '',
            loading: true
          });
          let promoCode = '';
          if(isPromocodeApplied === true) {
            promoCode = appliedPromocode;
          }

          const queryParams = new URLSearchParams(this.props.history.location.search)
          const from = queryParams.get('from')
          const searchAddress = from === 'search' ? UserUtils.getAddress() || '' : ''

          let data = {
            "pool_id": parseInt(poolId),
            "date": availableDate,
            "from": startTime,
            "to": endTime,
            "adult_guests": parseInt(adultCount),
            "children_guests": parseInt(childrenCount),
            "infant_guests": parseInt(infantCount),
            "reason_for_booking": selectReason || "",
            'promo_code':promoCode,
            'useAward': this.state.applyCredits,
            'search_address': searchAddress,
          }

          if (this.state.bookingData && this.state.bookingData.id) { // add id to update exist booking
            data.booking_id = this.state.bookingData.id
          }

          this.props.client.mutate({
            mutation: bookPoolMutation,
            variables: {
              data: data
            }
          })
            .then((res) => {
              this.sendAnalyticsData(poolId, res.data.bookPool.booking_id)
              if (res.data.bookPool.status === "BOOKING_SUCCESSFULL") {
                const tagManagerArgs = {
                  dataLayer: {
                    'transactionId':res.data.bookPool.booking_id,
                    'userID': customerInfo.id,
                    'poolID': poolId,
                    'date': moment(selectedDate).format('YYYY-MM-DD'),
                    'hours': totalHours,
                    address:(poolDetails.street_number !== 'long_name')?poolDetails.street_number:'',
                    city:poolDetails.city,
                    state:poolDetails.state,
                    zipcode:poolDetails.zip_code,
                    'hourlyPrice': hourlyPrice,
                    'totalPrice': totalPrice,
                    'serviceCharge': serviceCharge,
                    'orderid':res.data.bookPool.booking_id,
                    'revenue':totalPrice,
                    'value':totalPrice,
                    'customerInfo': {
                      'firstName': customerInfo.firstname,
                      'lastname': customerInfo.lastname,
                      'userID': customerInfo.id,
                      'email': customerInfo.email,
                    },
                  },
                  dataLayerName: 'PageDataLayer'
                }
                TagManager.dataLayer(tagManagerArgs);


                data.date = moment(selectedDate).format('ddd, MMMM DD, YYYY');
                data.status = status;
                UserUtils.setPoolBookingStatus(JSON.stringify(data));
                this.props.handleRequestReservation(res.data);
                this.setState({ loading: false });
                history.push('/reservation-success');
              } else {
                this.setState({
                  errorMessage: res.data.bookPool.message,
                  loading: false,
                  modifySearch:closeModify
                })
                window.scrollTo(0, 0);
              }
            }).catch((error) => {
              let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
              this.setState({
                errorMessage: errorMsg,
                loading: false,
                modifySearch:closeModify
              });
            });
        }

      } else if (!selectedDate) {
        this.setState({ errorMessage: 'Please select date for booking', modifySearch:closeModify });
        window.scrollTo(0, 0);
      } else {
        this.setState({ errorMessage: 'Please check start and end time', modifySearch:closeModify });
        window.scrollTo(0, 0);
      }
    } else if (!startTime && !endTime) {
      this.setState({ errorMessage: 'Please check start and end time', modifySearch:closeModify });
      window.scrollTo(0, 0);
    } else if (!selectReason) {
      this.setState({
        errorMessage: 'Please select reason for booking', modifySearch:closeModify
      })
      window.scrollTo(0, 0);
    }
  }

  sendAnalyticsData(poolId, bookingId) {
    if (!this.state.isDefaultInstantBooking) {
      const analyticsData = {
        timestamp: new Date().toISOString(),
        'event_type': 'booking-finish',
        poolId: poolId,
        bookingId: bookingId,
        platform: 'web',
        location: IS_US ? 'US' : 'AU',
        userId: UserUtils.getUserID(),
        userRole: 'swimmer',
      };
      sendAnalytics( this.props.client, analyticsData );
    }
    let timeEnd = new Date()
    if (this.timeStartBooking && timeEnd) {
      let spentTime = timeEnd - this.timeStartBooking
      let data = {
        timestamp: new Date().toISOString(),
        'event_type': 'pool-time-spend',
        duration: spentTime,
        platform: 'web',
        location: IS_US ? 'US' : 'AU',
        userId: UserUtils.getUserID(),
        userRole: 'swimmer'
      }
      sendAnalytics( this.props.client, data )
    }
  }

  onMouseEnter(index) {
    let { timeStart, timeEnd, timeDetails } = this.state
    timeDetails = cloneDeep(timeDetails)
    if (timeStart && !timeEnd) {
      let startIndex = time_array.findIndex(time => time.timeNumber === timeStart)
      for (let i = startIndex; i < time_array.length; i++) {
        if (i <= index && i !== startIndex) {
          timeDetails[i].hoverClass = 'hovered'
        } else {
          timeDetails[i].hoverClass = ''
        }
      }
      this.setState({ timeDetails })
    }
  }

  clickTime(index) {
    let { timeStart, timeEnd, defaultTime, timeDetails } = this.state;
    defaultTime = cloneDeep(defaultTime);
    let presentTime = cloneDeep(timeDetails);

    if ((timeStart === '' && timeEnd === '') || (timeStart !== '' && timeEnd !== '')) {
      if (!presentTime[index].disable) {
        defaultTime[index].activeClass = 'active';
        // defaultTime = commonFunctions.updateDefaultTime( defaultTime, presentTime, index, time_array )
        this.setState({
          timeStart: time_array[index].timeNumber,
          timeEnd: '',
          timeDetails: defaultTime
        });
      }
    } else {
      let start = timeStart;
      if (start > time_array[index].timeNumber) {
        defaultTime[index].activeClass = 'active';
        // defaultTime = commonFunctions.updateDefaultTime( defaultTime, presentTime, index, time_array )
        this.setState({
          timeStart: time_array[index].timeNumber,
          timeEnd: '',
          timeDetails: defaultTime
        });
      } else {
        let startIndex = time_array.findIndex(time => time.timeNumber === start)
        for (let i = startIndex; i <= index; i++) {
          if (!presentTime[i].disable) {
            defaultTime[i].activeClass = 'active';
            if (i + 1 === index) {
              this.setState({
                timeEnd: time_array[index].timeNumber,
                timeDetails: defaultTime
              });
            }
          } else {
            this.setState({
              timeEnd: time_array[index].timeNumber,
              timeDetails: defaultTime
            });
            break;
          }
        }
      }
    }
    if (!this.timeStartBooking) {
      this.timeStartBooking = new Date()
    }
  }

  handleTimerApply() {
    let {modify, timeStart, timeEnd } = this.state;
    if(timeStart !== '') {
      let start = "";
      if (timeStart !== "") {
        timeStart = parseInt(timeStart);
        if (timeStart > 12) {
          start = (timeStart - 12) + ":00 PM";
        } else if (timeStart === 12) {
          start = (timeStart) + ":00 PM";
        } else if (timeStart === 0) {
          start = "12:00 AM";
        } else {
          start = timeStart + ":00 AM";
        }
      }

      let end = "";

      if(timeEnd === '') {
        timeEnd =  timeStart;
      } else {
          timeEnd = parseInt(timeEnd);
      }

      if (timeEnd !== "") {
        timeEnd = parseInt(timeEnd);
        if (timeEnd > 12) {
          if(timeEnd === 24) {
            end = "12:00 AM";
          } else {
            end = (timeEnd - 12) + ":00 PM";
          }

        } else if (timeEnd === 12) {
          end = (timeEnd) + ":00 PM";
        } else {
          end = timeEnd + ":00 AM";
        }
      }

      modify.startTime = start;
      modify.endTime = end;
      modify.startRange = timeStart;
      modify.endRange = timeEnd;

      UserUtils.setStartTime(modify.startTime);
      UserUtils.setEndTime(modify.endTime);
      UserUtils.setTimerMin(modify.startRange);
      UserUtils.setTimerMax(modify.endRange);

      let defaultStartTime = this.state.defaultTimeSelection;
      let closeModify = false;
      if(defaultStartTime === null || defaultStartTime === '') {
        closeModify = true;
      }

      this.setState({
        modify:modify,
        timerShow: false,
        onFocusTimer: false,
        errorMessage: "",
        startTime: modify.startTime,
        endTime: modify.endTime,
        timerRangeMax: modify.endRange,
        timerRangeMin: modify.startRange,
        totalHours: parseInt(modify.endRange) - parseInt(modify.startRange),
        modifySearch: closeModify,
      })
    } else {
      modify.startTime = '';
      modify.endTime = '';
      UserUtils.setStartTime(modify.startTime);
      UserUtils.setEndTime(modify.endTime);
      this.setState({
        startTime: modify.startTime,
        endTime: modify.endTime,
        modify:modify,
        timerShow: false,
        onFocusTimer: false,
        modifySearch: true,
      })
    }
  }

  applyPromocode = e => {
    let { promocode } = this.state;
    let access_token = UserUtils.getAccessToken()
    if(access_token !== undefined && access_token !== '' && access_token !== null) {
      let { startTime, endTime } = this.state;

      if (!!startTime && !!endTime) {
          if(promocode !== undefined && promocode !== '') {
            this.props.client.mutate({
              mutation: verifyPromocode,
              variables: {
                data: {
                  'promocode':promocode,
                }
              }
            })
            .then((res) => {
                this.setState({
                  isPromocodeApplied:true,
                  appliedPromocode:promocode,
                  promo_type:res.data.verifyPromocode.off_type,
                  promo_percentage:res.data.verifyPromocode.percent_off,
                  promoCodeError:''
                })
            }).catch((error) => {
              let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
              this.setState({
                promoCodeError: errorMsg,
                isPromocodeApplied:false,
                appliedPromocode:'',
                promo_type:'',
                promo_percentage:'',
                loading: false,
              });
            });
          } else {
            this.setState({
              promoCodeError:'Please enter promo code',
              isPromocodeApplied:false,
              appliedPromocode:'',
              promo_type:'',
              promo_percentage:'',
            })
          }
      } else {
        this.setState({
          promoCodeError: 'Please select start and end time',
          isPromocodeApplied:false,
          appliedPromocode:'',
          promo_type:'',
          promo_percentage:'',
        });
      }
    } else {
      window.headerComponent.handleLoginModelOpen();
    }

  }

  returnGuestText(adultCount,childrenCount, infantCount) {
    let aCount = "";
    let aLabel = "";
    if (adultCount === 0) {
      aCount = "";
      aLabel = "";
    } else if (adultCount === 1) {
      aCount = adultCount;
      aLabel = (childrenCount === 0 && infantCount === 0) ? "Adult" : "Adult,";
    } else {
      aCount = adultCount;
      aLabel = (childrenCount === 0 && infantCount === 0) ? "Adults" : "Adults,";
    }
    let cCount = "";
    let cLabel = "";
    if (childrenCount === 0) {
      cCount = "";
      cLabel = "";
    } else if (childrenCount === 1) {
      cCount = childrenCount;
      cLabel = infantCount === 0 ? "Children" : "Children,";
    } else {
      cCount = childrenCount;
      cLabel = infantCount === 0 ? "Childrens" : "Childrens,";
    }
    let iCount = "";
    let iLabel = "";
    if (infantCount === 0) {
      iCount = "";
      iLabel = "";
    } else if (infantCount === 1) {
      iCount = infantCount;
      iLabel = "Infant";
    } else {
      iCount = infantCount;
      iLabel = "Infants";
    }

    return aCount+' '+ aLabel+' \u00A0'+cCount+' '+cLabel+' \u00A0'+iCount+' '+iLabel;
  }

  getExtraGuestFee = () => {
    const { poolDetails } = this.props
    let { adultCount, childrenCount, totalHours, startTime, endTime } = this.state
    totalHours = (!startTime || !endTime) ? 0 : totalHours
    const selectedGuestsCount = adultCount + childrenCount
    if (selectedGuestsCount > poolDetails.price_per_guest_min_capacity) {
      return ((selectedGuestsCount - poolDetails.price_per_guest_min_capacity) * poolDetails.price_per_guest) * totalHours
    } else {
      return 0
    }
  }

  handleTimerPopup = () => {
    this.setState({
      openGuest: false,
      onFocusGuest: false,
      calenderShow: false,
      timerShow: !this.state.timerShow
    })
  }

  handleApplyDate = (date) => {
    date = moment(date).isBefore(moment(this.state.firstAvailableDate), 'day') ? this.state.firstAvailableDate : date
    date = !this.state.allDatesIsInvalid ? date : null
    this.setState({
      selectedDate: date,
      calenderShow: false,
    }, () => {
      this.handleCalenderApply(date)
    })
  }

  handleApplyTime = ({ startTime, endTime }) => {
    this.setState({
      startTime,
      endTime,
      timeStart: startTime,
      timeEnd: endTime,
      timerShow: false,
    }, () => {
      this.handleTimerApply()
    })
  }

  handleCalendarPopup = () => {
    this.setState({
      openGuest: false,
      onFocusGuest: false,
      calenderShow: !this.state.calenderShow,
      timerShow: false,
    })
  }

  handlePromoCodeInput = (show) => {
    this.setState({
      showPromoCodeInput: show
    })
  }

  toggleApplyCredits = () => {
    this.setState({
      applyCredits: !this.state.applyCredits
    })
  }

  renderTotalIncludingCredits = (total, serviceFee) => {
    const { classes } = this.props
    const { customerInfo } = this.state
    total = +Number(total).toFixed(1)
    serviceFee = +Number(serviceFee).toFixed(1)
    const balance = customerInfo && customerInfo.referral_balance ? customerInfo.referral_balance : 0
    const totalIncludingCredits = balance >= total ? serviceFee : total - balance
    const countUsedCredits = balance >= total ? total - serviceFee : balance

    return (
      <div className={classes.totalIncludingCredits}>
        <Typography variant='h4'>
          Total
          <div className='flex'>
            <span className='total'>$ {total.toFixed(2)}</span>
            <span className='increase'>- $ {countUsedCredits.toFixed(2)}</span>
          </div>
        </Typography>
        <Typography variant='h3'>Total <span>$ {totalIncludingCredits.toFixed(2)} {IS_US ? 'USD' : ''}</span></Typography>
      </div>
    )
  }

  /**
   * render
   */
  render() {
    let { classes, hourlyPrice, serviceCharge, poolDetails, referalDiscount } = this.props;

    let {
      modify,
      loading,
      cardBrand,
      searchFields,
      selectReason,
      onFocusGuest,
      // onFocusTimer,
      // onFocusCalender,
      modifySearch,
      updateBtn,
      selectedDate,
      openGuest,
      calenderShow,
      adultCount,
      childrenCount,
      infantCount,
      timerShow,
      // timer,
      startTime,
      endTime,
      timeStart,
      timeEnd,
      cardLastFourDigit,
      // errorMessage,
      totalHours,
      referral,
      promocode,
      promoCodeError,
      isPromocodeApplied,
      promo_type,
      promo_percentage,
      // timeDetails,
      customerInfo,
      isDefaultInstantBooking,
      preApprovedFlow,
      fromPage,
    } = this.state;
    let timerSetLabel = (!startTime || !endTime) ? "" : startTime + " - " + endTime;

    // let modifyTimerSet = this.getModifyTimerSet(modify, timeStart, timeEnd);
    let guests = '';
    if (!modify.adultCount && !modify.childrenCount && !modify.infantCount) {
      guests = "Select guests";
    } else {
      guests = "";
    }
    let guestLabel = this.returnGuestText(adultCount,childrenCount, infantCount)
    let modifyGuestLabel = this.returnGuestText(modify.adultCount,modify.childrenCount, modify.infantCount)

    let hours = (!startTime || !endTime) ? 0 : totalHours
    let totalPrice = hourlyPrice * hours;
    let basicAmount = totalPrice;

    let promoCodeAmount = 0;


    if(isPromocodeApplied === true) {
      if(promo_type === 'percent') {
        promoCodeAmount = (totalPrice/100)*promo_percentage;
      } else {
        promoCodeAmount = promo_percentage;
      }
      if(promoCodeAmount >=  totalPrice) {
        totalPrice = 0;
        promoCodeAmount = basicAmount;
      } else {
        totalPrice = totalPrice-promoCodeAmount;
      }
    }

    let referalAmount = "0.00";
    if(referral === true || referral === 'true') {
      referalAmount = (totalPrice / 100) * referalDiscount;
      referalAmount = referalAmount.toFixed(2)
    }

    let extraGuestFee = poolDetails.price_per_guest_enabled ? this.getExtraGuestFee() : 0;

    serviceCharge = ((totalPrice / 100) * serviceCharge) + ((extraGuestFee / 100) * serviceCharge);
    let total = totalPrice + serviceCharge - referalAmount + extraGuestFee;
    extraGuestFee = extraGuestFee.toFixed(2);
    totalPrice = parseFloat(totalPrice).toFixed(2);
    basicAmount = parseFloat(basicAmount).toFixed(2);
    promoCodeAmount = parseFloat(promoCodeAmount).toFixed(2);
    serviceCharge = parseFloat(serviceCharge).toFixed(2);
    total = parseFloat(total).toFixed(2);

    // let status = "";
    // if (!startTime && !endTime) {
    //   status = 'pool_availability';
    // } else {
    //   status = isDefaultInstantBooking ? 'COMPLETE PURCHASE' : 'REQUEST RESERVATION'
    // }

    const status = 'pool_availability'

    return (
      <Card className={classes.searchpoolContainer}>
        {loading === true ? <Pageloader loading={loading} /> : ''}
        {modifySearch === false ?
          <div>
            <div className={classes.paymentFormContainer}>
              <Typography variant="subtitle2" component="label">Date and Time</Typography>
              <p><Moment format="MMMM DD, YYYY">{selectedDate}</Moment><br />
                  {timerSetLabel} </p>
            </div>
            <div className={classes.paymentFormGuest}>
              <Typography variant="subtitle2" component="label">Guests</Typography>
              <p>
                {guestLabel}
                <span onClick={this.handleModifySearch.bind(this, !modifySearch)}> MODIFY</span>
              </p>
            </div>
            <div className={classes.divider}></div>
          </div> : ""
        }
        {modifySearch === true ?
          <div>
            <div className={classes.priceContainer}>
              <div>
                <span className='bold big'>${hourlyPrice} </span>
                per hour
              </div>
              {
                poolDetails.rating ?
                  <div>
                    <img src={window.location.origin + "/img/icons/star.png"} className={classes.starIcon} alt=''/>
                    <span className='bold'>{+parseFloat(poolDetails.rating || 0).toFixed(1)}</span>
                    <span className='light'>/ 5</span>
                  </div> : null
              }
            </div>
            <div>
              {poolDetails && poolDetails.default_instant_booking
                ? <div className={classes.cancellationPolicyBox} style={{paddingRight: 0, marginRight: 0, maxWidth: 'unset', paddingBottom: 0}}>
                  <img src={`${window.location.origin}/img/time.png`} width={19} height={19} alt='' />
                  <div>
                    <h5>Instant booking</h5>
                    <p>This pool is pre approved for all reservations with up to {poolDetails.instant_group_size} guests</p>
                  </div>
                </div>
                : null
              }
            </div>
            <div className={classes.divider}></div>
            {/* <Typography variant="h6" component="h6">RESERVATION DATE AND TIME</Typography> */}
            <SelectDateAndTime
              poolDetails={poolDetails}
              date={this.state.selectedDate}
              startTime={timeStart}
              endTime={timeEnd}
              handleApplyDate={this.handleApplyDate}
              handleApplyTime={this.handleApplyTime}
              handleCalendarPopup={this.handleCalendarPopup}
              handleTimerPopup={this.handleTimerPopup}
              showCalendar={calenderShow}
              showTimer={timerShow}
              isDefaultInstantBooking={isDefaultInstantBooking}
              fromPage={fromPage}
              invalidDates={this.state.invalidDates}
              allDatesIsInvalid={this.state.allDatesIsInvalid}
            />
            <div className={classes.formInputBox + " " + (onFocusGuest === true ? classes.onFocusGuest : "")} >
              <Typography variant="subtitle2" className='light' component="label">Who will be coming?</Typography>
              <div className={classes.dropDownSelect} onClick={this.handleCount.bind(this, openGuest === true ? false : true)}>
              {guests}
                {modifyGuestLabel}
                {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
                <i className="fas fa-caret-down" style={{fontSize: 15}} aria-hidden="true"></i>
              </div>

              {openGuest === true ?
                <GuestPopup
                  poolDetails={poolDetails}
                  updateBtn={updateBtn}
                  searchFields={searchFields}
                  adultCountNew={modify.adultCount}
                  childrenCountNew={modify.childrenCount}
                  infantCountNew={modify.infantCount}
                  handleGuestCancel={this.handleGuestCancel}
                  handleGuestApply={this.handleGuestApply.bind(this)}
                /> : ""}
            </div>
          </div>
          : ""}

        <div className={classes.formInputBox}>
          <Typography variant="subtitle2" className='light' component="label">Reason for Booking
          {/* <div className={classes.optional}>Optional</div> */}
          </Typography>

          <Select
            value={selectReason}
            onChange={this.handleSelectReason}
            className={classes.selectReason}
            displayEmpty
            MenuProps={{ classes: { paper: classes.dropdownStyle } }}
          >
            <MenuItem value="" className={classes.selectMenuPopup}>Select</MenuItem>
            <MenuItem value="Family Swim" className={classes.selectMenuPopup}>Family Swim</MenuItem>
            <MenuItem value="Social Swim" className={classes.selectMenuPopup}>Social Swim</MenuItem>
            <MenuItem value="Health" className={classes.selectMenuPopup}>Health</MenuItem>
            <MenuItem value="Event" className={classes.selectMenuPopup}>Event</MenuItem>
            <MenuItem value="Swimming Lessons/Courses" className={classes.selectMenuPopup}>Swimming Lessons/Courses</MenuItem>
            <MenuItem value="Photo/Video Shoot" className={classes.selectMenuPopup}>Photo/Video Shoot</MenuItem>
            <MenuItem value="Other" className={classes.selectMenuPopup}>Other</MenuItem>
          </Select>
        </div>
        <div className={classes.divider}></div>
        <div className={classes.paymentDetails}>
          <Typography variant="subtitle2" component="label">Payment Details</Typography>
          <p className='bold'>Once the host approves your request, you will be asked to confirm it. Only then will you be charged.</p>
          <p><span style={{fontWeight: 500, marginRight: 5}}>{hours && hours+".0"}</span> hours x ${hourlyPrice}<span className='last'>${basicAmount}</span></p>

          {isPromocodeApplied === true?(
            <p className={classes.promocodeDiscount}>Promocode discount <span className='bold'>-${promoCodeAmount}</span></p>
          ):''}

          <p>Service fee <span className='last'>${serviceCharge}</span></p>
          {referalAmount !=='0.00' ? (<p>{referalDiscount}% referral credit <span>-${referalAmount}</span></p>):'' }
        </div>
        {poolDetails.price_per_guest_enabled && <div className={classes.paymentDetails}>
          <p>Extra guests fee: <span>${extraGuestFee}</span></p>
        </div>}

        <div>
          <div
            onClick={this.handlePromoCodeInput.bind(this, true)}
            className={classes.addPromoCodeButton}
          >
            <p>Add promo code</p>
          </div>
          {this.state.showPromoCodeInput && <div className={classes.promocodeContainer}>
            <TextField
              className='promocode-input'
              id="promocode"
              placeholder="Promo code"
              type="text"
              name="promocode"
              autoComplete=""
              margin="normal"
              variant="outlined"
              value={promocode}
              onChange={this.handlePromocode}
            />
            <div onClick={this.applyPromocode} className='promocode-button'>
                <Typography variant="button">
                  Apply
                </Typography>
            </div>
          </div>}
        </div>

        {
          customerInfo && customerInfo.referral_balance ? <>
            <div className={classes.divider} />
            <div className={classes.applyCreditsContainer}>
              <div className='info'>
                <p>APPLY CREDITS</p>
                <p className='credits'>$ {customerInfo.referral_balance}</p>
              </div>
              <Toggle
                toggled={this.state.applyCredits}
                onToggle={this.toggleApplyCredits}
              />
            </div>
          </> : null
        }
        <div className={classes.divider} />

        {promoCodeError !== ''?<p className={classes.error}>{promoCodeError}</p>:''}
        {isPromocodeApplied === true?<p className={classes.success}>Promocode applied succefully</p>:''}

        <div className={classes.totalValue}>
          {
            customerInfo && customerInfo.referral_balance && this.state.applyCredits ?
              this.renderTotalIncludingCredits(total, serviceCharge)
              : <Typography variant="h3">Total <span>${total} {IS_US ? 'USD' : ''}</span></Typography>
          }

        </div>
        {/* {errorMessage === "" ? "" : <Typography variant="caption" component="p">{errorMessage}</Typography>} */}
        <div>
          {(status === 'pool_availability' && poolDetails.id) ? (
            <PoolAvailabilities
              errorMessage={this.state.errorMessage}
              from='payment'
              poolDetails={poolDetails}
              handleRequestReservation={this.handleRequestReservation}
              handleLoginModelOpen={this.handleLoginModelOpen}
              cardLastFourDigit={cardLastFourDigit}
              cardBrand={cardBrand}
              customerInfo={customerInfo}
              isDefaultInstantBooking={isDefaultInstantBooking}
              preApprovedFlow={preApprovedFlow}
              needGoBackAfterUpdate
            />
          ) : (
            <div>
              {
                this.state.errorMessage ?
                  <Typography
                    variant='caption'
                    className={classes.caption}
                    component='p'>
                    {this.state.errorMessage}
                  </Typography> : null
              }
              <div onClick={this.handleRequestReservation} className={classes.activeReservationBtn}>
                <Typography variant="button">
                  {status === 'pool_availability' ? ('REQUEST RESERVATION') : status}
                </Typography>
              </div>
            </div>

          )}
        </div>
        {poolDetails.cancellation_policy ? (
          <div>
            <div className={classes.divider}></div>
            <div>
              <Typography variant="subtitle2" component="label">Cancellation Policy</Typography>
              <div className={classes.cancellationPolicyBox}>
                <i className="far fa-thumbs-up"></i>
                <div>
                  <h5>{poolDetails.cancellation_policy.title}</h5>
                  <p>{poolDetails.cancellation_policy.description}</p>
                </div>
              </div>
            </div>
            <div className={classes.cancellationPolicyBox} style={{marginTop: 0}}>
              <i className="fa fa-exclamation-circle" style={{marginRight: 10}}></i>
              <div>
                <p>Service fee is not refundable</p>
              </div>
            </div>
          </div>
        ) : ''}
      </Card>
    );
  }
}


PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

function PaymentFormContainer (props) {
  const userContext = useContext(UserContext)
  const { region } = useContext(RegionContext)
  return <PaymentForm region={region} {...userContext} {...props} />
}

export default enhance(PaymentFormContainer);
