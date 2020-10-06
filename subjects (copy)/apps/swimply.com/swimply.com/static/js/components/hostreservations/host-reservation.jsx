import React, { useContext } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import Pageloader from "../commons/pageloader";
import { loader } from "graphql.macro";
import UserUtils from "../utilities/UserUtils";
import * as commonFunctions from "./../utilities/commonFunctions";
import SwimmerReservation from "../reservations/myreservations";
import Moment from "react-moment";
import moment from 'moment';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import StarRatings from "react-star-ratings";
import _ from "lodash";
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {FULL_TIME_ARRAY, HOST_CANCEL_CONFIRMED_REASONS, HOST_DECLINE_REASONS, OBJECT_TIME_ARRAY} from '../../constants'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import HelperService from '../../services/helper'
import HostPlaceholder from '../shared/host-placeholder'
import {IS_US, IS_SHVIMPLY} from "../../config";
import { sendAnalytics } from "../utilities/analyticsUtils";
import UserContext from "../../contexts/UserContext";
import Avatar from '../commons/avatar';
import update from "immutability-helper";
import AppContext from "../../contexts/AppContext";

const queryString = require('query-string');

const getProfileDetails = loader('./../../graphql/user/me.graphql');

// const myPoolReservations = loader(
//   "./../../graphql/host/mypoolreservations.graphql"
// );
const getMyPoolPendingReservation = loader(
  "./../../graphql/host/getmypoolpendingreservation.graphql"
);
const getMyPoolUpcomingReservation = loader(
  "./../../graphql/host/getmypoolupcomingreservation.graphql"
);
const completedPoolReservations = loader(
  "./../../graphql/host/completedpoolreservations.graphql"
);

const approveReservation = loader(
  "./../../graphql/host/approvereservations.graphql"
);

const approveReservationChanges = loader(
  "./../../graphql/edit-reservation/approveReservationChanges.graphql"
);

const declineReservation = loader(
  "./../../graphql/host/declinereservations.graphql"
);

const declineReservationChanges = loader('./../../graphql/edit-reservation/declineReservationChanges.graphql')

