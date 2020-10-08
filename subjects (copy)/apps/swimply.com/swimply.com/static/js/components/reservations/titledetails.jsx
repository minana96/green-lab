import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from 'react-slick';
import UserUtils from '../utilities/UserUtils';
import { loader } from 'graphql.macro';
import { withApollo } from 'react-apollo';
import Pageloader from './../commons/pageloader';
import Moment from 'react-moment';
import * as commonFunctions from './../utilities/commonFunctions';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import EditPromoCode from './editPromocode';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {SWIMMER_CANCEL_REASONS, SWIMMER_CANCEL_CONFIRMED_REASONS, US_REGION_REGEXP} from '../../constants'
import TextField from '@material-ui/core/TextField'
import { IS_US, IS_SHVIMPLY } from '../../config'
import { sendAnalytics } from '../utilities/analyticsUtils';
import UserContext from "../../contexts/UserContext";
import RegionContext from "../../contexts/RegionContext";
import SocialIcons from "../shared/social-icons";
import Avatar from "@material-ui/core/Avatar";

// services
import HelperService from '../../services/helper'

const myReservationsQuery = loader('./../../graphql/reservations/reservationdetailsQuery.graphql');
const confirmReservationMutation = loader('./../../graphql/reservations/confirmReservationMutation.graphql');
const cancelReservationMutation = loader('./../../graphql/reservations/cancelReservationMutation.graphql');
const getProfileDetails = loader('./../../graphql/user/me.graphql');
const serviceChargeQuery = loader('./../../graphql/findpool/serviceChargeQuery.graphql');

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
        'background': 'url(../img/next.png)',
        'backgroundPosition': ' right',
        'zIndex': '9',
        'cursor': 'pointer',
        'opacity': '0.8',
        'fontSize': '25px',
        backgroundSize: 'cover',
        backgroundRepeat: ' no-repeat'
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
        'background': 'url(../img/prev.png)',
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
      display: 'block'
    }
  },
  resultMain: {
    position: 'relative',
    '& img': {
      width: '100%',
    }
  },
  leftSideCol: {
    '& h2': {
      marginBottom: '15px',
      fontSize: '25px',
    },
    '& h4': {
      marginTop: '0px',
      marginBottom: '20px',
      fontWeight: '400',
      color: '#7b858b',
      fontSize: '14px',
      '& div': {
        marginTop: '14px',
        color: theme.palette.common.blue,
        '& a': {
          color: theme.palette.common.blue,
        }
      },
      '& p':{
        textTransform: 'capitalize',
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
      marginBottom: '20px',
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
      fontSize: '13px',
      fontWeight: '500',
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
    marginBottom: '15px',
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
        fontSize: '13px',
      }
    }
  },
  approvedBtn: {
    'marginBottom': '15px',
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
    'marginBottom': '15px',
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
    'marginBottom': '15px',
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
    'marginBottom': '15px',
    '& span': {
      background: theme.palette.common.blue,
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '12px'
    },
    '& span:hover': {
      background: theme.palette.common.blue,
    }
  },
  reservationCancelBtn: {
    'marginBottom': '15px',
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
  },
  confirmReservationBtn: {
    display: 'inline-block'
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
  paymentMethodBtn: {
    '& Button': {
      background: theme.palette.common.transparent,
      width: 'auto',
      padding: '10px 35px 10px 18px',
      marginTop: '20px',
      boxShadow: '0 3px 3px #b1b0b0',
      textAlign: 'left',
      display: 'table',
      paddingLeft: '18px',
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
  selectCancelReason: {
    width: '100%'
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
  alignItemsCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  hostContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    '& p span.bold': {
      fontWeight: '700'
    }
  },
  profileImage: {
    marginRight: '5px',
    '& img': {
      marginRight: '0',
    }
  },
  hostedByText: {
    fontWeight: '400',
    color: theme.palette.common.black,
    cursor: 'initial'
  },
  editedGuests: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '5px',
    lineHeight: '18px',
    '&:before': {
      content: `''`,
      position: 'absolute',
      left: '-10px',
      top: '6px',
      display: 'inline-block',
      width: '6px',
      height: '6px',
      marginRight: '5px',
      borderRadius: '50%',
      backgroundColor: theme.palette.common.secondary,
    },
    '& .item': {
      marginRight: '5px',
      '& .gray': {
        color: theme.palette.common.darkgray,
      },
    },
    '& .line-through': {
      textDecoration: 'line-through',
      color: theme.palette.common.darkgray,
    },
    '& .blue': {
      fontWeight: '500',
      color: theme.palette.common.primary,
    },
  },
  flexItem: {
    display: 'flex',
    '& .line-through': {
      textDecoration: 'line-through',
      marginRight: '4px',
    },
    '& .blue': {
      color: theme.palette.common.blue,
    },
  },
  cancellationPolicy: {
    margin: '4px 0 10px',
    color: theme.palette.common.black,
  }
});


