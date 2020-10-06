import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import UserUtils from '../utilities/UserUtils';
import { loader } from 'graphql.macro';
import { withApollo } from "react-apollo";
import Pageloader from './../commons/pageloader';
import Moment from 'react-moment';
import * as commonFunctions from './../utilities/commonFunctions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import update from 'immutability-helper'
// import EditPromoCode from './editPromocode';
import { SWIMMER_CANCEL_CONFIRMED_REASONS, SWIMMER_CANCEL_REASONS } from '../../constants'
import TextField from '@material-ui/core/TextField'

// contexts
import UserContext from '../../contexts/UserContext';
import AppContext from "../../contexts/AppContext";
import SocialIcons from "../shared/social-icons";
import HelperService from "../../services/helper";
const myReservationsQuery = loader('./../../graphql/reservations/myReservationsQuery.graphql');
const confirmReservationMutation = loader('./../../graphql/reservations/confirmReservationMutation.graphql');
const cancelReservationMutation = loader('./../../graphql/reservations/cancelReservationMutation.graphql');
const hideCompletedBooking = loader('./../../graphql/reservations/hideCompletedBooking.graphql');
const getProfileDetails = loader('./../../graphql/user/me.graphql');

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <div
      className={className}
      style={{
        'position': 'absolute',
        'top': '50%',
        'right': '10px',
        'width': '32px',
        'height': '32px',
        'background': 'url(img/next.png)',
        'backgroundPosition': ' right',
        'zIndex': '9',
        'cursor': 'pointer',
        'opacity': '0.8',
        'fontSize': '25px',
        backgroundSize: 'cover',
        backgroundRepeat: " no-repeat"
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <div
      className={className}
      style={{
        'position': 'absolute',
        'top': '50%',
        'left': '10px',
        'width': '32px',
        'height': '32px',
        'backgroundPosition': ' 0 0',
        'background': 'url(img/prev.png)',
        'zIndex': '9',
        'cursor': 'pointer',
        'opacity': '0.8',
        'fontSize': '25px',
        backgroundSize: 'cover',
      }}
      onClick={onClick}
    ></div>
  );
}

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
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    }
  },
  searchResultsContainer: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'flex-start',
    '@media (max-width:767px)': {
      display: 'block',
      '& > div':{
        paddingBottom:'0 !important'
      }
    }
  },
  item: {
    width: '80%'
  },
  resultMain: {
    position: 'relative',
    margin: '0 -15px',
    '& img': {
      width: '100%',
      height: 'auto',
      borderRadius: '4px !important',
      overflow: 'hidden'
    }
  },
  description: {
    '@media (min-width:767px)':{
      paddingTop: '0 !important'
    }
  },
  leftSideCol: {
    '& h2': {
      marginBottom: '15px',
      fontSize: '25px',
    },
    '& h4': {
      marginTop: '0px',
      marginBottom: '5px',
      fontWeight: '400',
      color: '#7b858b',
      fontSize: '14px',
      '& p': {
        textTransform: 'capitalize',
      },
      '& div': {
        marginTop: '14px',
        color: theme.palette.common.blue,
        '& a': {
          color: theme.palette.common.blue,
        }
      },
      '& .flex-item': {
        display: 'inline-flex',
        flexDirection: 'column',
        margin: '0',
        '&:first-child': {
          marginRight: '4px',
        },
        '&:last-child': {
          marginLeft: '4px',
        },
        '& div': {
          marginTop: '0',
          color: '#7b858b',
        },
        '& .line-through': {
          textDecoration: 'line-through',
        },
        '& .blue': {
          position: 'relative',
          color: theme.palette.common.primary,
          '&:before': {
            content: `''`,
            position: 'absolute',
            left: '-10px',
            top: '6px',
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: theme.palette.common.secondary,
          }
        }
      }
    },
    '& img': {
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& a': {
      textDecoration: 'none'
    }
  },
  perHour: {
    fontSize: '13px',
    paddingTop: '10px',
    '& span': {
      fontWeight: '500',
      fontSize: '25px',
      color: theme.palette.common.black,
      verticalAlign: 'middle',
      padding: '0',
      display: 'inline-block'
    },
    '& p': {
      marginTop: '0',
      '& a': {
        color: theme.palette.common.blue,
      }
    },
    '@media (max-width:767px)':{
      '& div':{
        display:'inline-block',
        float: 'right',
        marginTop: '-10px',
        '& span':{
          fontSize:'20px',
          paddingTop:'5px'
        }
      }
    }
  },
  moreDetailsBtn: {
    maxWidth: '160px'
  },
  noResult: {
    '& p': {
      marginTop: '5px',
    },
    '& > div': {
      marginTop: '25px',
      '& p': {
        marginTop: '2px',
        fontSize: '12px',
        marginBottom: '0px',
      },
      '& p:last-child': {
        color: '#1db6e5',
      }
    }
  },
  myReservation: {
    paddingTop: '40px',
    '& h2': {
      marginBottom: '10px',
    }
  },
  bluecolor: {
    color: theme.palette.common.blue,
    textTransform: 'uppercase',
    fontSize: '14px',
    marginTop: '15px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  reservantionTime: {
    background: '#f9f8f8',
    padding: '14px',
    marginBottom: '10px',
    '@media (max-width:767px)':{
      margin:'0 -15px 10px',
      borderBottom:'1px solid #ccc',
    },
    '& h5': {
      fontSize: '13px',
      fontWeight: '500',
      margin: '0 0 7px',
      color: theme.palette.common.black,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    '& h4': {
      color: theme.palette.common.black,
      fontSize: '16px',
      fontWeight: '450',
      margin: '0 0 7px',
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '100',
      margin: '0 0 7px',
      '& span': {
        cursor: 'pointer',
        fontWeight: '500',
        marginTop: '8px'
      }
    },
    '& p:last-child': {
      fontWeight: '500',
      marginTop: '8px',
      cursor: 'pointer'
    }
  },
  signupBtn: {
    marginBottom: '15px',
    '& span': {
      display: 'inline-block',
      padding: '5px 15px',
      textTransform: 'capitalize',
      fontSize: '12px',
    }

  },
  pendingBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      display: 'inline-block',
      padding: '3px 10px',
      textTransform: 'capitalize',
      fontSize: '12px',
      background: '#f99f6c',
    },
    '& span:hover': {
      background: '#f06b2c',
    }

  },
  guestName: {
    fontSize: '13px',
  },
  noMessages: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.black,
    '& figure': {
      margin: '0 18px 0 -15px',
    },
    '& p': {
      color: theme.palette.common.black,
      fontSize: '14px',
      fontWeight: '500',
      '& span': {
        display: 'block',
        color: theme.palette.common.blue,
        paddingTop: '7px',
        fontWeight: '500',
        textTransform: 'uppercase',
        fontSize: '14px',
      }
    },
    '@media (max-width:767px)':{
      display: 'table',
      textAlign:'center',
      width:'100%',
      '& span': {
        marginTop:'30vh'
      }
    }
  },
  approvedBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      background: 'green',
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: 'green',
    }

  },
  declinedBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      background: '#f04d50',
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: 'red',
    }

  },
  confirmBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      background: '#1ecef1',
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: '#1ecef1',
    }
  },
  completedBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      background: 'green',
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: 'green',
    }
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
    padding: 10,
    cursor: 'pointer'
  },
  reservationCancelBtn: {
    marginTop: '-55px',
    position: 'relative',
    paddingBottom: '25px',
    marginLeft: '11px',
    '& span': {
      background: '#7b868c',
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: '#7b868c',
    }
  },

  bluecolorTwo: {
    '& span': {
      display: 'inline-block',
      padding: '5px 25px',
      marginTop: '10px',
    }
  },
  bluecolorTwoAgain:{
    '& span': {
    padding: '6px 55px',
    }
  },
  bluecolorCancel: {
    marginBottom: '0',
    marginTop: '0',
  },
  cancelPolicy: {
    marginTop: '-15px',
    display: 'block',
    fontSize: '11px',

  },
  pendingAddressStatus: {
    fontSize: '12px',
    color: '#ccc',
    textTransform: 'initial'
  },
  poolAccessDetails: {
    fontSize: '13px',
    fontWeight: '500',
    color: theme.palette.common.black,
    paddingBottom: '5px',
    display: 'block',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  cancelPolicyText: {
    background: '#fbece2',
    color: '#eca167',
    padding: '10px',
    fontSize: '12px',
    lineHeight: '18px',
    borderRadius: '5px',
    margin: '10px 0',
    maxWidth: '280px',
    '@media (max-width:767px)':{
      maxWidth: '100%',
    }
  },
  confirmReservationBtn: {
    display: 'inline-block',
    '@media (max-width:767px)':{
      display: 'block'
    }
  },
  title: {
    fontSize: '16px !important',
    marginTop: '10px',
  },
  text: {
    fontSize: '12px !important',
  },
  textUpperCase:{
    textTransform: 'uppercase'
  },
  disablePaymentBtn: {
    '& span': {
      background: '#ccc',
      display: 'inherit',
      marginTop:'15px'
    },
    '& span:hover': {
      background: '#ccc',
      cursor: 'default'
    },
    '& p': {
        background: '#fbece2',
        color: '#eca167',
        padding: '10px',
        fontSize: '12px',
        lineHeight: '18px',
        borderRadius: '5px',
        margin: '10px 0',
        marginTop:'0px'
    }
  },
  paymentDisableBtn :{
    '& span': {
      marginTop:'20px'
    },
  },
  paymentMethodBtn: {
    '& Button': {
      background: theme.palette.common.transparent,
      width: 'auto',
      padding: '10px 35px 10px 18px',
      marginTop: '20px',
      boxShadow: '0 3px 3px #b1b0b0',
      textAlign: 'left',
      display: 'table',
      paddingLeft: "18px",
      '& span': {
        color: theme.palette.common.black,
        textTransform: 'none',
        letterSpacing: '4.8px',
        '& i': {
          float: 'right',
          fontSize: '25px',
          marginTOp: '-2px',
          position: 'absolute',
          right: '11px',
          color: '#12bfea',
          top: '9px'
        },
        '& img': {
          maxWidth: '30px',
          verticalAlign: 'middle',
          marginRight: '15px',
        }
      },
      '&:hover': {
        background: theme.palette.common.transparent,
        '& span': {
          color: theme.palette.common.black,
        }
      }
    },
    '& a': {
      textDecoration: 'none',
    }
  },
  cardNumberDots: {
    cursor: 'pointer',
    color: theme.palette.common.black,
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: '25px',
    marginTop: '-17px',
    paddingRight: '6px',
    borderRadius: '50%',
    letterSpacing: '6px',
    marginBottom: '0'
  },
  choosePaymentBtn: {
    '& button': {
      '& span': {
        letterSpacing: '0'
      }
    }
  },
  cancelPopupTitle: {
    marginBottom: '10px'
  },
  cancelPopupText: {
    maxWidth: '300px'
  },
  selectCancelReason: {
    width: '100%'
  },
  cancellButton: {
    background: 'transparent',
    padding: '10px',
    color: theme.palette.common.blue,
    fontWeight: '400',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common.blue,
      opacity: '0.8'
    }
  },
  declineButton: {
    padding: '12px 20px',
    '& span:last-child, span:first-child': {
      padding: '0',
      fontSize: '14px',
      color: '#fff'
    },
    '&:disabled': {
      opacity: '0.6'
    }
  },
});