const userRatingDetails = loader(
  "./../../graphql/user/userRatingQuery.graphql"
);
const cancelReservation = loader(
  "./../../graphql/host/cancelreservation.graphql"
);
const serviceChargeQuery = loader(
  "./../../graphql/findpool/serviceChargeQuery.graphql"
);
const hideCompletedBooking = loader('./../../graphql/reservations/hideCompletedBooking.graphql');
const stripeConnect = loader('./../../graphql/user/stripeConnect.graphql');

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
  hostMaintabs: {
    boxShadow: "0 0 3px #ccc",
    "& ul": {
      listStyle: "none",
      paddingLeft: "0",

      margin: "0",
      "& li": {
        display: "inline-block",
        padding: "10px 60px",
        position: "relative"
      }
    }
  },
  active: {
    color: "#232323 !important",
    "&:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "3px",
      background: theme.palette.common.blue,
      bottom: 0,
      left: 0
    }
  },
  hostingPools: {
    maxWidth: "600px",
    padding: "40px 0",

    "& h2": {
      marginBottom: "15px"
    },
    "& ul": {
      listStyle: "none",
      paddingLeft: "0",
      position: "relative",
      margin: "0",
      '@media(max-width:767px)':{
        margin: "0 0 20px 0",
      },
      "& li": {
        display: "inline-block",
        padding: "2.5px 7px",
        marginRight: "15px",
        position: "relative",
        color: "#aabac0",
        letterSpacing: "1px",
        fontWeight: "500",
        fontSize: "13px",
        cursor: "pointer",
        '@media(max-width:767px)':{
            marginRight: "8px ",
            padding:'2.5px 5px 2.5px 0',
            fontSize: "11px",

        }
      }
    },

  },
  cursorPointer: {
    cursor: "pointer",
    fontSize: "11px",
    position: "relative",
    left: "132px",
  },
  mostRecent: {
    letterSpacing: "0",
    float: "right",
    marginRight: "0 !important",
    position: "absolute !important",
    background: theme.palette.common.white,
    right: "0",
    cursor: "pointer",
    border: "2px solid #fff",
    top: "-7px",
    "& img": {
      maxWidth: "15px",
      verticalAlign: "middle"
    },
    "& > div": {
      padding: "0",
      "& span": {
        color: theme.palette.common.black,
        fontSize: "13px",
        letterSpacing: "0",
        textAlign:"right",
      },
      "&:focus": {
        background: "transparent"
      },
      "&:hover": {
        background: "transparent"
      },
      "& > li ": {
        padding: "0",
        color: theme.palette.common.black,
        letterSpacing: "0",
        "& span": {
          color: theme.palette.common.black
        }
      }
    },
    "& > div > div > div> div > div": {
      background: "transparent",
      "&:focus": {
        background: "transparent"
      },
      "&:hover": {
        background: "transparent"
      }
    }
  },
  mostRecentItem: {
    "& > div": {
      "& span": {
        color: theme.palette.common.black,
        letterSpacing: "0",
        background: "url(../img/Arrow-Down-Black.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "15px",
        backgroundPosition: "right 0px center",
        paddingRight: "25px",
        marginRight: "-24px",
        textAlign:"right",
        '@media (max-width:767px)':{
          fontSize:'12px'
        }
      }
    }
  },
  reservationDate: {
    padding: "0",
  },
  listBoxHost: {
    display: "flex",
    marginTop: "15px",
    boxShadow: "0 0 3px #ccc",
    padding: "15px",
    width: "calc(100% - 30px)",
    position:'relative'
  },
  listBoxHostLeft: {
    marginRight: "5px",
    "& img": {
      width: "50px",
      height: "50px",
      borderRadius: "50%"
    }
  },
  listBoxHostMiddle: {
    width: "87%",
    "& label": {
      color: theme.palette.common.blue,
      textTransform: "uppercase",
      fontWeight: "500",
      paddingRight: "30px",
      display: "inline-block",
      cursor: "pointer",
      fontSize: "13px",
      marginBottom: "10px"
    },
    "& p": {
      color: theme.palette.common.black,
      margin: "1px 0"
    }
  },
  sectionWithStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width:767px)':{
      flexDirection: 'column'
    }
  },
  headingTop: {
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "0.5px",
    color: theme.palette.common.black,
    marginBottom: "0px"
  },
  ratingStar: {
    display: "block",
    height: "25px",
    paddingTop: "5px"
  },
  bottomBox: {
    margin: "10px 0",
    "& p": {
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "14px"
    },
    "& span": {
      display: "inline-block",
      marginRight: "10px",
      padding: "6px 30px",
      marginTop: "8px",
      fontWeight: "400",
      border: "2px solid #1db5e6",
      background: "#1db5e6",
      textTransform:'captilize',
      "&:last-child": {
        background: "#fff",
        border: "2px solid #00ade2",
        color: theme.palette.common.black,
        textTransform:'captilize'
      }
    },
    '@media (max-width:767px)':{
      "& span": {
        padding: "6px 15px",
      }
    }
  },
  listBoxHostRight: {
    marginRight: 20,
    "& span": {
      padding: "2px 10px",
      fontSize: "13px",
      fontWeight: "400",
      width: '210px'
    },
    '@media (max-width:767px)':{
      '& span':{
        marginTop: '15px',
        padding: '5px 15px',
        fontSize: '12px',
      }
    }

  },
  swiming: {
    color: "brown"
  },
  emptyRatingStar:{
    marginTop: '8px',
    display: 'block'
  },
  tabsChange: {
    "& span": {
      color: "#aabac0",
      minHeight: "3px"
    },
    "& button": {
      background: "transparent",
      "&:hover": {
        background: "transparent"
      }
    },
    '@media (max-width:767px)':{
      margin:'0 -15px',
      "& button": {
        width:'50%',
      }
    }
  },
  activeMostRecent: {
    border: "2px solid #25bfe9",
    boxShadow: "0 0 3px #ccc"
  },
  pendingBtn: {
    background: "#f99f6c",
    "&:hover": {
      background: "#f99f6c"
    }
  },
  approvedBtn: {
    background: "green",
    "&:hover": {
      background: "green"
    }
  },
  declinedBtn: {
    background: "#ff0000 !important",
    "&:hover": {
      background: "#ff0000"
    }
  },
  confirmedBtn: {
    background: "#12bfea",
    "&:hover": {
      background: "#12bfea"
    }
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
    cursor: 'pointer',
    marginLeft: 20,
  },
  noMessages: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.common.black,
    '@media (max-width:767px)':{
      display: "table",
      textAlign:'center',
      lineHeight:'22px'

    },
    "& figure": {
      margin: "15px 18px 0 -15px"
    },
    "& p": {
      color: theme.palette.common.black,
      fontSize: "14px",
      fontWeight: "500",
      "& span": {
        display: "block",
        color: theme.palette.common.blue,
        paddingTop: "7px",
        fontWeight: "500",
        textTransform: "uppercase",
        fontSize: "13px"
      },
      '@media (max-width:767px)':{
        marginTop:'0'
      }
    }
  },
  hostReservationPop: {
    minWidth: "400px",
    maxWidth: "400px",
    maxHeight: "300px",
    textAlign: "center",
    "& label": {
      color: theme.palette.common.blue,
      textTransform: "uppercase",
      fontSize: "10px",
      fontWeight: "500",
      display: "table",
      marginTop: "-1px"
    },
    '@media (max-width:767px)':{
      maxWidth: "300px",
      minWidth: "300px",
      "& label": {
        left:'0',
        width:'100%'
      }
    }
  },
  viewProfileAvatar: {
    width: "60px",
    height: "60px"
  },
  closeButton: {
    float: "left",
    maxWidth: "15px",
    filter: "grayscale(1)",
    marginTop: "-15px",
    cursor: "pointer"
  },
  hospPopContent: {
    textAlign: "left",
    padding: "15px 0",
    borderBottom: "1px solid #ccc",
    "& label": {
      color: theme.palette.common.black,
      textTransform: "uppercase",
      fontWeight: "500",
      letterSpacing: "1.5px",
      fontSize: "12px"
    },
    "& p": {
      margin: "0",
      color: theme.palette.common.black,
      fontSize: "13px"
    }
  },
  reviewOtherHosts: {
    textAlign: "left",
    marginTop: "15px",
    "& h5": {
      margin: "0 0 15px 0",
      textTransform: "uppercase",
      fontWeight: "500",
      letterSpacing: "1px",
      fontSize: "13px",
      color: theme.palette.common.black
    },
    "& label": {
      color: theme.palette.common.black,
      fontSize: "13px",
      fontWeight: "500"
    },
    "& p": {
      margin: "0",
      fontSize: "13px"
    }
  },
  commentGroup: {
    paddingBottom: "25px",
    color: theme.palette.common.black
  },
  calenderManegemetPop: {
    padding: '25px',
    textAlign: "center",
    overflowX: 'hidden',
    "& p": {
      margin: "0",
      color: theme.palette.common.black,
      fontSize: "13px"
    },
    "& h3": {
      textAlign: "left"
    },
    "& h4": {
      marginBottom: "10px"
    }
  },
  popupButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: "0px",
    marginTop: "20px",
    borderTop: "1px solid #fff",
    "& span:last-child": {
      background: theme.palette.common.transparent,
      color: theme.palette.common.blue,
      fontSize: "12px"
    }
  },
  cancelBtn: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '5px'
  },
  activeTab: {
    "& span": {
      color: "#232323 !important"
    }
  },
  cancelPolicyText: {
    background: '#fbece2',
    color: '#eca167',
    padding: '10px 14px',
    fontSize: '12px',
    lineHeight: '18px',
    borderRadius: '5px',
    margin: '8px 0',
    maxWidth: '356px',
    '@media (max-width:767px)':{
      maxWidth: '100%',
    }
  },
  bluecolorTwo: {
    '& span': {
      display: 'inline-block',
      padding: '2px 10px',
      marginTop: '10px',
      textTransform: 'unset',
      background: theme.palette.common.white,
      color: 'black',
      border: '2px solid #00ade2',
    }
  },
  hostReservationPopMain:{
    '@media (max-width:767px)':{
      '& > div > div':{
        margin:'15px'
      }
    }
  },
  calenderManegemetPopMain:{
		'@media (max-width:767px)':{
			'& > div > div':{
				margin:'0'
			}
		}
	},
  popUpErrorMsg: {
    marginTop:'10px  !important'
  },
  profileSection:{
    '& label':{
      display:'block',
      textAlign:'center',
      left:0,
    }
  },
  flexContainer: {
    display: 'flex',
    marginTop: '15px'
  },
  popupTextContent: {
    marginLeft: '10px',
    '& p': {
      textAlign: 'left',
      fontSize: '16px'
    },
    '& h4': {
      textAlign: 'left',
      margin: '0'
    }
  },
  borderBottom: {
    borderBottom: '1px solid #d2d2d2'
  },
  selectDeclineReason: {
    width: '100%'
  },
  selectContainer: {
    marginTop: '20px'
  },
  suggestButton: {
    marginBottom: '20px'
  },
  mainButton: {
    width: '100%',
    maxWidth: '260px',
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
  dropDownTitle: {
    maxWidth: '300px',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 400
  },
  cancelPopupTitle: {
    marginBottom: '10px'
  },
  blueBox: {
    margin: '10px 0',
    padding: '12px',
    border: '1px solid #00c8f0',
    color: '#00c8f0',
    '& p': {
      margin: '0'
    }
  },
  avatarContainer: {
    display: 'inline-block',
    margin: '0 auto'
  },
  reservationChangesContainer: {
    fontSize: '14px',
    marginBottom: '15px',
    '& p': {
      display: 'flex',
      alignItems: 'center',
      '&:before': {
        content: `''`,
        display: 'inline-block',
        marginRight: '5px',
        width: '15px',
        height: '15px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      },
      '&.date:before': {
        backgroundImage: 'url(/img/commons/date-orange.png)',
      },
      '&.guests:before': {
        width: '19px',
        height: '13px',
        backgroundImage: 'url(/img/commons/guests-orange.png)',
      },
    }
  },
  lineThrough: {
    '& p': {
      textDecoration: 'line-through',
      color: theme.palette.common.darkgray,
    }
  },
  editedTime: {
    '& p': {
      display: 'flex',
      alignItems: 'center',
      fontWeight: '500',
      lineHeight: '18px',
      color: theme.palette.common.primary,
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '8px',
        height: '8px',
        marginRight: '5px',
        borderRadius: '50%',
        backgroundColor: theme.palette.common.secondary,
      }
    }
  },
  editedGuests: {
    '& p': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '18px',
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '8px',
        height: '8px',
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
    }
  },
  reservationInfo: {
    padding: '15px 0',
    borderTop: `1px solid ${theme.palette.common.border}`,
    borderBottom: `1px solid ${theme.palette.common.border}`,
  },
  blue: {
    color: theme.palette.common.primary,
  },
  buttonsContainer: {
    '& .flex': {
      display: 'flex',
      '@media (max-width: 420px)':{
        flexWrap: 'wrap',
      },
      '& span': {
        boxSizing: 'border-box',
        minWidth: '140px',
        padding: '6px 15px',
        '@media (max-width: 500px)':{
          minWidth: '100px',
          fontSize: '12px',
        },
        '@media (max-width: 420px)':{
          width: '100px',
        },
      },
      '& span.decline-button': {
        backgroundColor: theme.palette.common.secondary,
        color: theme.palette.common.white,
        border: `2px solid ${theme.palette.common.secondary}`,
        transition: 'all 0.1s ease',
        '&:hover': {
          opacity: '0.9',
        },
      }
    }
  },
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 0,
      subTabs: "active",
      moreRecent: false,
      loading: false,
      reservation: [],
      userProfileDetails: {},
      viewProfile: false,
      singlePoolDetails: {},
      statusChange: "",
      statusChangePopup: false,
      serviceCharge: 0,
      applicationCharge: 0,
      sortBy: 'booking',
      stripe_url:'',
      stripe_id:'',
      errorMsg:'',
      mail_booking_id:'',
      mail_booking_status:'',
      declineReason: '',
      declineChangesReason: '',
      approveChangesReason: '',
      cancelReason: '',
      otherReason: '',
      showAlert: false,
      showReasonDropDown: false,
      showSuggestAnotherTime: false,
      showHostPlaceholder: HelperService.handleHostPlaceholder(),
      showCancelChatMessagePopup: false,
      cancelChatMessage: '',
      selectedReservationId: null,
      bookingId: null,
    };
    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleChangeTabIndex = this.handleChangeTabIndex.bind(this);
    this.handleMoreRecent = this.handleMoreRecent.bind(this);
    this.viewUserProfile = this.viewUserProfile.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.closeProfilePopup = this.closeProfilePopup.bind(this);
    this.changeReservationStatus = this.changeReservationStatus.bind(this);
    this.closeStatusChangePopup = this.closeStatusChangePopup.bind(this);
    this.changeBookingStatus = this.changeBookingStatus.bind(this);
    this.sendCancelEvent = this.sendCancelEvent.bind(this);
    this.getProfileDetails = this.getProfileDetails.bind(this);
    this.redirectToStripe = this.redirectToStripe.bind(this);
    this.onSelectDeclineReason = this.onSelectDeclineReason.bind(this);
    this.handleNewReservation = this.handleNewReservation.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);

    this.channel = '';
  }

  componentDidMount() {
    let { history } = this.props;
    let accessToken = UserUtils.getAccessToken();
    if (accessToken !== null && accessToken !== '') {
      let parsed = queryString.parse(this.props.location.search);
      if(parsed.code !== undefined && parsed.code !== '') {
        this.setState({
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
              stripe_id:'connected'
            });
            history.push('/host-reservation')
            if (UserUtils.getPreviousUrl() === 'reservation-success') {
              this.setState({ tabs: 1 })
              UserUtils.removePreviousUrl()
            }
            this.getProfileDetails();
            this.getPoolReservation("completed");
          } else {
            this.setState({
              loading: false,
              successMessage:''
            });
            this.getProfileDetails();
            this.getPoolReservation("completed");
          }
        }).catch((error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            profileFailError: errorMsg,
            loading: false
          });
          this.getProfileDetails();
          this.getPoolReservation("completed");
        });
      } else {
        if(parsed.booking_id !== undefined && parsed.booking_id !== null && parsed.booking_id !== '' && parsed.status !== undefined && parsed.status !== null && parsed.state !== '') {
          this.setState({
            mail_booking_id:parsed.booking_id,
            mail_booking_status:parsed.status,
           }, () => {
            this.getProfileDetails();
            this.getPoolReservation("active");
          })
          history.push('/host-reservation')
          if (UserUtils.getPreviousUrl() === 'reservation-success') {
            this.setState({ tabs: 1 })
            UserUtils.removePreviousUrl()
          }
        } else {
          this.setState({
            mail_booking_id:'',
            mail_booking_status:'',
          })
          history.push('/host-reservation')
          if (UserUtils.getPreviousUrl() === 'reservation-success') {
            this.setState({ tabs: 1 })
            UserUtils.removePreviousUrl()
          }
          this.getProfileDetails();
          this.getPoolReservation("active");
        }

      }

      this.props.client
        .query({
          query: serviceChargeQuery,
          fetchPolicy: "network-only"
        })
        .then(res => {
          let service_fee_index = res.data.serviceCharge.findIndex(
            x => x.name === "service_fee"
          );
          let application_fee_index = res.data.serviceCharge.findIndex(
            x => x.name === "host_fee"
          );
          this.setState({
            serviceCharge: res.data.serviceCharge[service_fee_index].percentage,
            applicationCharge:
              res.data.serviceCharge[application_fee_index].percentage
          });
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    } else {
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setPreviousSearchUrl(this.props.location.search);
      UserUtils.setIsPreviousUrl('yes');
      history.push('/');
    }
  }

  componentWillUnmount() {
    if (this.props.echo && this.props.echo.leave) {
      this.props.echo.leave(this.channel)
    }
  }

  handleNewReservation(reservation) {
    console.log('new reservation', reservation)
    reservation.id = reservation.id.toString();
    if (
      ((this.state.subTabs === 'active' || this.state.subTabs === 'upcoming') && reservation.status <= 1)
      || (this.state.subTabs === 'completed' && reservation.status > 1)
    ) {
      if (this.state.sortBy === 'reservation') {
        this.setState( { reservation: update( this.state.reservation, {
            $unshift: [reservation]
          } ) } )
      } else {
        // Find index to insert (by date)
        const insertIndex = this.state.reservation.findIndex(existingReservation => {
          const reservationDate = moment(`${existingReservation.date} ${existingReservation.from}`).toISOString();
          const newReservationDate = moment(`${reservation.date} ${reservation.from}`).toISOString();
          return moment(reservationDate).isAfter(moment(newReservationDate))
        })
        this.setState( { reservation: update( this.state.reservation, {
            $splice: [[insertIndex, 0, reservation]]
          } ) } )
      }
    }
  }

  handleStatusChange(reservation) {
    console.log('handleStatusChange', reservation)
    const reservationIndex = this.state.reservation.findIndex(reserv => reserv.id === reservation.booking.toString())
    console.log('reservationIndex', reservationIndex)
    if (reservationIndex >= 0) {
      this.setState({ reservation: update(this.state.reservation, {
          [reservationIndex]: {
            status: { $set: reservation.status }
          }
        })
      })
    }
  }

  getProfileDetails() {
    this.props.client.query({
      query: getProfileDetails,
      fetchPolicy: "network-only"
    })
      .then((res) => {
        UserUtils.setUserCountry(res.data.me.country_code);
        UserUtils.setSwimmerCountry(res.data.me.country_code_swimmer);
        UserUtils.setLastPoolId(res.data.me.last_pool_id);
        this.setState({
          stripe_url:res.data.me.stripe_connect_url,
          stripe_id:res.data.me.stripe_id,
          showHostPlaceholder: HelperService.handleHostPlaceholder()
        });
        UserUtils.setUserID(res.data.me.id)
        this.channel = `reservation.${res.data.me.id}`
        if (this.props.echo) {
          this.props.echo.private(this.channel)
            .listen('.booking.created.host', (e) => {
              this.handleNewReservation(e)
            })
            .listen('.booking.updated.host', (e) => {
              this.handleStatusChange(e)
            });
        }
      }).catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getProfileDetails()
          }
        }
      });
  }


  redirectToStripe() {
    let { stripe_url } = this.state;
    stripe_url = stripe_url+'&redirect_uri='+window.location.href;
    window.open(stripe_url,'_self');
  }

  changeReservationStatus(data, status, direct) {
    const showReasonDropDown = !!status.match(/decline|cancel|declineChanges/)
    const showPopup = showReasonDropDown ? 'showAlert': 'statusChangePopup'
    const extraFields = direct ? {} : { errorMsg: '' }

    data.guestName = data.user ?
      `${data.user.firstname} ${data.user.lastname ? `${data.user.lastname.charAt(0).toUpperCase()}.` : ''}` : ''

    let totalAmount = data.reservation_price || 0
    totalAmount = totalAmount - (totalAmount / 100) * parseFloat(this.state.applicationCharge).toFixed(2)
    data.totalAmount = `$${parseFloat(totalAmount).toFixed(2)}`

    this.setState({
      singlePoolDetails: data,
      statusChange: status,
      [showPopup]: true,
      showReasonDropDown,
      ...extraFields
    })
  }

  viewUserProfile(data) {
    if (data.user.id) {
      this.setState({
        loading: true
      });
      this.props.client
        .query({
          query: userRatingDetails,
          variables: {
            id: parseInt(data.user.id)
          },
          fetchPolicy: "network-only"
        })
        .then(res => {
          this.setState({
            userProfileDetails: res.data.user,
            loading: false,
            viewProfile: true,
            selectedReservationId: data.id
          });
        })
        .catch(async (error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          if (errorMsg === "Unauthenticated.") {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.viewUserProfile(data)
            }
          }
          this.setState({ loading: false });
        });
    }
  }

  closeProfilePopup() {
    this.setState({
      viewProfile: false,
      selectedReservationId: null
    });
  }
  closeStatusChangePopup() {
    this.setState({
      statusChangePopup: false,
      showCancelChatMessagePopup: false,
      cancelReason: '',
      declineReason: '',
      otherReason: '',
      cancelChatMessage: ''
    });
  }

  sendMessage(userId, bookingId) {
    if (userId) {
      if (this.props.user && !this.props.user.accept_chat_rules) {
        this.props.history.replace('/chat-rules')
      } else {
        let { history } = this.props;
        UserUtils.setMessageReceiverId(userId);
        UserUtils.setBackBtnLink("reservation");
        history.push({
          pathname: 'conversations',
          state: {
            fromReservationDetails: true,
            bookingId: bookingId ? bookingId : this.state.selectedReservationId
          }
        });
      }
    }
  }

  handleTabsChange(event, value) {
    this.setState({
      tabs: value
    });
    if (value === 0) {
      this.getPoolReservation("active");
    }
  }

  changeSubTabs(tab_type) {
    let { subTabs } = this.state;
    if (subTabs !== tab_type) {
      this.getPoolReservation(tab_type);
    }
  }

  getPoolReservation(tab_type) {
    this.setState({
      loading: true,
      subTabs: tab_type,
      statusChangePopup: false,
      showCancelChatMessagePopup: false,
      cancelChatMessage: '',
    });
    let { sortBy } = this.state;
    if (tab_type === "active" || tab_type === "upcoming") {
      const queryRequest = tab_type === "active" ? getMyPoolPendingReservation : getMyPoolUpcomingReservation
      const queryRequestString = tab_type === "active" ? "getMyPoolPendingReservation" : "getMyPoolUpcomingReservation"
      this.props.client
        .query({
          query: queryRequest,
          variables: {
            sortBy: sortBy
          },
          fetchPolicy: "no-cache"
        })
        .then(res => {
          let reservation = res.data[queryRequestString];
          this.setState({ loading: false, reservation: reservation });

          let {mail_booking_id, mail_booking_status } = this.state;
          if((tab_type === 'active' || tab_type === 'upcoming') && mail_booking_id !== null && mail_booking_id !== '' && mail_booking_id !== undefined &&  mail_booking_id !== '') {
              let booking = _.filter(reservation, { id: mail_booking_id });
              booking = _.filter(booking, { status: 0 });
              if(booking.length === 1) {
                if(mail_booking_status !== null && mail_booking_status !== undefined && mail_booking_status !== '') {
                  // let bookingData = { booking_id: mail_booking_id };
                  if(mail_booking_status === 'approve') {
                    this.changeReservationStatus(
                      booking[0],
                      'approve'
                    )
                    // this.approveReservationStatus(bookingData,booking[0]);
                  } else if(mail_booking_status === 'decline') {
                    this.changeReservationStatus(
                      booking[0],
                      'decline'
                    )
                    // this.declineReservationStatus(bookingData);
                  }
                }
              }
          }
        })
        .catch(async (error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({ loading: false, reservation: [] });
          if (errorMsg === "Unauthenticated.") {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.getPoolReservation(tab_type)
            }
          }
        });
    } else {
      this.props.client
        .query({
          query: completedPoolReservations,
          fetchPolicy: "no-cache"
        })
        .then(res => {
          let reservation = res.data.getMyPoolCompletedReservation;
          this.setState({ loading: false, reservation: reservation });
        })
        .catch(async (error) => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({ loading: false, reservation: [] });
          if (errorMsg === "Unauthenticated.") {
            const status = await this.props.refreshToken(this.props.history)
            if (status === 'ok') {
              this.getPoolReservation(tab_type)
            }
          }
        });
    }
  }

  handleChangeTabIndex(index) {
    this.setState({
      tabs: index
    });
  }
  handleMoreRecent(value) {
    let { moreRecent, sortBy } = this.state;
    if (moreRecent && sortBy !== value) {
      this.setState({ moreRecent: !moreRecent, sortBy: value }, () => {
        this.getPoolReservation(this.state.subTabs);
      });
    } else {
      this.setState({ moreRecent: !moreRecent });
    }
  }

  sendCancelEvent(booking_id) {
    const analyticsData = {
      timestamp: new Date().toISOString(),
      'event_type': 'booking-cancel',
      poolId: this.state.singlePoolDetails.id,
      bookingId: booking_id,
      platform: 'web',
      location: IS_US ? 'US' : 'AU',
      userId: UserUtils.getUserID(),
      userRole: 'host',
    };
    sendAnalytics( this.props.client, analyticsData );
  }

  changeBookingStatus(booking_id, status) {
    let bookingData = { booking_id: booking_id };
    if (status === "approve") {
      this.approveReservationStatus(bookingData);
    } else if (status === "decline") {
      this.declineReservationStatus(bookingData);
      this.sendCancelEvent(booking_id)
    } else if (status === "cancel") {
      this.cancelReservationStatus(bookingData);
      this.sendCancelEvent(booking_id)
    } else if (status === "approveChanges") {
      this.approveReservationChanges(bookingData);
      this.sendCancelEvent(booking_id)
    } else if (status === "declineChanges") {
      this.declineReservationChanges(bookingData);
      this.sendCancelEvent(booking_id)
    }
  }

  handleOtherReason = (reason) => {
    return reason.match(/Other/) ? this.state.otherReason : reason
  }

  declineReservationStatus(data) {
    this.setState({
      loading: true
    });
    this.props.client
      .mutate({
        mutation: declineReservation,
        variables: {
          data: {
            ...data,
            decline_reason: this.handleOtherReason(this.state.declineReason),
            cancel_chat_message: this.state.cancelChatMessage
          }
        }
      })
      .then(res => {
        if (
          res.data.declineReservation.status === "DECLINED_BOOKING_SUCCESSFULL"
        ) {
          this.getPoolReservation("active");
        } else {
          this.setState({
            loading: false,
            declineReason: '',
            otherReason: '',
            cancelChatMessage: '',
            statusChangePopup: false,
            showCancelChatMessagePopup: false
          });
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.declineReservationStatus(data)
          }
        }
        this.setState({
          errorMessage: errorMsg,
          loading: false,
          declineReason: '',
          otherReason: '',
          cancelChatMessage: '',
          statusChangePopup: false,
          showCancelChatMessagePopup: false
        });
      });
  }

  cancelReservationStatus(data) {
    this.setState({
      loading: true
    });
    this.props.client
      .mutate({
        mutation: cancelReservation,
        variables: {
          data: {
            ...data,
            cancel_reason: this.handleOtherReason(this.state.cancelReason),
            cancel_reason_message: this.handleOtherReason(this.state.cancelReason),
            cancel_chat_message: this.state.cancelChatMessage
          }
        }
      })
      .then(res => {
        if (
          res.data.cancelReservation.status === "CANCELLED_BOOKING_SUCCESSFULL"
        ) {
          this.getPoolReservation(this.state.subTabs);
        } else {
          this.setState({
            loading: false,
            cancelReason: '',
            otherReason: '',
            cancelChatMessage: '',
            statusChangePopup: false,
            showCancelChatMessagePopup: false
          });
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.cancelReservationStatus(data)
          }
        }
        this.setState({
          errorMessage: errorMsg,
          loading: false,
          cancelReason: '',
          otherReason: '',
          statusChangePopup: false,
          showCancelChatMessagePopup: false
        });
      });
  }

  approveReservationStatus(data, bookingData) {
    this.setState({
      loading: true
    });
    this.props.client
      .mutate({
        mutation: approveReservation,
        variables: {
          data: data
        }
      })
      .then(res => {
        if (res.data.approveReservation.status === "APPROVE_BOOKING_SUCCESSFULL") {
          this.getPoolReservation("active");
        } else if(res.data.approveReservation.status === 'APPROVE_BOOKING_ALREADY_DONE_FOR_SOMEONE') {
          this.setState({
            loading: false,
            errorMsg:'You have already approved this time slot for someone.'
          });
          if(bookingData !== undefined && bookingData !== '') {
            this.changeReservationStatus(bookingData,"approve", true)
          }
        } else {
          this.setState({
            loading: false,
            errorMsg:''
          });
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.approveReservationStatus(data, bookingData)
          }
          errorMsg = ''
        }
        this.setState({
          errorMessage: errorMsg,
          loading: false
        });
      });
  }

  redirectToReviews(data) {
    let { history } = this.props;
    history.push("/reviews-host/"+data.id);
  }

  onSelectDeclineReason (statusChange, { target: { value } }) {
    this.setState({ [`${statusChange}Reason`]: value })
  }

  showSuggestAnotherTime = () => {
    this.props.history.push({
      pathname: `/host-reservation/suggest-new-time`,
      state: { reservationDetails: this.state.singlePoolDetails }
    })
  }

  hideSuggestAnotherTime = () => {
    this.setState({
      showSuggestAnotherTime: false
    })
  }

  handleDeclineReasonPopup = (show) => {
    this.setState({
      showAlert: false,
      statusChangePopup: show
    })
  }

  closePopup = () => {
    this.setState({ showAlert: false })
  }

  onChangeCancelChatMessage = ({ target: { value: cancelChatMessage } }) => {
    this.setState({ cancelChatMessage })
  }

  disableCancelChatButton = () => {
    return this.state.cancelChatMessage.trim().length < 10
  }

  openCancelChatMessagePopup = () => {
    this.setState({
      statusChangePopup: false,
      showCancelChatMessagePopup: true
    })
  }

  handlePopup = (showAlert) => {
    this.setState({ showAlert })
  }

  handleBookingId = (bookingId) => {
    this.setState({ bookingId })
  }

  checkOnSubmit = (statusChange) => {
    const reason = this.state[`${statusChange}Reason`]
    return (!reason || (reason.match(/Other/) && this.state.otherReason.trim().length <= 10)) && this.state.showReasonDropDown
  }

  handleError = (error, callback = () => {}) => {
    let errorMessage = commonFunctions.parseGraphQLErrorMessage(error)
    this.setState({
      errorMessage,
      loading: false,
      declineChangesReason: '',
      otherReason: '',
      cancelChatMessage: '',
      statusChangePopup: false,
      showCancelChatMessagePopup: false
    }, async () => {
      if (errorMessage === 'Unauthenticated.') {
        const status = await this.props.refreshToken(this.props.history)
        if (status === 'ok') {
          callback()
        }
      }
    })
  }

  approveReservationChanges = (data) => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { approveEditReservation: result }} = await this.props.client.mutate({
          mutation: approveReservationChanges,
          variables: { data }
        })

        if (result.status === 'APPROVE_BOOKING_SUCCESSFUL') {
          this.getPoolReservation('active')
        } else if (result.status === 'APPROVE_BOOKING_ALREADY_DONE_FOR_SOMEONE') { // TODO need to check this status
          this.setState({
            loading: false,
            errorMsg: 'You have already approved this time slot for someone.'
          })
        } else {
          this.setState({
            loading: false,
            errorMsg:''
          })
        }
      } catch (e) {
        this.handleError(e, this.approveReservationChanges.bind(this, data))
      }
    })
  }

  declineReservationChanges = (data) => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { declineEditReservation: result }} = await this.props.client.mutate({
          mutation: declineReservationChanges,
          variables: {
            data: {
              ...data,
              decline_reason: this.handleOtherReason(this.state.declineChangesReason),
              cancel_chat_message: this.state.cancelChatMessage
            }
          }
        })

        if (result.status === 'EDIT_BOOKING_DECLINED_SUCCESSFUL') {
          this.getPoolReservation(this.state.subTabs)
        } else {
          this.setState({
            loading: false,
            declineChangesReason: '',
            otherReason: '',
            cancelChatMessage: '',
            statusChangePopup: false,
            showCancelChatMessagePopup: false
          })
        }
      } catch (e) {
        this.handleError(e, this.declineReservationChanges.bind(this, data))
      }
    })
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
        this.getPoolReservation("completed");
      }
    })
    .catch(error => {
      this.setState({
        loading: false,
      });
    });
    this.setState({ bookingId: null });
  }

  getPopupText = () => {
    const { statusChange } = this.state
    switch (statusChange) {
      case 'approve': {
        return {
          buttonOneText: 'APPROVE RESERVATION REQUEST',
          buttonTwoText: 'CANCEL',
          popUpTitle: 'Approve request?',
        }
      }
      case 'decline': {
        return {
          buttonOneText: 'DECLINE RESERVATION REQUEST',
          buttonTwoText: 'CANCEL',
          popUpTitle: 'Decline request?',
        }
      }
      case 'cancel': {
        return {
          buttonOneText: 'CANCEL THIS RESERVATION',
          buttonTwoText: 'GO BACK',
          popUpTitle: 'Cancel reservation?',
        }
      }
      case 'approveChanges': {
        return {
          buttonOneText: 'APPROVE CHANGE REQUEST',
          buttonTwoText: 'CANCEL',
          popUpTitle: 'Approve change request?',
        }
      }
      case 'declineChanges': {
        return {
          buttonOneText: 'DECLINE CHANGE REQUEST',
          buttonTwoText: 'CANCEL',
          popUpTitle: 'Decline change request?',
        }
      }
      default: {
        return {
          buttonOneText: '',
          buttonTwoText: '',
          popUpTitle: '',
        }
      }
    }
  }

  dateWasBeforeOrEqualNow = (date, time = '00:00:00') => {
    let formattedDate = date + ' ' + time
    formattedDate = moment(formattedDate).add(1, 'hours')
    return formattedDate.isBefore(moment()) || formattedDate.isSame(moment())
  }

  renderStatusChangePopup = () => {
    const { classes } = this.props
    const { singlePoolDetails: data, subTabs, statusChange, errorMsg } = this.state
    const { buttonOneText, buttonTwoText, popUpTitle } = this.getPopupText()

    const isEdited = (subTabs === 'active' || subTabs === 'upcoming') && HelperService.isEditedBooking(data)

    const dateIsEdited = isEdited && data.edited_fields.date
    const timeIsEdited = isEdited && (data.edited_fields.from || data.edited_fields.to)
    const guestsIsEdited = isEdited && (
      HelperService.isNumber(data.edited_fields.adult_guests)
      || HelperService.isNumber(data.edited_fields.children_guests)
      || HelperService.isNumber(data.edited_fields.infant_guests)
    )

    return <Dialog
      className={classes.calenderManegemetPopMain}
      open={this.state.statusChangePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={classes.borderBottom}>
        <DialogContent className={classes.calenderManegemetPop}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h3">{popUpTitle}</Typography>
            {errorMsg === "" ? "" : <Typography variant="caption" className={classes.popUpErrorMsg} component="p">{errorMsg}</Typography>}
            <div className={classes.flexContainer}>
              {data.user !== undefined ? (
                <div>
                  <Avatar
                    containerClass={classes.avatarContainer}
                    className={classes.viewProfileAvatar}
                    src={(data && data.img_url) || window.location.origin + '/img/profile-icon.png'}
                    alt='Avatar'
                    user={data && data.createdBy}
                  />
                </div>
              ) : (
                ""
              )}
              <div className={classes.popupTextContent}>
                {
                  data.user &&
                  <Typography variant='h4'>
                    {data.user.firstname +
                    (data.user.lastname ?
                      (' ' + data.user.lastname.charAt(0).toUpperCase()) : '')}.
                  </Typography>
                }
                {/*<p>*/}
                {/*  <Moment format="MMMM DD, YYYY">*/}
                {/*    {singlePoolDetails.date}*/}
                {/*  </Moment>*/}
                {/*</p>*/}
                <div className={dateIsEdited ? classes.lineThrough : ''}>
                  <p>
                    <Moment format="MMMM DD, YYYY">{data.date}</Moment>
                  </p>
                </div>
                {
                  dateIsEdited && <div className={classes.editedTime}>
                    <p>
                      <Moment format="MMMM DD, YYYY">{data.edited_fields.date}</Moment>
                    </p>
                  </div>
                }
                {/*<p>*/}
                {/*  /!* TODO *!/*/}
                {/*  <Moment format="h:mm A">*/}
                {/*    {data.date +*/}
                {/*    " " +*/}
                {/*    data.from}*/}
                {/*  </Moment>{" "}*/}
                {/*  -{" "}*/}
                {/*  <Moment format="h:mm A" add={{ hours: 1 }}>*/}
                {/*    {data.date + " " + data.to}*/}
                {/*  </Moment>*/}
                {/*</p>*/}
                <div className={timeIsEdited ? classes.lineThrough : ''}>
                  <p>
                    <Moment format="h:mm A">
                      {data.date + " " + data.from}
                    </Moment>{" "}
                    -{" "}
                    <Moment add={{hours: 1}} format="h:mm A">
                      {data.date + " " + data.to}
                    </Moment>
                  </p>
                </div>
                {
                  timeIsEdited && <div className={classes.editedTime}>
                    <p>
                      <Moment format="h:mm A">
                        {(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.from || data.from)}
                      </Moment>{" "}
                      -{" "}
                      <Moment add={{hours: 1}} format='h:mm A'>
                        {(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.to || data.to)}
                      </Moment>
                    </p>
                  </div>
                }
                {/*<p>*/}
                {/*  Adults: {data.adult_guests}, Children:{" "}*/}
                {/*  {data.children_guests}, Infants:{" "}*/}
                {/*  {data.infant_guests}*/}
                {/*</p>*/}
                {
                  !guestsIsEdited ? <p>
                    Adults: {data.adult_guests}, Children:{" "}
                    {data.children_guests}, Infants:{" "}
                    {data.infant_guests}
                  </p> : <div className={classes.editedGuests}>
                    <p>
                      {
                        HelperService.isNumber(data.edited_fields.adult_guests) ?
                          <span className='item edited'>
                            <span className='line-through'>{data.adult_guests}</span>
                            <span className='blue'> {data.edited_fields.adult_guests}</span>
                            <span> Adults, </span>
                          </span> : <span className='item'>
                            <span className='gray'>{data.adult_guests}</span> Adults,
                          </span>
                      }
                      {
                        HelperService.isNumber(data.edited_fields.children_guests) ?
                          <span className='item edited'>
                            <span className='line-through'>{data.children_guests}</span>
                            <span className='blue'> {data.edited_fields.children_guests}</span>
                            <span> Children, </span>
                          </span> : <span className='item'>
                            <span className='gray'>{data.children_guests}</span> Children,
                          </span>
                      }
                      {
                        HelperService.isNumber(data.edited_fields.infant_guests) ?
                          <span className='item edited'>
                            <span className='line-through'>{data.infant_guests} </span>
                            <span className='blue'> {data.edited_fields.infant_guests}</span>
                            <span> Infants, </span>
                          </span> : <span className='item'>
                            <span className='gray'>{data.infant_guests}</span> Infants,
                          </span>
                      }
                    </p>
                  </div>
                }
                <p>{data.reason_for_booking}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </div>
      <DialogContent className={classes.calenderManegemetPop}>
        <DialogContentText id="alert-dialog-description">
          {this.state.showReasonDropDown && <div className={classes.selectContainer}>
            <Typography variant='h5' className={classes.dropDownTitle}>
              Let us know the reason for declining in order to help us improve our platform
            </Typography>
            <Select
              className={classes.selectDeclineReason}
              value={this.state[`${statusChange}Reason`]}
              onChange={this.onSelectDeclineReason.bind(null, statusChange)}
              displayEmpty
            >
              <MenuItem value=''>Select</MenuItem>
              {
                (statusChange === 'cancel' ? HOST_CANCEL_CONFIRMED_REASONS : HOST_DECLINE_REASONS).map((reason, index) => {
                  return (
                    <MenuItem value={reason} key={`reason-${index}`}>{reason}</MenuItem>
                  )
                })
              }
            </Select>
            {this.state[`${statusChange}Reason`].match(/Other/) && <div className={classes.formInputBox}>
              <TextField
                type='text'
                name='email'
                margin='normal'
                variant='outlined'
                onInput={(e) => { e.target.value = e.target.value.slice(0, 140) }}
                value={this.state.otherReason}
                onChange={this.onSelectDeclineReason.bind(null, 'other')}
                rowsMax={4}
                rows={4}
                fullWidth
                multiline
                placeholder='Cancellation Reason (min 10 characters)'
              />
            </div>}
          </div>}
          <div className={classes.popupButtons}>
            <Button
              className={classes.mainButton}
              disabled={this.checkOnSubmit(statusChange)}
              onClick={() => {
                if (statusChange === 'approve' || statusChange === 'approveChanges') {
                  this.changeBookingStatus(data.id, statusChange)
                } else {
                  this.openCancelChatMessagePopup()
                }
              }}
            >
              {buttonOneText}
            </Button>
            <Typography
              variant='button'
              className={classes.cancelBtn}
              onClick={this.closeStatusChangePopup}
            >
              {buttonTwoText}
            </Typography>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  }

  render() {
    const { classes } = this.props;
    let {
      loading,
      tabs,
      moreRecent,
      reservation,
      subTabs,
      userProfileDetails,
      singlePoolDetails,
      statusChange,
      sortBy,
      applicationCharge,
      stripe_id,
    } = this.state;
    reservation = _.reject(reservation, { user: null });
    reservation = _.reject(reservation, { user: "" });
    reservation = _.reject(reservation, { pool: null });
    reservation = _.reject(reservation, { pool: "" });
    reservation = _.filter(reservation, function(data) {
      if (data.status === 3 || data.status === 6) {
        let dateandtime = moment(data.date+' '+data.to).add('1','hours').format('MM/DD/YYYY h:mm A');
        if (
          ((moment().isBefore(moment(dateandtime)) || moment().isSame(moment(dateandtime))) &&
            (subTabs === "active" || subTabs === 'upcoming')) ||
          (((moment().isAfter(moment(dateandtime)) || data.status === 6)) &&
            subTabs === "completed")
        ) {
          return data;
        } else {
          return "";
        }
      } else {
        return data;
      }
    });

    const { buttonOneText, buttonTwoText } = this.getPopupText()

    let sortLable1 = "";
    let sortLable2 = "";
    let click1Value = "";
    let click2Value = "";
    if(sortBy === "reservation") {
      click1Value = "reservation";
      click2Value = "booking";
      sortLable1 = "Most recent requests";
      sortLable2 = "Reservation date";
    } else {
      click1Value = "booking";
      click2Value = "reservation";
      sortLable1 = "Reservation date";
      sortLable2 = "Most recent requests";
    }

    return (
      <Typography variant="body1" component="div">
        {loading === true ? <Pageloader loading={loading} /> : ""}
        <div className={classes.hostMaintabs}>
          <div className={classes.container + " " + classes.tabsChange}>
            <Tabs
              value={tabs}
              onChange={this.handleTabsChange}
              className={classes.tabsHosting}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                label="Hosting"
                className={tabs === 0 ? classes.activeTab : classes.defaultTab}
              />
              <Tab
                label="Swimming"
                className={tabs === 1 ? classes.activeTab : classes.defaultTab}
              />
            </Tabs>
          </div>
        </div>

        {tabs === 0 ? (
          this.state.showHostPlaceholder ?
            <HostPlaceholder /> : (
              <div>
                <div className={classes.container}>
                  <div className={classes.hostingPools}>
                    <Typography variant="h2">Manage Reservations</Typography>
                    <ul>
                      <li
                        className={subTabs === "active" ? classes.active : ""}
                        onClick={() => this.changeSubTabs("active")}
                      >
                        PENDING
                      </li>
                      <li
                        className={subTabs === "upcoming" ? classes.active : ""}
                        onClick={() => this.changeSubTabs("upcoming")}
                      >
                        UPCOMING
                      </li>
                      <li
                        className={subTabs === "completed" ? classes.active : ""}
                        onClick={() => this.changeSubTabs("completed")}
                      >
                        PAST
                      </li>
                      {subTabs === "active" || subTabs === 'upcoming' ? (
                        <li
                          className={
                            moreRecent === true
                              ? classes.mostRecent + " " + classes.activeMostRecent
                              : classes.mostRecent
                          }>
                          <ul>
                          <ListItem
                            className={classes.mostRecentItem}
                            onClick={e => this.handleMoreRecent(click1Value)}
                          >
                            <ListItemText primary={sortLable1} />
                          </ListItem>

                          <Collapse in={moreRecent}>
                            <List
                              component="div"
                              className={classes.reservationDate}
                              onClick={e => this.handleMoreRecent(click2Value)}
                            >
                              <ListItem>
                                <ListItemText primary={sortLable2} />
                              </ListItem>
                            </List>
                          </Collapse>
                          </ul>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                    {reservation.length !== 0 ? (
                      reservation.map((data, index) => {
                        const isEdited = (this.state.subTabs === 'active' || this.state.subTabs === 'upcoming') && HelperService.isEditedBooking(data)

                        let guestWantExtendBooking = false
                        let guestWantAddGuests = false
                        let guestWantReduceHours = false

                        const dateIsEdited = isEdited && data.edited_fields.date
                        const timeIsEdited = isEdited && (data.edited_fields.from || data.edited_fields.to)
                        const guestsIsEdited = isEdited && (
                          HelperService.isNumber(data.edited_fields.adult_guests)
                          || HelperService.isNumber(data.edited_fields.children_guests)
                          || HelperService.isNumber(data.edited_fields.infant_guests)
                        )

                        if (timeIsEdited) {
                          const prevFrom = FULL_TIME_ARRAY.find(item => item.time_insert === data.from).timeNumber
                          const prevTo = FULL_TIME_ARRAY.find(item => item.time_insert === data.to).timeNumber + 1

                          const prevTotalHours = prevTo - prevFrom

                          const newFrom = FULL_TIME_ARRAY.find(item => item.time_insert === (data.edited_fields.from || data.from)).timeNumber
                          const newTo = FULL_TIME_ARRAY.find(item => item.time_insert === (data.edited_fields.to || data.to)).timeNumber + 1

                          const newTotalHours = newTo - newFrom

                          guestWantExtendBooking = newTotalHours > prevTotalHours
                          guestWantReduceHours = newTotalHours < prevTotalHours
                        }

                        if (guestsIsEdited) {
                          const prevGuestsCount = data.adult_guests + data.children_guests + data.infant_guests
                          const editedAdultGuests = HelperService.isNumber(data.edited_fields.adult_guests) ?
                            data.edited_fields.adult_guests : data.adult_guests
                          const editedChildrenGuests = HelperService.isNumber(data.edited_fields.children_guests) ?
                            data.edited_fields.children_guests : data.children_guests
                          const editedInfantGuests = HelperService.isNumber(data.edited_fields.infant_guests) ?
                            data.edited_fields.infant_guests : data.infant_guests
                          const editedGuestsCount = editedAdultGuests + editedChildrenGuests + editedInfantGuests
                          guestWantAddGuests = editedGuestsCount > prevGuestsCount
                        }

                        let totalamount = 0;
                        // let payment = _.filter(data.payment, { payment_mode: true});
                        // payment = _.filter(data.payment, {refund:false });
                        // if(payment.length > 0) {
                        //   totalamount = payment[0].transfer_host_amount;
                        // } else {
                        totalamount = data.reservation_price;
                        totalamount =
                          totalamount -
                          (totalamount / 100) *
                          parseFloat(applicationCharge).toFixed(2);
                        // }
                        totalamount = isEdited && data.edited_fields.host_can_earn ? data.edited_fields.host_can_earn : totalamount

                        const currentDate = moment()
                        const confirmedAt = data.confirmed_at ? moment(data.confirmed_at) : currentDate
                        const diff = Math.round(moment.duration(currentDate.diff(confirmedAt)).asHours())
                        const showCancelButton = diff < 12

                        let cancelledInCancellationPolicy = false
                        if (data.status === 5) {
                          const from = OBJECT_TIME_ARRAY.time_insert[data.from].timeNumber
                          const startBookingDate = moment(data.date).hour(from)
                          const cancellationPolicyDate = moment(startBookingDate).subtract(data.pool.cancellation_policy.hours, 'hours')
                          const cancelledAt = moment(data.cancelled_at)

                          if (cancelledAt.isAfter(cancellationPolicyDate)) {
                            cancelledInCancellationPolicy = true
                          }
                        }

                        const allowDeleteItem = data && data.status && ( data.status === 2 || data.status === 5 || data.status === 6) 
                        return (
                          <div className={classes.listBoxHost} key={index}>
                            <div className={classes.listBoxHostLeft}>
                              <Avatar
                                src={(data && data.user && data.user.img_url) || window.location.origin + '/img/profile-icon.png'}
                                alt='Avatar'
                                user={data && data.user}
                              />
                            </div>
                            <div className={classes.listBoxHostMiddle}>
                              <div className={classes.sectionWithStatus}>

                                <Typography variant="h4">
                                  {data.user.firstname}
                                  {data.user.lastname !== undefined && data.user.lastname !== null && data.user.lastname !== '' ? (' '+data.user.lastname.charAt(0).toUpperCase()):''}.
                                </Typography>

                                <div className={classes.listBoxHostRight}>
                                  {
                                    (data.status === 0 || isEdited)
                                      ? <Typography
                                        className={classes.pendingBtn}
                                        variant="button"
                                      >
                                        Pending Approval
                                      </Typography>
                                      : null
                                  }
                                  {data.status === 1 && !isEdited && (
                                    <Typography
                                      className={classes.approvedBtn}
                                      variant="button"
                                    >
                                      Awaiting Guest Confirmation
                                    </Typography>
                                  )}
                                  {data.status === 2 && !isEdited && (
                                    <Typography
                                      className={classes.declinedBtn}
                                      variant="button"
                                    >
                                      Declined
                                    </Typography>
                                  )}
                                  {data.status === 3
                                  && !isEdited 
                                  && !this.dateWasBeforeOrEqualNow(data.date, data.to) && (
                                    <Typography
                                      className={classes.approvedBtn}
                                      variant="button"
                                    >
                                      Confirmed
                                    </Typography>
                                  )}
                                  {data.status === 4 && !isEdited && (
                                    <Typography
                                      className={classes.declinedBtn}
                                      variant="button"
                                    >
                                      Payment Failed
                                    </Typography>
                                  )}
                                  {data.status === 5 && !isEdited && (
                                    <Typography
                                      className={classes.declinedBtn}
                                      variant="button"
                                    >
                                      Cancelled
                                    </Typography>
                                  )}
                                  {( (data.status === 3 
                                  && !isEdited
                                  && this.dateWasBeforeOrEqualNow(data.date, data.to) ) || data.status === 6) && (
                                    <Typography
                                      className={classes.confirmedBtn}
                                      variant="button"
                                    >
                                      Completed
                                    </Typography>
                                  )}
                                </div>

                                {allowDeleteItem
                                  ? <button
                                    className={classes.deleteBtn}
                                    onClick={() => this.handleBookingId(data.id)}>
                                      <img
                                      src={window.location.origin + "/img/icons/close.png"}
                                      style={{ width: 18, height: 18 }}
                                      alt=''
                                    />
                                  </button>
                                  : null}
                              </div>
                              {(data.user.rating !== null && data.user.rating !== '' && data.user.rating !== 0)?(
                                <span className={classes.ratingStar}>

                            <StarRatings
                              rating={
                                data.user.rating === null ||
                                data.user.rating === ""
                                  ? 0
                                  : data.user.rating
                              }
                              numberOfStars={5}
                              name="rating"
                              starRatedColor="#00ade2"
                              starDimension="20px"
                              starSpacing="1px"
                            />
                          </span>
                              ):<span className={classes.emptyRatingStar}></span>}

                              {
                                isEdited && <div className={classes.reservationChangesContainer}>
                                  {
                                    guestWantExtendBooking &&
                                    <p className='date'>Guest wants to extend booking</p>
                                  }
                                  {
                                    guestWantAddGuests &&
                                    <p className='guests'>Guest wants to add guests</p>
                                  }
                                  {
                                    guestWantReduceHours &&
                                    <p className='guests'>Guest wants reduce hours</p>
                                  }
                                </div>
                              }

                              <label
                                onClick={e =>
                                  this.viewUserProfile(data, index)
                                }
                              >
                                View Profile
                              </label>
                              <label onClick={() => this.sendMessage(data.user.id, data.id)}>
                                Send a Message
                              </label>
                              <div className={classes.reservationInfo}>
                                <Typography
                                  className={classes.headingTop}
                                >
                                  {data.pool.title}
                                </Typography>
                                <div className={dateIsEdited ? classes.lineThrough : ''}>
                                  <p>
                                    <Moment format="MMMM DD, YYYY">{data.date}</Moment>
                                  </p>
                                </div>
                                {
                                  dateIsEdited && <div className={classes.editedTime}>
                                    <p>
                                      <Moment format="MMMM DD, YYYY">{data.edited_fields.date}</Moment>
                                    </p>
                                  </div>
                                }
                                <div className={timeIsEdited ? classes.lineThrough : ''}>
                                  <p>
                                    <Moment format="h:mm A">
                                      {data.date + " " + data.from}
                                    </Moment>{" "}
                                    -{" "}
                                    <Moment add={{hours: 1}} format="h:mm A">
                                      {data.date + " " + data.to}
                                    </Moment>
                                  </p>
                                </div>
                                {
                                  timeIsEdited && <div className={classes.editedTime}>
                                    <p>
                                      <Moment format="h:mm A">
                                        {(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.from || data.from)}
                                      </Moment>{" "}
                                      -{" "}
                                      <Moment add={{hours: 1}} format='h:mm A'>
                                        {(data.edited_fields.date || data.date) + ' ' + (data.edited_fields.to || data.to)}
                                      </Moment>
                                    </p>
                                  </div>
                                }
                                {
                                  !guestsIsEdited ? <p>
                                    Adults: {data.adult_guests}, Children:{" "}
                                    {data.children_guests}, Infants:{" "}
                                    {data.infant_guests}
                                  </p> : <div className={classes.editedGuests}>
                                    <p>
                                      {
                                        data.edited_fields.adult_guests ? <span className='item edited'>
                                        <span className='line-through'>{data.adult_guests}</span>
                                        <span className='blue'> {data.edited_fields.adult_guests}</span>
                                        <span> Adults, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{data.adult_guests}</span> Adults,
                                      </span>
                                      }
                                      {
                                        data.edited_fields.children_guests ? <span className='item edited'>
                                        <span className='line-through'>{data.children_guests}</span>
                                        <span className='blue'> {data.edited_fields.children_guests}</span>
                                        <span> Children, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{data.children_guests}</span> Children,
                                      </span>
                                      }
                                      {
                                        data.edited_fields.infant_guests ? <span className='item edited'>
                                        <span className='line-through'>{data.infant_guests} </span>
                                        <span className='blue'> {data.edited_fields.infant_guests}</span>
                                        <span> Infants, </span>
                                      </span> : <span className='item'>
                                        <span className='gray'>{data.infant_guests}</span> Infants,
                                      </span>
                                      }
                                    </p>
                                  </div>
                                }

                                {data.reason_for_booking && <p>{data.reason_for_booking}</p>}
                              </div>
                              <div className={classes.bottomBox}>
                                {
                                  isEdited ? <div className={classes.buttonsContainer}>
                                    <p>
                                      This update will you earn:
                                      <strong className={classes.blue}>
                                        &nbsp;${parseFloat(totalamount).toFixed(2)}
                                      </strong>
                                    </p>
                                    <div className='flex'>
                                      <Typography
                                        variant='button'
                                        onClick={this.changeReservationStatus.bind(this, data, 'approveChanges')}
                                      >
                                        Approve change
                                      </Typography>
                                      <Typography
                                        className='decline-button'
                                        variant='button'
                                        onClick={this.changeReservationStatus.bind(this, data, 'declineChanges')}
                                      >
                                        Decline change
                                      </Typography>
                                    </div>
                                  </div> : <>
                                    {data.status !== 5 || cancelledInCancellationPolicy ? (
                                      <p>
                                        {(data.status === 3 || cancelledInCancellationPolicy) &&
                                        this.dateWasBeforeOrEqualNow(data.date, data.to)
                                          ? "You Earned:" : 'You Could Earn: '}
                                        <strong className={classes.blue}>
                                          &nbsp;${parseFloat(totalamount).toFixed(2)}
                                        </strong>
                                      </p>
                                    ) : (
                                      ""
                                    )}

                                    {showCancelButton && (data.status === 1 ||
                                      (data.status === 3 &&
                                        !this.dateWasBeforeOrEqualNow(data.date, data.to))) && (
                                      <label
                                        onClick={e =>
                                          this.changeReservationStatus(data, "cancel")
                                        }
                                      >
                                        CANCEL RESERVATION
                                      </label>
                                    )}

                                    {(data.status === 3 || data.status === 6) &&
                                    new Date().setHours(0, 0, 0, 0) >
                                    new Date(data.date) && data.host_review === false &&  (
                                      <label
                                        onClick={this.redirectToReviews.bind(
                                          this,
                                          data
                                        )}
                                      >
                                        RATE THIS SWIMMER
                                      </label>
                                    )}

                                    {data.status === 0 ?
                                      <div>
                                        <Typography
                                          variant="button"
                                          onClick={e =>
                                            this.changeReservationStatus(
                                              data,
                                              'approve'
                                            )
                                          }
                                        >
                                          Approve
                                        </Typography>
                                        <Typography
                                          variant="button"
                                          onClick={e =>
                                            this.changeReservationStatus(
                                              data,
                                              'decline'
                                            )
                                          }
                                        >
                                          Decline
                                        </Typography>
                                      </div> : null}
                                  </>
                                }
                              </div>

                              {(data.status === 4 && (stripe_id === null || stripe_id === '')) ?
                                <div className={classes.cancelPolicyText}>
                                  Your payout failed to process. Please fix your payout information to receive funds for this booking.
                                </div> : ""}
                              {(data.status === 4 && (stripe_id === null || stripe_id === '')) ?
                                <div className={classes.bluecolorTwo} onClick={this.redirectToStripe}>
                                  <Typography variant="button">
                                    Update payout method
                                  </Typography>
                                  <p>For bussines site link put swimply.com</p>
                                </div> : ""}

                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <Typography variant="h6" color="inherit">
                        <div className={classes.noMessages}>
                          <figure>
                            <img src="/img/perfect-day.png" alt="" />
                          </figure>
                          {subTabs === "active" || subTabs === 'upcoming' ? (
                            <p>
                              {`You don't have any ${subTabs === "active" ? 'pending' : 'upcoming'} reservations or reservation
                              requests.`}
                            </p>
                          ) : (
                            <p>You don't have any completed reservations.</p>
                          )}
                        </div>
                      </Typography>
                    )}
                  </div>
                </div>
                <Dialog
                  open={this.state.showAlert}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className={classes.deletePopup}
                >
                  <DialogContent>
                    <Typography variant='h3' className={classes.cancelPopupTitle}>
                      {
                        statusChange === 'cancel' ?
                          `Are you sure you would to cancel on ${singlePoolDetails.guestName} confirmed booking?`
                          : statusChange === 'declineChanges' ?
                          `Are you sure you want to decline ${singlePoolDetails.guestName} change request?`
                          : `Are you sure you want to decline ${singlePoolDetails.guestName} request?`
                      }
                    </Typography>
                    <DialogContentText id="alert-dialog-description">
                      {
                        statusChange === 'cancel' ?
                          `You will lose your ${singlePoolDetails.totalAmount} and may face additional fees as per ${IS_SHVIMPLY ? 'Shvimply' : 'Swimply'}'s terms of use. Canceling too many approved requests may eventually result in removal from the platform.`
                          : `Declining too many requests may reduce yours pool's popularity and appearance in search results.`
                      }
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Typography variant="button" onClick={this.handleDeclineReasonPopup.bind(null, true)} autoFocus>
                      yes
                    </Typography>
                    <Typography variant="button" onClick={this.closePopup}>
                      no
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

                {this.renderStatusChangePopup()}
                <Dialog
                  className={classes.calenderManegemetPopMain}
                  open={this.state.showCancelChatMessagePopup}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      <p>Last step! Send the Guest a quick message</p>
                      <div className={classes.blueBox}>
                        <p>
                          Here you may explain to the guest <br /> why will be declining the request
                        </p>
                      </div>
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
                        className={classes.mainButton}
                        disabled={this.disableCancelChatButton()}
                        onClick={this.changeBookingStatus.bind(null, singlePoolDetails.id, statusChange)}
                      >
                        {buttonOneText}
                      </Button>
                      <Typography
                        variant='button'
                        className={classes.cancelBtn}
                        onClick={this.closeStatusChangePopup}
                      >
                        {buttonTwoText}
                      </Typography>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog
                  className={classes.hostReservationPopMain}
                  open={this.state.viewProfile}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent className={classes.hostReservationPop}>
                    <DialogContentText id="alert-dialog-description">
                      <div>
                        {userProfileDetails.firstname !== undefined ? (
                          <div>
                            <div className={classes.profileSection}>
                              <img
                                onClick={this.closeProfilePopup}
                                className={classes.closeButton}
                                src="../img/close-button1.png"
                                alt=""
                              />

                              <Avatar
                                containerClass={classes.avatarContainer}
                                className={classes.viewProfileAvatar}
                                src={(userProfileDetails && userProfileDetails.img_url) || window.location.origin + '/img/profile-icon.png'}
                                alt='Avatar'
                                user={userProfileDetails}
                              />
                              <Typography variant="h4">
                                {userProfileDetails.firstname}
                                {userProfileDetails.lastname !== undefined && userProfileDetails.lastname !== null && userProfileDetails.lastname !== '' ? (' '+userProfileDetails.lastname.charAt(0).toUpperCase()):''}
                                .
                              </Typography>
                              {(userProfileDetails.rating !== null && userProfileDetails.rating  !== '' && userProfileDetails.rating !==0)?(
                                <span className={classes.ratingStar}>
                                <StarRatings
                                  rating={
                                    userProfileDetails.rating === null ||
                                    userProfileDetails.rating === ""
                                      ? 0
                                      : userProfileDetails.rating
                                  }
                                  numberOfStars={5}
                                  name="rating"
                                  starRatedColor="#00ade2"
                                  starDimension="20px"
                                  starSpacing="1px"
                                />
                              </span>
                              ):<span className={classes.emptyRatingStar}></span>}
                              <label
                                className={classes.cursorPointer+' '+classes.messageCenter}
                                onClick={() =>
                                  this.sendMessage(userProfileDetails.id)
                                }
                              >
                                Send a Message
                              </label>
                            </div>
                            {userProfileDetails.description !== null &&
                            userProfileDetails.description !== "" ? (
                              <div>
                                <div className={classes.hospPopContent}>
                                  <label>SWIMMER BIO</label>
                                  <p>{userProfileDetails.description}</p>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {userProfileDetails.id !== undefined &&
                            userProfileDetails.reviews.length !== 0 ? (
                              <div>
                                <div className={classes.reviewOtherHosts}>
                                  <h5>Reviews from other hosts</h5>
                                  {userProfileDetails.reviews.map((reviews, index) => {
                                    return (
                                      <div className={classes.commentGroup} key={index}>
                                        <label>
                                          {reviews.booking.pool.title} (
                                          <Moment format="M/D/YY">
                                            {reviews.booking.date}
                                          </Moment>
                                          )
                                        </label>
                                        <span className={classes.ratingStar}>
                                      <StarRatings
                                        rating={
                                          reviews.rating === null ||
                                          reviews.rating === ""
                                            ? 0
                                            : reviews.rating
                                        }
                                        numberOfStars={5}
                                        name="rating"
                                        starRatedColor="#00ade2"
                                        starDimension="20px"
                                        starSpacing="1px"
                                      />
                                    </span>
                                        <p>{reviews.comment}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>
              </div>
            )
        ) : (
          <div>
            <SwimmerReservation />
          </div>
        )}
      </Typography>
    );
  }
}
Results.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withApollo
);

function ResultsContainer (props) {
  const context = useContext(UserContext)
  const appContext = useContext(AppContext)
  return <Results {...context} {...appContext} {...props} />
}

export default enhance(ResultsContainer);