class TitleDetails extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      reservationData: {},
      createdBy: {},
      poolData: {},
      images: [],
      loading: true,
      deleteAlert: false,
      cancelData:'',
      stripe_id:'',
      cardLastFourDigit:'',
      cardBrand:'',
      showCancelReasonPopup: false,
      reason: '',
      otherReason: '',
      showAlert: false,
      errorMessage: '',
      cancelChatMessage: '',
      showCancelChatMessagePopup: false,
      serviceCharge: 0,
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
    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {
    this.getServiceCharge()
    let accessToken = UserUtils.getAccessToken();
    this.setState({ loading: true })
    let { history } = this.props;
    if (accessToken !== null && accessToken !== '') {
      this.renderReservation();
      UserUtils.removePaymentFromId();
      this.props.client.query({
        query: getProfileDetails,
        fetchPolicy: 'network-only'
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
        }).catch((error) => {

        });
    } else {
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setIsPreviousUrl('yes');
      history.push('/');
    }
  }

  getServiceCharge = async () => {
    try {
      const { data: { serviceCharge: data }} = await this.props.client.query({
        query: serviceChargeQuery,
        fetchPolicy: 'network-only'
      })
      let service_fee_index = data.findIndex(x => x.name === 'service_fee')
      this.setState({ serviceCharge: data[service_fee_index].percentage })
    } catch (e) {
      console.log('error', e)
    }
  }

  getEditedPrice = () => {
    const { reservationData: reservation, serviceCharge } = this.state
    const { adultCount, childrenCount, startTime, endTime } = HelperService.getEditedFields(reservation)

    const { totalPrice } = HelperService.getPrice({
      reservation,
      serviceCharge,
      startTime,
      endTime,
      adultCount,
      childrenCount
    })

    return totalPrice
  }

  updatePromoCode(data) {
    let { reservationData } = this.state;
    if(data === 'remove') {
      reservationData.promocode_status = 'no';
      reservationData.promocode = '';
    } else {
      reservationData.promocode_status = 'ok';
      reservationData.promocode = data;
    }
    this.setState({
      reservationData
    })
  }

  renderReservation() {
    this.setState({ loading: true })
    let id = this.props.match.params.id;
    let poolId = parseInt(id);
    this.props.client.query({
      query: myReservationsQuery,
      variables: {
        'id': poolId
      },
      fetchPolicy:'no-cache',
    })
      .then((res) => {
        let reservation = res.data.reservationDetails;
        if (!res.data.reservationDetails) {
          this.props.history.goBack()
          return
        }
        this.setState({
          reservationData: reservation,
          poolData: reservation.pool,
          createdBy: reservation.pool.createdBy,
          images: reservation.pool.images,
          loading: false
        })
      }).catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === 'Unauthenticated.') {
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
      'pool_id': data.pool.id,
      'date': date,
      'from': timefrom,
      'to': timeto,
      'reason_for_booking': data.reason_for_booking,
    }
    let { history } = this.props;
    this.setState({ loading: true });
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
        if (errorMsg === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.onSubmitRequestConfirm(data)
          }
        } else {
          this.renderReservation();
        }
      });
  }

  onSelectCancelReason ({ target: { value: reason } }) {
    this.setState({ reason })
  }

  handleCancelReasonPopup (show) {
    this.setState({
      deleteAlert: false,
      showCancelReasonPopup: show,
      reason: '',
      showCancelChatMessagePopup: false,
      cancelChatMessage: ''
    })
  }

  handleCancelReservationConfirm() {
    let { history } = this.props;
    let { cancelData } = this.state;
    this.setState({
      loading: true,
      deleteAlert: false,
      showCancelReasonPopup: false,
      showCancelChatMessagePopup: false,
      cancelChatMessage: ''
    });
    this.props.client.mutate({
      mutation: cancelReservationMutation,
      variables: {
        data: {
          booking_id: cancelData.booking_id,
          cancel_reason: this.handleOtherReason(this.state.reason),
          cancel_reason_message: this.handleOtherReason(this.state.reason),
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
          let userType = UserUtils.getUserRole();
          if(userType === 'Host') {
            history.push('/host-reservation');
          } else {
            history.push('/my-reservation');
          }
        }

      } else {
        this.renderReservation();
        this.setState({
          loading: false,
          reason: '',
          cancelChatMessage: ''
        });
      }

      const analyticsData = {
        timestamp: new Date().toISOString(),
        'event_type': 'booking-cancel',
        poolId: +this.props.match.params.id,
        bookingId: cancelData.booking_id,
        platform: 'web',
        location: IS_US ? 'US' : 'AU',
        userId: UserUtils.getUserID(),
        userRole: 'swimmer',
      };
      sendAnalytics( this.props.client, analyticsData );
    }).catch(async (error) => {
      let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
      this.setState({
        reviewsFailError: errorMsg,
        loading: false,
        reason: '',
        cancelChatMessage: ''
      });
      if (errorMsg === 'Unauthenticated.') {
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
    let date = data.date.replace(/\t/g,'/')
    let timefrom = moment(new Date(date + ' ' + data.from)).format('h:mm a');
    let timeto = moment(new Date(date + ' ' + data.to)).format('h:mm a');
    let redirectData = {
      'pool_id': data.pool.id,
      'date': date,
      'from': timefrom,
      'to': timeto,
      'reason_for_booking': data.reason_for_booking,
      'booking_id':data.id
    }
    this.setState({ deleteAlert: true, cancelData:redirectData});
  }

  redirectToConversions(rec_id) {
    if (this.props.user && !this.props.user.accept_chat_rules) {
      this.props.history.replace('/chat-rules')
    } else {
      let { history } = this.props;
      UserUtils.setMessageReceiverId(rec_id);
      history.push({
        pathname: '/conversations',
        state: {
          fromReservationDetails: true,
          bookingId: this.state.reservationData.id
        }
      });
    }
  }
  redirectToReviews(data) {
    let { history } = this.props;
    history.push('/reviews/'+data.id);
  }

  updatePaymentInfo(id) {
    let { history } = this.props;
    let data = { 'from': 'my-reservations', 'booking_id': id }
    UserUtils.setPaymentFromId(JSON.stringify(data));
    history.push('/payment-method');
  }

  redirectToPoolDetails(id) {
    let { history } = this.props;
    UserUtils.setBackBtnLink('reservation');
    history.push('/pooldetails/' + id);
  }

  redirectToTitleDetails(id) {
    let { history } = this.props;
    history.push('/reservation-details/' + id);
  }

  handleOtherReason (reason) {
    return reason.match(/Other/) ? this.state.otherReason : reason
  }

  checkOnSubmit () {
    return !this.state.reason || (this.state.reason.match(/Other/) && this.state.otherReason.trim().length <= 10)
  }

  onReasonChange ({ target: { value: otherReason } }) {
    this.setState({ otherReason })
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

  goToEditReservation = () => {
    this.props.history.push(`/edit-reservation/${this.state.reservationData.id}`)
  }

  renderCard ({ reservationData: data, cardLastFourDigit, cardBrand }) {
    const { classes } = this.props
    const { origin } = window.location

    const swimmerCountry = UserUtils.getSwimmerCountry()
    const userCountryIsUs = US_REGION_REGEXP.test(swimmerCountry)
    const showCard = IS_US === userCountryIsUs

    return (
      data.booking_status && data.status === 1 && (
        !cardLastFourDigit || (!showCard && swimmerCountry.length) ?
          <div className={`${classes.paymentMethodBtn} ${classes.choosePaymentBtn}`}>
            <Button onClick={this.updatePaymentInfo.bind(this, '')}>
              Choose a Payment Method <i className='fa fa-angle-right' />
            </Button>
          </div>
          : <div className={classes.paymentMethodBtn}>
            {cardBrand && <Button onClick={this.updatePaymentInfo.bind(this, '')}>
              {cardBrand.match(/MasterCard/) ? <img alt='MasterCard' src={origin + '/img/cards/mastercard.png'}/> : ''}
              {cardBrand.match(/Visa/) ? <img alt='Visa Card' src={origin + '/img/cards/visa-card.png'}/> : ''}
              {cardBrand === 'American Express' ? <img alt='American Express Card' src={origin + '/img/cards/american.png'}/> : ''}
              {cardBrand === 'Discover' ? <img alt='Discover Card' src={origin + '/img/cards/discover.png'}/> : ''}
              {cardBrand === 'Diners Club' ? <img alt='Diners Club Card' src={origin + '/img/cards/dinnerclub.png'}/> : ''}
              {cardBrand === 'JCB' ? <img alt='JCB Card' src={origin + '/img/cards/jcb.png'}/> : ''}
              {cardBrand === 'UnionPay' ? <img alt='UnionPay Card' src={origin + '/img/cards/union.png'}/> : ''}
              <div className={classes.cardNumberDots}>.... .... ....</div>
              {cardLastFourDigit}
              <i className='fa fa-angle-right' />
            </Button>}
          </div>
      )
    )
  }

  renderBookingCost = () => {
    const { classes } = this.props
    const { reservationData: reservation } = this.state
    const isEdited = HelperService.isEditedBooking(reservation)
    if (isEdited) {
      const editedPrice = this.getEditedPrice()
      if (reservation.reservation_price_total !== editedPrice) {
        return <div className={classes.flexItem}>
          <span className='line-through'>${parseFloat(reservation.reservation_price_total).toFixed(2)}</span>
          <span className='blue'>(${parseFloat(editedPrice).toFixed(2)})</span>
        </div>
      }
    }
    return <div>
      <span>${parseFloat(reservation.reservation_price_total).toFixed(2)}</span>
    </div>
  }

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    let { reservationData, loading, poolData, createdBy, images, cardLastFourDigit, cardBrand } = this.state;
    const settings = {
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

      let cancelCondition = 0;
      let cancelAmount = 0;
      if(reservationData.status===5) {
        let unpaid = _.filter(reservationData.payment, {'payment_mode':false,'refund':false});
        if(unpaid.length >= 1) {
            cancelCondition = 1;
            cancelAmount = unpaid[0].amount;
        } else {
          let amount = _.filter(reservationData.payment, {'payment_mode':false,'refund':true});
          if(amount.length >= 1) {
            if(amount[0].amount === reservationData.reservation_price_total) {
              cancelCondition = 2;
              cancelAmount =  0;
            } else {
              cancelCondition = 3;
              cancelAmount =  reservationData.reservation_price_total-amount[0].amount;
            }
          } else {
            if(reservationData.payment.length === 1) {
              cancelCondition = 4;
              cancelAmount =  reservationData.payment[0].amount;
            } else {
              cancelCondition = 2;
              cancelAmount =  0;
            }
          }
        }
      } else if(reservationData.status===3 || reservationData.status===6){
        let dateandtime = moment(reservationData.date+' '+reservationData.to).add('1','hours').format('MM/DD/YYYY h:mm A');
        if((new Date() > new Date(dateandtime))) {
          reservationData.status = 6;
        } else {
          reservationData.status = 3;
        }
      }

    const isEdited = HelperService.isEditedBooking(reservationData)
    const dateIsEdited = isEdited && reservationData.edited_fields.date
    const timeIsEdited = isEdited && (reservationData.edited_fields.from || reservationData.edited_fields.to)
    const guestsIsEdited = isEdited && (
      HelperService.isNumber(reservationData.edited_fields.adult_guests)
      || HelperService.isNumber(reservationData.edited_fields.children_guests)
      || HelperService.isNumber(reservationData.edited_fields.infant_guests)
    )

    return (
      <div className={classes.container}>
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <div className={classes.myReservation}>
          <Typography variant='h2'>My Reservations</Typography>
          {reservationData.id !== undefined&&
          <Typography variant='body1' component='span'>
            <Grid container spacing={24} className={classes.searchResultsContainer}>
              <Grid item xs={12} sm={8}>
                <div className={classes.resultMain}>
                  <div className="social-icons-absolute top right">
                    <SocialIcons
                      isFavorite={poolData.isFavorite}
                      poolId={poolData.id}
                      userRole="swimmer"
                    />
                  </div>
                  <Slider {...settings}>
                    {images.length > 0 && images.map((img, imgIndex) =>
                      <div key={imgIndex}>
                        <img alt='' src={img.url} />
                      </div>
                    )}
                    {images.length <= 0 &&
                      <div>
                        <div className="social-icons-absolute top right">
                          <SocialIcons
                            isFavorite={poolData.isFavorite}
                            poolId={poolData.id}
                            userRole="swimmer"
                          />
                        </div>
                        <img alt='' src={window.location.origin + '/img/default-pool.png'} />
                      </div>
                    }
                  </Slider>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <div className={classes.leftSideCol}>
                {(reservationData.status === 0 || isEdited) && (
                    <div className={classes.pendingBtn}>
                      <Typography variant='button'>
                        AWAITING HOST APPROVAL
                      </Typography>
                    </div>
                  )
                }

                {reservationData.status === 1 && !isEdited && (
                    <div className={classes.approvedBtn}>
                      <Typography variant='button'>
                        APPROVED! - CLICK TO CONFIRM
                      </Typography>
                    </div>
                  )
                }

                {reservationData.status === 2 && !isEdited && (
                    <div className={classes.declinedBtn}>
                      <Typography variant='button'>
                        REQUEST DECLINED
                      </Typography>
                    </div>)
                }
                {reservationData.status === 3 && !isEdited && (
                    <div className={classes.approvedBtn}>
                      <Typography variant='button'>
                        RESERVATION CONFIRMED
                      </Typography>
                    </div>
                  )
                }
                {reservationData.status === 4 && !isEdited && (
                  <div className={classes.declinedBtn} onClick={this.onSubmitRequestConfirm.bind(this, reservationData)}>
                    <Typography variant='button'>
                        PAYMENT FAILED
                    </Typography>
                  </div>
                    )
                }
                {
                  reservationData.status === 5 && !isEdited && (
                    <div className={classes.reservationCancelBtn}>
                      <Typography variant='button'>
                        RESERVATION CANCELLED
                    </Typography>
                    </div>
                  )
                }
                {reservationData.status === 6 && !isEdited && (
                    <div className={classes.confirmBtn}>
                      <Typography variant='button'>
                      RESERVATION  COMPLETED
                    </Typography>
                    </div>
                  )
                }

                        <Typography variant='h2' onClick={this.redirectToTitleDetails.bind(this, reservationData.id)}>{poolData.title}</Typography>
                        <Typography variant='h4'>
                          {(reservationData.status === 3 || reservationData.status === 6)?(
                            <p>
                              {poolData.full_address}
                            </p>
                          ):(
                            <p>{(poolData.city !== '' && poolData.city !== null ) ? poolData.city+', ':''} {(poolData.state !== '' && poolData.state !== null ) ? poolData.state+', ':''} {poolData.zip_code !== '00000'?(''+poolData.zip_code):''}</p>
                          )}
                          {(reservationData.status === 0 || reservationData.status === 2 || reservationData.status === 4) ? <p className={classes.pendingAddressStatus}>Exact address will be shown after confirmation</p> : ''}
                          <div className={classes.bluecolor}>
                            <span onClick={this.redirectToPoolDetails.bind(this, poolData.id)}>
                              View pool Details
                          </span>
                          </div>
                        </Typography>
                        <div className={classes.reservantionTime}>
                          <h5>Reservation date and Time</h5>
                          <h4>
                            <div className='flex-item'>
                              <div className={dateIsEdited ? 'line-through': ''}>
                                <span className={classes.textUpperCase}>
                                  <Moment format='ddd, '>{reservationData.date}</Moment>
                                </span>
                                &nbsp;
                                <Moment format='MMM DD, YYYY'>{reservationData.date}</Moment>
                              </div>
                              {
                                dateIsEdited && <div className='blue'>
                                  <span className={classes.textUpperCase}>
                                    <Moment format='ddd, '>{reservationData.edited_fields.date}</Moment>
                                  </span>
                                  &nbsp;
                                  <Moment format='MMM DD, YYYY'>{reservationData.edited_fields.date}</Moment>
                                </div>
                              }
                            </div>
                            <span>&nbsp;from&nbsp;</span>
                            <div className='flex-item'>
                              <div className={timeIsEdited ? 'line-through': ''}>
                                <Moment format='h:mm A'>
                                  {reservationData.date + ' ' + reservationData.from}
                                </Moment>
                                -
                                <Moment add={{hours: 1}} format='h:mm A'>
                                  {reservationData.date + ' ' + reservationData.to}
                                </Moment>
                              </div>
                              {
                                timeIsEdited && <div className='blue'>
                                  <Moment format='h:mm A'>
                                    {reservationData.date + ' ' + (reservationData.edited_fields.from || reservationData.from)}
                                  </Moment>
                                  -
                                  <Moment add={{hours: 1}} format='h:mm A'>
                                    {reservationData.date + ' ' + (reservationData.edited_fields.to || reservationData.to)}
                                  </Moment>
                                </div>
                              }
                            </div>

                          </h4>
                          {
                            guestsIsEdited && <div className={classes.editedGuests}>
                              {
                                HelperService.isNumber(reservationData.edited_fields.adult_guests) ? <span className='item edited'>
                                        <span className='line-through'>{reservationData.adult_guests}</span>
                                        <span className='blue'> {reservationData.edited_fields.adult_guests}</span>
                                        <span> Adults, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{reservationData.adult_guests}</span> Adults,
                                      </span>
                              }
                              {
                                HelperService.isNumber(reservationData.edited_fields.children_guests) ? <span className='item edited'>
                                        <span className='line-through'>{reservationData.children_guests}</span>
                                        <span className='blue'> {reservationData.edited_fields.children_guests}</span>
                                        <span> Children, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{reservationData.children_guests}</span> Children,
                                      </span>
                              }
                              {
                                HelperService.isNumber(reservationData.edited_fields.infant_guests) ? <span className='item edited'>
                                        <span className='line-through'>{reservationData.infant_guests} </span>
                                        <span className='blue'> {reservationData.edited_fields.infant_guests}</span>
                                        <span> Infants, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{reservationData.infant_guests}</span> Infants,
                                      </span>
                              }
                            </div>
                          }
                          <p className={classes.guestName}>
                            <span>{reservationData.reason_for_booking}&nbsp;</span>
                            {!guestsIsEdited && commonFunctions.handleGuests(reservationData)}
                          </p>
                          <div className={classes.hostContainer}>
                            <div className={classes.alignItemsCenter}>
                              <Avatar
                                className={classes.profileImage}
                                alt='host profile image'
                                src={createdBy.img_url || window.location.origin + '/img/profile-icon.png'}
                              />
                              <p className={classes.hostedByText}>
                                Hosted by <span className='bold'>{createdBy.firstname}</span>
                              </p>
                            </div>
                            <p
                              className={classes.bluecolor}
                              onClick={this.redirectToConversions.bind(this, reservationData.pool.createdBy.id)}>
                              <span>Write Message</span>
                            </p>
                          </div>
                          {
                            HelperService.isAvailableToUpdate(reservationData) && <p className={classes.bluecolor} onClick={this.goToEditReservation}>
                              <span>{reservationData.edited_fields ? 'Extend reservation' : 'Make a change'}</span>
                            </p>
                          }
                          {/*<p className={classes.guestName}>Host: {createdBy.firstname}  {createdBy.lastname}</p>*/}
                          {/*<p className={classes.bluecolor} onClick={this.redirectToConversions.bind(this, reservationData.pool.createdBy.id)}><span>Send Message</span></p>*/}
                          {reservationData.status === 3 ?
                            <div>
                              <span className={classes.poolAccessDetails}>POOL ACCESS DETAILS</span>
                              <div dangerouslySetInnerHTML={{ __html: reservationData.pool.special_access_instruction }}>
                                </div>
                            </div> : ''
                          }
                        </div>

                  {(!reservationData.edited_fields && reservationData.status === 1 && reservationData.booking_status === true)?(
                    <EditPromoCode reservationData={reservationData} updatePromoCode={this.updatePromoCode}/>
                  ):''}

                  {((reservationData.status !== 1 && reservationData.status !== 2 && reservationData.status !== 5) || reservationData.booking_status === false || isEdited ) ?
                      <div className={classes.perHour}>
                      Total Booking Cost
                      {this.renderBookingCost()}
                  </div>
                  : ''}

                  {(reservationData.status === 5)?(
                      <div className={classes.perHour}>
                        Total Booking Cost
                      <div><span>${parseFloat(cancelAmount).toFixed(2)}</span></div>
                      </div>
                   ):''}


                  {reservationData.status === 5 ?
                    <div className={classes.cancelPolicyText}>
                      {(cancelCondition===1||cancelCondition===3)?(
                        <p>This reservation was cancelled greater than {reservationData.pool.cancellation_policy.hours} hours from your reservation time. You will be refunded for your booking, minus {reservationData.pool.cancellation_policy.discount!=='100'&&(reservationData.pool.cancellation_policy.discount+'%')} your {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'} booking fee.</p>
                      ):
                        (cancelCondition === 4 ? (<p>This reservation was cancelled in not accordance
                            with {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}’s cancellation policy. You will not be refunded
                            for your booking. </p>) : (
                            <p>This reservation was cancelled in accordance with {IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}’s
                              cancellation policy. You will not be charged for your booking.</p>)
                        )}
                  </div> : ''}


                  {reservationData.booking_status === true && reservationData.status === 4 ?
                    <div className={classes.cancelPolicyText}>
                      Your payment failed to process. Please submit new payment information for this booking.
                  </div> : ''}
                  {reservationData.booking_status === true && reservationData.status === 4 ?
                    <div className={classes.bluecolorTwo}>
                      <Typography variant='button' onClick={this.updatePaymentInfo.bind(this, reservationData.id)}>
                        UPDATE PAYMENT INFORMATION
                      </Typography>
                    </div> : ''}

                  {(reservationData.booking_status === true && (reservationData.status === 0 || reservationData.status === 1
                  || (reservationData.status === 3))) ?
                    <div className={classes.signupBtn} onClick={this.onSubmitReservationCancel.bind(this, reservationData)}>
                      <p className={classes.bluecolor + ' ' + classes.bluecolorCancel}>CANCEL RESERVATION REQUEST</p>
                    </div>
                    : ''}

                  {!isEdited && this.renderCard({ reservationData, cardLastFourDigit, cardBrand })}

                  {!isEdited && reservationData.booking_status === true && reservationData.status === 1 ?
                    (reservationData.pool !== undefined && reservationData.pool.createdBy !== undefined && reservationData.pool.createdBy.stripe_id !== undefined
                      && reservationData.pool.createdBy.stripe_id !== null && reservationData.pool.createdBy.stripe_id !== ''?(
                        (cardLastFourDigit!==null && cardLastFourDigit !== '' && cardLastFourDigit !== undefined)?(
                          <div className={classes.bluecolor + ' ' + classes.confirmReservationBtn} onClick={this.onSubmitRequestConfirm.bind(this, reservationData)}>
                            <Typography variant='button'>
                              CONFIRM RESERVATION
                            </Typography>
                          </div>
                        ):(
                          <div className={classes.confirmReservationBtn+ ' '+classes.disablePaymentBtn}>
                            <Typography variant='button'>
                              CONFIRM RESERVATION
                            </Typography>
                          </div>
                        )
                      ):(
                        <div className={classes.confirmReservationBtn+ ' '+classes.disablePaymentBtn}>
                          <Typography component='p'>
                               No payment can be applied because payment profile for the host isn't configured yet. Please message your host.
                           </Typography>
                          <Typography variant='button'>
                            CONFIRM RESERVATION
                          </Typography>
                        </div>
                      ))
                  : ''}

                  {reservationData.booking_status === false&&(
                    <div className={classes.confirmReservationBtn+ ' '+classes.disablePaymentBtn}>
                      <Typography component='p'>
                        This booking slot already confirmed by someone.
                      </Typography>
                    </div>
                  )}

                  {(reservationData.status === 3) ? <span className={classes.cancelPolicy}>Cancellation fees may apply</span> : ''}

                  {(reservationData.status === 6 && reservationData.swimmer_review !== true) ? <span className={classes.bluecolor} onClick={this.redirectToReviews.bind(this, reservationData)}>LEAVE A REVIEW</span> : ''}

                  {(reservationData.status === 6) ?
                    <div className={classes.bluecolorTwo}>
                      <Typography variant='button' onClick={this.redirectToPoolDetails.bind(this, poolData.id)}>
                        BOOK THIS POOL AGAIN!
                         </Typography>
                    </div> : ''
                  }
                </div>
              </Grid>
            </Grid>


            <Dialog
              open={this.state.deleteAlert}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              className={classes.deletePopup}
            >
              <DialogContent>
                <Typography variant='h3' className={classes.cancelPopupTitle}>
                  {
                    reservationData.status === 1 ?
                      'Are you sure you want to cancel your booking?'
                      : 'Are you sure you want to cancel?'
                  }

                </Typography>
                <DialogContentText className={classes.cancellationPolicy} id='alert-dialog-description'>
                  {
                    reservationData.status === 1 ?
                      'You will still be charged the service fee and depending on the host\'s cancellation policy, you may be charged for the booking.'
                      : `The host cancellation policy is "${reservationData.pool.cancellation_policy.description || ''}"`
                  }
                </DialogContentText>
                {
                  reservationData.status !== 1 ?
                    <DialogContentText className={classes.cancellationPolicy} id='alert-dialog-description'>
                      {HelperService.isNotIntoCancellationPolicy(reservationData) ? 'You will be receiving a refund for this reservation minus the service fee.' : 'You will not be receiving a refund for this reservation.'}
                    </DialogContentText> : null
                }
                {
                  reservationData.status !== 1 ?
                    <DialogContentText className={classes.cancellationPolicy} id='alert-dialog-description'>
                      Too many cancellation on your account will prevent you from being able to book instant booking
                      pools and reduces the odds of hosts approving future inquires.
                    </DialogContentText> : null
                }
              </DialogContent>
              <DialogActions>
                <Typography variant='button' onClick={this.handleCancelReasonPopup} autoFocus>
                  yes
                </Typography>
                <Typography variant='button' onClick={this.closePopup}>
                  no
                </Typography>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.showCancelReasonPopup}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
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
                  value={this.state.reason}
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
                {this.state.reason.match(/Other/) && <div className={classes.formInputBox}>
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
                <Typography className={classes.cancellButton} variant='button' onClick={this.handleCancelReasonPopup.bind(null, false)}>
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
                <DialogActions>
                  <Button
                    className={classes.declineButton}
                    disabled={this.disableCancelChatButton()}
                    onClick={this.handleCancelReservationConfirm}
                  >
                    submit
                  </Button>
                  <Typography className={classes.cancellButton} variant='button' onClick={this.handleCancelReasonPopup.bind(null, false)}>
                    cancel
                  </Typography>
                </DialogActions>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.showAlert}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              className={classes.deletePopup}
            >
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  {this.state.errorMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Typography variant='button' onClick={this.handleAlert.bind(null, false)} autoFocus>
                  ok
                </Typography>
              </DialogActions>
            </Dialog>
          </Typography>
          }
        </div>
      </div>
    );
  }
}



TitleDetails.propTypes = {
  classes: PropTypes.object.isRequired,

};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function TitleDetailsContainer (props) {
  const context = useContext(UserContext)
  const { region } = useContext(RegionContext)
  return <TitleDetails region={region} {...context} {...props} />
}

export default enhance(TitleDetailsContainer);