class MyReservation extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      reservationData: [],
      loading: true,
      deleteAlert: false,
      showCancelReasonPopup: false,
      cancelReason: '',
      otherReason: '',
      cancelData: {},
      stripe_id:'',
      cardLastFourDigit:'',
      cardBrand:'',
      showAlert: false,
      errorMessage: '',
      cancelChatMessage: '',
      showCancelChatMessagePopup: false,
      bookingId: null,
    };
    this.onSubmitReservationCancel = this.onSubmitReservationCancel.bind(this);
    this.handleCancelReservationConfirm = this.handleCancelReservationConfirm.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.updatePromoCode = this.updatePromoCode.bind(this);
    this.handleCancelReasonPopup = this.handleCancelReasonPopup.bind(this);
    this.onSelectCancelReason = this.onSelectCancelReason.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
    this.onReasonChange = this.onReasonChange.bind(this);
    this.handleOtherReason = this.handleOtherReason.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleNewReservation = this.handleNewReservation.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);

    this.channel = '';
  }

  componentDidMount() {
    let accessToken = UserUtils.getAccessToken();
    let { history } = this.props;
    if (accessToken !== null && accessToken !== '') {
      this.renderReservation();
      UserUtils.removePaymentFromId();
      this.props.client.query({
        query: getProfileDetails,
        fetchPolicy: "network-only"
      })
        .then((res) => {
          this.setState({
            stripe_id:res.data.me.stripe_id,
            cardLastFourDigit:res.data.me.card_last_four,
            cardBrand:res.data.me.card_brand
          })
          UserUtils.setUserID(res.data.me.id)
          UserUtils.setUserCountry(res.data.me.country_code);
          UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
          UserUtils.setLastPoolId(res.data.me.last_pool_id);
          if ( this.props.user ) {
            this.setUpListener();
          }
        }).catch((error) => {

        });

    } else {
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setPreviousSearchUrl(this.props.location.search);
      UserUtils.setIsPreviousUrl('yes');
      history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.user && this.props.user) {
      this.setUpListener();
    }
  }

  componentWillUnmount() {
    if (this.props.echo) {
      this.props.echo.leaveChannel(this.channel)
    }
  }

  setUpListener() {
    this.channel = `reservation.${this.props.user.id}`
    console.log('this.channel', this.channel)
    console.log('Joining reservation listener ', this.channel)
    if (this.props.echo) {
      this.props.echo.private(this.channel)
        .listen('.booking.created', (e) => {
          this.handleNewReservation(e)
        })
        .listen('.booking.updated', (e) => {
          this.handleStatusChange(e)
        });
    }
  }

  handleNewReservation(reservation) {
    console.log('new reservation', reservation)
    reservation.id = reservation.id.toString();
    this.setState( { reservationData: update( this.state.reservationData, {
      $unshift: [reservation]
    } ) } )
  }

  handleStatusChange(reservation) {
    console.log('handleStatusChange', reservation)
    const reservationIndex = this.state.reservationData.findIndex(reserv => reserv.id === reservation.booking_id.toString())
    if (reservationIndex >= 0) {
      this.setState({ reservationData: update(this.state.reservationData, {
          [reservationIndex]: {
            status: { $set: reservation.status }
          }
        })
      })
    }
  }

  updatePromoCode(index, data) {
    let { reservationData } = this.state;
    if(data === 'remove') {
      reservationData[index].promocode_status = 'no';
      reservationData[index].promocode = '';
    } else {
      reservationData[index].promocode_status = 'ok';
      reservationData[index].promocode = data;
    }
    this.setState({
      reservationData
    })
  }

  renderReservation() {
    this.setState({ loading: true })
    this.props.client.query({
      query: myReservationsQuery,
      fetchPolicy: "no-cache"
    })
      .then((res) => {
        let reservation = res.data.reservations.map(reservation => {
          reservation.isFavorite = this.props.user && reservation.pool && this.props.user.favorites.indexOf(+reservation.pool.id) >= 0
          return reservation;
        });
        reservation = _.reject(reservation, { pool: null });
        reservation = _.reject(reservation, { pool: "" });

        // excluding 'awaiting' but already passed reservations
        reservation = reservation.filter((reservation) => {
          let notConfirmed = reservation.status === 0 || reservation.status === 1 || reservation.status === 2
          let reservationDate = reservation.date + ' ' + reservation.to

          if (reservation.edited_fields) {
            // edditional check for reservations with edited date and/or end time
            notConfirmed = notConfirmed || reservation.status === 4
            reservationDate = (reservation.edited_fields.date || reservation.date) + ' ' + (reservation.edited_fields.to || reservation.to)
          }

          let timePassed = moment(reservationDate, 'YYYY-MM-DD hh:mm:ss').isBefore(moment())

          return !(timePassed && notConfirmed)
        })
        this.setState({
          reservationData: reservation,
          loading: false
        })
      }).catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.renderReservation()
          }
        }
      });
  }

  closePopup() {
    this.setState({ deleteAlert: false,cancelData:'' });
  }

  onSubmitRequestConfirm(data) {
    let promocode = '';
    if(data.promocode_status === 'ok') {
      if(data.promocode !== null && data.promocode !== '') {
        promocode = data.promocode.promo_code;
      }
    } else {
      promocode = '';
    }
    let date = data.date;
    let timefrom = moment(date + ' ' + data.from).format('h:mm a');
    let timeto = moment(date + ' ' + data.to).add(1,'hours').format('h:mm a');
    date = moment(date).format('ddd, MMMM DD, YYYY');
    let redirectData = {
      "pool_id": data.pool.id,
      "date": date,
      "from": timefrom,
      "to": timeto,
      "reason_for_booking": data.reason_for_booking,
    }
    this.setState({ loading: true });
    let { history } = this.props;
    this.props.client.mutate({
      mutation: confirmReservationMutation,
      variables: {
        data: {
          booking_id: data.id,
          promo_code:promocode
        }
      },
    })
      .then((res) => {
        if (res.data.chargeCard.status === 'succeeded') {
          redirectData.status = 'book_this_pool';
          UserUtils.setPoolBookingStatus(JSON.stringify(redirectData));
          this.setState({ loading: false });
          history.push('/reservation-success');
        } else {
          this.renderReservation();
          this.setState({
            loading: false,
          });
        }

      }).catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          reviewsFailError: errorMsg,
          loading: false
        });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.onSubmitRequestConfirm(data)
          }
        } else {
          this.renderReservation();
        }
      });
  }

  onSelectCancelReason ({ target: { value: cancelReason } }) {
    this.setState({ cancelReason })
  }

  onReasonChange ({ target: { value: otherReason } }) {
    this.setState({ otherReason })
  }

  handleOtherReason (reason) {
    return reason.match(/Other/) ? this.state.otherReason : reason
  }

  checkOnSubmit () {
    return !this.state.cancelReason || (this.state.cancelReason.match(/Other/) && this.state.otherReason.trim().length <= 10)
  }

  handleCancelReasonPopup (show) {
    this.setState({
      deleteAlert: false,
      showCancelReasonPopup: show,
      cancelReason: '',
      otherReason: '',
      cancelChatMessage: '',
      showCancelChatMessagePopup: false
    })
  }

  handleCancelReservationConfirm() {
    let { cancelData } = this.state
    this.setState({
      loading: true,
      deleteAlert: false,
      showCancelReasonPopup: false,
      showCancelChatMessagePopup: false
    });
    let { history } = this.props;
    this.props.client.mutate({
      mutation: cancelReservationMutation,
      variables: {
        data: {
          booking_id: cancelData.booking_id,
          cancel_reason: this.handleOtherReason(this.state.cancelReason),
          cancel_reason_message: this.handleOtherReason(this.state.cancelReason),
          cancel_chat_message: this.state.cancelChatMessage
        }
      },
    })
      .then((res) => {
        this.setState({ loading: false });
        if (res.data.cancelReservation.status === 'CANCELLED_BOOKING_SUCCESSFULL') {
          if(res.data.cancelReservation.charged === true) {
            cancelData.status = 'CANCELLED_BOOKING_SUCCESSFULL';
            UserUtils.setPoolBookingStatus(JSON.stringify(cancelData));
            history.push('/reservation-cancelled');
          } else {
            this.renderReservation();
            this.setState({
              loading: false,
              cancelReason: '',
              otherReason: '',
              cancelChatMessage: ''
            });
          }
        } else {
          this.renderReservation();
          this.setState({
            loading: false,
            cancelReason: '',
            otherReason: '',
            cancelChatMessage: ''
          });
        }
      }).catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({
          reviewsFailError: errorMsg,
          loading: false,
          cancelReason: '',
          otherReason: '',
          cancelChatMessage: ''
        });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.handleCancelReservationConfirm()
          }
        } else if (error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].debugMessage) {
          this.setState({
            showAlert: true,
            errorMessage: error.graphQLErrors[0].debugMessage
          })
        } else {
          this.renderReservation();
        }
      });
  }

  onSubmitReservationCancel(data) {
    let date = data.date;
    let timefrom = moment(date + ' ' + data.from).format('h:mm a');
    let timeto = moment(date + ' ' + data.to).add(1,'hours').format('h:mm a');
    let redirectData = {
      "pool_id": data.pool.id,
      "date": date,
      "from": timefrom,
      "to": timeto,
      "reason_for_booking": data.reason_for_booking,
      'booking_id':data.id,
      'status':data.status
    }
    this.setState({ deleteAlert: true, cancelData:redirectData});
  }

  redirectToConversions(rec_id) {
    let { history } = this.props;
    UserUtils.setMessageReceiverId(rec_id);
    history.push('conversations');
  }

  redirectToReviews(data) {
    let { history } = this.props;
    history.push('/reviews/'+data.id);
  }


  updatePaymentInfo(id) {
    let { history } = this.props;
    let data = { 'from': 'my-reservations', 'booking_id': id}
    UserUtils.setPaymentFromId(JSON.stringify(data));
    history.push('/payment-method');
  }

  redirectToPoolDetails(id) {
    let { history } = this.props;
    UserUtils.setBackBtnLink('reservation');
    history.push('/pooldetails/' + id);
  }

  redirectToTitleDetails(data) {
    if (data.status !== 5) {
      let { history } = this.props;
      history.push('/reservation-details/' + data.id);
    }
  }

  handleAlert (showAlert) {
    this.setState({ showAlert })
  }

  onChangeCancelChatMessage = ({ target: { value: cancelChatMessage } }) => {
    this.setState({ cancelChatMessage })
  }

  disableCancelChatButton = () => {
    return this.state.cancelChatMessage.trim().length < 10
  }

  openCancelChatMessagePopup = () => {
    this.setState({
      showCancelReasonPopup: false,
      showCancelChatMessagePopup: true
    })
  }

  goToEditReservation = (id, event) => {
    event.stopPropagation()
    this.props.history.push(`/edit-reservation/${id}`)
  }

  handleBookingId = (bookingId, event) => {
    if (event) {
      event.stopPropagation();
    }
    this.setState({ bookingId })
  }

  deleteReservation = () => {
    const id = this.state.bookingId
    if (!id) return
    const { client } = this.props;

    this.setState({ loading: true });

    client.mutate({
      mutation: hideCompletedBooking,
      variables: {
        booking_id: id,
      }
    })
    .then(res => {
      if (res.data.hideCompletedBooking.status === 'true') {
        this.renderReservation();
      }
    })
    .catch(error => {
      this.setState({
        loading: false,
      });
    });
    this.setState({ bookingId: null });
  }


  /**
   * render
   */
  render() {
    const { classes } = this.props;
    let { reservationData, loading } = this.state;
    const settings = {
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className={classes.container}>
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <div className={classes.myReservation}>
          <Typography variant="h2">My Reservations</Typography>
          <Typography variant="body1" component="span">
            {reservationData.length !== 0 ? (
              reservationData.map((data, bookingIndex) => {
                  const isEdited = HelperService.isEditedBooking(data)
                  const dateIsEdited = isEdited && data.edited_fields.date
                  const timeIsEdited = isEdited && (data.edited_fields.from || data.edited_fields.to)
                // let cancelCondition = 0;
                // let cancelAmount = 0;
                if(data.status === 5) {
                  let unpaid = _.filter(data.payment, {'payment_mode':false,'refund':false});
                  if(unpaid.length >= 1) {
                      // cancelCondition = 1;
                      // cancelAmount = unpaid[0].amount;
                  } else {
                    let amount = _.filter(data.payment, {'payment_mode':false,'refund':true});
                    if(amount.length >= 1) {
                      if(amount[0].amount === data.reservation_price_total) {
                        // cancelCondition = 2;
                        // cancelAmount =  0;
                      } else {
                        // cancelCondition = 3;
                        // cancelAmount =  data.reservation_price_total-amount[0].amount;
                      }
                    } else {
                      if(data.payment.length === 1) {
                        // cancelCondition = 4;
                        // cancelAmount =  data.payment[0].amount;
                      } else {
                        // cancelCondition = 2;
                        // cancelAmount =  0;
                      }
                    }
                  }
                } else if(data.status === 3 || data.status === 6) {
                  let dateandtime = moment(data.date+' '+data.to).add('1','hours').format('MM/DD/YYYY h:mm A');
                  if((new Date() > new Date(dateandtime))) {
                    data.status = 6;
                  } else {
                    data.status = 3;
                  }
                }

                const allowDeleteItem = data && data.status && ( data.status === 2 || data.status === 5 || data.status === 6)
                return (
                  <div key={data.id}>
                    {data.pool !== null ?
                  <Grid container spacing={24} className={classes.searchResultsContainer} onClick={this.redirectToTitleDetails.bind(this, data)}>


                    <Grid item xs={12}>
                      <Grid item sm={8}>
                        <div className={classes.resultMain}>
                        {allowDeleteItem
                          ? <button
                            className={classes.deleteBtn}
                            onClick={(e) => this.handleBookingId(data.id, e)}>
                              <img
                              src={window.location.origin + "/img/icons/close_white.png"}
                              style={{ width: 20, height: 20 }}
                              alt=''
                            />
                          </button>
                          : null}
                          <div className="social-icons-absolute top left">
                            <SocialIcons
                              isFavorite={data.isFavorite}
                              poolId={data.pool.id}
                              userRole="swimmer"
                            />
                          </div>
                          <Slider {...settings}>
                            {data.pool.images && (data.pool.images.length > 0) && data.pool.images.map((img, index) =>
                              <div key={index}>
                                <img alt="" src={img.url} />
                              </div>
                            )}
                            {(!data.pool.images || data.pool.images.length <= 0) &&
                            <div>
                              <div className="social-icons-absolute top left">
                                <SocialIcons
                                  isFavorite={data.isFavorite}
                                  poolId={data.id}
                                  userRole="swimmer"
                                />
                              </div>
                              <img alt="" src={window.location.origin + "/img/default-pool.png"} />
                            </div>
                            }
                          </Slider>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.description}>
                      <div className={classes.leftSideCol}>
                      {(data.status === 0 || isEdited) && (
                          <div className={classes.pendingBtn}>
                            <Typography variant="button">
                              AWAITING HOST APPROVAL
                            </Typography>
                          </div>
                        )
                      }

                      {data.status === 1 && !isEdited && (
                          <div className={classes.approvedBtn}>
                            <Typography variant="button">
                              APPROVED! - CLICK TO CONFIRM
                            </Typography>
                          </div>
                        )
                      }

                      {data.status === 2 && !isEdited && (
                          <div className={classes.declinedBtn}>
                            <Typography variant="button">
                              REQUEST DECLINED
                            </Typography>
                          </div>)
                      }

                      {data.status === 3 && !isEdited && (
                          <div className={classes.completedBtn}>
                            <Typography variant="button">
                              RESERVATION CONFIRMED
                            </Typography>
                          </div>
                        )
                      }

                      {data.status === 4 && !isEdited && (
                        <div className={classes.declinedBtn} onClick={this.onSubmitRequestConfirm.bind(this, data)}>
                          <Typography variant="button">
                                PAYMENT FAILED
                          </Typography>
                        </div>
                          )
                      }

                      {
                        data.status === 5 && !isEdited && (
                          <div className={classes.reservationCancelBtn}>
                            <Typography variant="button">
                              RESERVATION CANCELLED
                          </Typography>
                          </div>
                        )
                      }
                      {data.status === 6 && !isEdited && (
                          <div className={classes.confirmBtn}>
                            <Typography variant="button">
                            RESERVATION  COMPLETED
                          </Typography>
                          </div>
                        )
                      }

                      <Typography variant="h2" className={classes.title}>{data.pool.title}</Typography>

                      <Typography variant="h4">
                        {(data.status === 3 || data.status === 6) ? "":<p className={classes.text}>Exact address will be shown after confirmation</p>}
                      </Typography>

                      <div>
                        <h4 className={classes.text}>
                          <div className='flex-item'>
                            <div className={dateIsEdited ? 'line-through' : ''}>
                              <span className={classes.textUpperCase}>
                                <Moment format='ddd, '>{data.date}</Moment>
                              </span>
                              &nbsp;
                              <Moment format='MMM DD, YYYY'>{data.date}</Moment>
                            </div>
                            {
                              dateIsEdited && <div className='blue'>
                                <span className={classes.textUpperCase}>
                                  <Moment format='ddd, '>{data.edited_fields.date}</Moment>
                                </span>
                                &nbsp;
                                <Moment format='MMM DD, YYYY'>{data.edited_fields.date}</Moment>
                              </div>
                            }
                          </div>
                          <span>&nbsp;from&nbsp;</span>
                          <div className='flex-item'>
                            <div className={timeIsEdited ? 'line-through' : ''}>
                              <Moment format="h:mm A">{data.date + ' ' + data.from}</Moment>
                              &nbsp;-&nbsp;
                              <Moment add={{ hours: 1 }} format="h:mm A">{data.date + ' ' + data.to}</Moment>
                            </div>
                            {
                              timeIsEdited && <div className='blue'>
                                <Moment format="h:mm A">{(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.from || data.from)}</Moment>
                                &nbsp;-&nbsp;
                                <Moment add={{hours: 1}} format="h:mm A">{(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.to || data.to)}</Moment>
                              </div>
                            }
                          </div>
                        </h4>
                      </div>
                        {
                          HelperService.isAvailableToUpdate(data) && <p className={classes.bluecolor} onClick={this.goToEditReservation.bind(this, data.id)}>
                            <span>{data.edited_fields ? 'Extend reservation' : 'Make a change'}</span>
                          </p>
                        }
                    </div>
                  </Grid>
                </Grid>
                   :

                  ""
                  }
                  </div>
                )
              }
              )
            ) : (
                <Typography variant="h6" color="inherit" >
                  <div className={classes.noMessages} >
                    <figure>
                      <img src="img/perfect-time.png" alt="" />
                    </figure>
                    <p>You don't have any Reservations yet!
                      <Link to="/">
                        <span>BOOK YOUR NEXT DIP!</span>
                      </Link></p>

                  </div>
                </Typography>
              )
            }
            <Dialog
              open={this.state.deleteAlert}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.deletePopup}
            >
              <DialogContent>
                <Typography variant='h3' className={classes.cancelPopupTitle}>
                  Are you sure you want to cancel?
                </Typography>
                <DialogContentText id="alert-dialog-description">
                  {
                    this.state.cancelData.status === 3 ?
                      `You will still be charged the service fee and depending on the host's cancelation policy, you may be charged for the booking.`
                      : `Canceling too many approved requests reduces the chances of hosts approving your future inquiries.`
                  }

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Typography variant="button" onClick={this.handleCancelReasonPopup.bind(null, true)} autoFocus>
                  yes
                </Typography>
                <Typography variant="button" onClick={this.closePopup}>
                  no
                </Typography>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.showCancelReasonPopup}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.deletePopup}
            >
              <DialogContent>
                <Typography variant='h3' className={classes.cancelPopupTitle}>
                  Cancel Reservation Request
                </Typography>
                <Typography variant='h6' className={classes.cancelPopupText}>
                  To cancel your reservation, please select a reason for canceling your reservation
                </Typography>
              </DialogContent>
              <DialogContent>
                <Select
                  className={classes.selectCancelReason}
                  value={this.state.cancelReason}
                  onChange={this.onSelectCancelReason}
                  displayEmpty
                >
                  <MenuItem value=''>Select</MenuItem>
                  {
                    (reservationData.status === 3 ? SWIMMER_CANCEL_CONFIRMED_REASONS : SWIMMER_CANCEL_REASONS).map((reason, index) => {
                      return (
                        <MenuItem key={`cancel-reason-${index}`} value={reason}>{reason}</MenuItem>
                      )
                    })
                  }
                </Select>
                {this.state.cancelReason.match(/Other/) && <div className={classes.formInputBox}>
                  <TextField
                    type='text'
                    name='email'
                    margin='normal'
                    variant='outlined'
                    onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
                    value={this.state.otherReason}
                    onChange={this.onReasonChange}
                    rowsMax={4}
                    rows={4}
                    fullWidth
                    multiline
                    placeholder='Cancellation Reason (min 10 characters)'
                  />
                </div>}
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.declineButton}
                  disabled={this.checkOnSubmit()}
                  // onClick={this.handleCancelReservationConfirm}
                  onClick={this.openCancelChatMessagePopup}
                >
                  submit
                </Button>
                <Typography className={classes.cancellButton} variant="button" onClick={this.handleCancelReasonPopup.bind(null, false)}>
                  cancel
                </Typography>
              </DialogActions>
            </Dialog>
            <Dialog
              className={classes.deletePopup}
              open={this.state.showCancelChatMessagePopup}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <p>Last step! Send the Host a quick message</p>
                </DialogContentText>
                <TextField
                  type='text'
                  name='email'
                  margin='normal'
                  variant='outlined'
                  onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
                  value={this.state.cancelChatMessage}
                  onChange={this.onChangeCancelChatMessage}
                  rowsMax={4}
                  rows={4}
                  fullWidth
                  multiline
                  placeholder='(min 10 characters)'
                />
                <div className={classes.popupButtons}>
                  <Button
                    className={classes.declineButton}
                    disabled={this.disableCancelChatButton()}
                    onClick={this.handleCancelReservationConfirm}
                  >
                    submit
                  </Button>
                  <Typography
                    className={classes.cancellButton}
                    variant="button"
                    onClick={this.handleCancelReasonPopup.bind(null, false)}
                  >
                    cancel
                  </Typography>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.showAlert}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.deletePopup}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.errorMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Typography variant="button" onClick={this.handleAlert.bind(null, false)} autoFocus>
                  ok
                </Typography>
              </DialogActions>
            </Dialog>
            <Dialog
              open={!!this.state.bookingId}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.deletePopup}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this reservation from your history?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Typography variant="button" onClick={this.deleteReservation} autoFocus>
                  yes
                </Typography>
                <Typography variant="button" onClick={() => this.handleBookingId(null)}>
                  no
                </Typography>
              </DialogActions>
            </Dialog>
          </Typography>
        </div>
      </div>
    );
  }
}



MyReservation.propTypes = {
  classes: PropTypes.object.isRequired,

};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function MyReservationContainer (props) {
  const userContext = useContext(UserContext)
  const appContext = useContext(AppContext)
  return <MyReservation {...userContext} {...appContext} {...props} />
}

export default enhance( MyReservationContainer );
