import React, {useContext} from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import UserUtils from "../utilities/UserUtils";
import { loader } from "graphql.macro";
import moment from "moment-timezone";
import Pageloader from "./../commons/pageloader";
import _ from "lodash";
import cloneDeep from 'lodash/cloneDeep';
import BookingChatButton from "./booking-chat-button";
import { timeArray } from "../../config";
import * as commonFunctions from './../utilities/commonFunctions';
import UserContext from "../../contexts/UserContext";
import ChatContext from '../../contexts/ChatContext';
import Avatar from '../commons/avatar';
import AppContext from "../../contexts/AppContext";
import update from "immutability-helper";

const conversionListQuery = loader(
  "./../../graphql/messages/conversionListQuery.graphql"
);
const hostPoolQuery = loader("./../../graphql/host/hostpool.graphql");
const sendMessageMutation = loader(
  "./../../graphql/messages/sendMessageMutation.graphql"
);
const userDetailsQuery = loader(
  "./../../graphql/user/userDetailsQuery.graphql"
);

const myReservationsQuery = loader('./../../graphql/reservations/reservationdetailsQuery.graphql');

const checkUnreadMessageMutation = loader(
  "./../../graphql/messages/checkUnreadMessage.graphql"
);

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    ss: "%ss",
    m: "a minute",
    mm: "%dm",
    h: "an hour",
    hh: "%dh",
    d: "a day",
    dd: "%dd",
    M: "a month",
    MM: "%dM",
    y: "a year",
    yy: "%dY"
  }
});

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
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
      width: "calc(100% - 30px)",
      background: '#f2f2f2',
      minHeight: 'calc(100vh - 56px)'
    }
  },
  hostSmallText: {
    fontSize: 13,
    fontFamily: `'Poppins', sans-serif`,
  },
  bookingMessage: {
    flexDirection: 'column',
    backgroundColor: '#FBC531',
    padding: 10,
    display: 'flex',
    width: '100%',
    margin: '25px 0 0',
    justifyContent: 'center',
    borderRadius: 5,
    boxSizing: 'border-box',
    '&.pending, .approved': {
      background: '#f99f6c',
    },
    '&.declined': {
      background: '#f04d50',
    },
    '&.confirmed': {
      background: 'green',
    },
    '&.cancelled': {
      background: '#7b868c',
    },
    '&.empty': {
      backgroundColor: '#FBC531',
    },
    '@media (max-width:767px)': {
      position: 'fixed',
      top: 88,
      left: 0,
      zIndex: 6,
      borderRadius: 0,
    }
  },
  messagesBlock: {
    paddingTop: "35px",
    maxWidth: "600px",
    "& h2": {
      display: "inline-block"
    },
    "& h2 + span": {
      fontSize: "13px",
      fontWeight: "500",
      verticalAlign: "middle",
      paddingLeft: "0px",
      color: theme.palette.common.blue,
      textTransform: "uppercase",
      float: "right",
      marginTop: "8px",
      cursor: "pointer"
    },
    "@media (max-width:767px)": {
      paddingTop: "0",

    }
  },
  convertionBox: {
    width: "calc(100% - 30px)",
    maxWidth: "600px",
    minHeight: "300px",
    background: "#f5f7f6",
    borderRadius: "25px",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px 20px 10px",
    "@media (max-width:767px)": {
      width: "100%",
      margin: "0 -15px",
      borderRadius: "0",
      minHeight: " calc(100vh - 137px)",
      "& form": {
        position: "fixed",
        width: "100%",
        left: "0",
        bottom: "-10px"
      }
    },
    "& ul": {
      listStyle: "none",
      paddingLeft: "0",
      maxHeight: "300px",
      overflow: "auto",
      minHeight: "300px",
      "@media (max-width:767px)": {
        minHeight: "calc(100vh - 230px)",
        paddingTop: '120px',
      },
      "& > div:last-child": {
        paddingBottom: "70px",
        display: "table",
        width: "100%"
      },
      "& figure": {
        margin: "0 15px 0 0",
        width: "40px",
        height: "40px",

        "& img": {
          position: "absolute",
          bottom: "-25px",
          maxWidth: "40px",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          left: "10px",
          '@media (max-width:767px)': {
            left: '0',
            width: "40px",
            height: "40px",
          }
        }
      },
      "& li": {
        display: "flex",
        alignItems: "start",
        position: "relative",
        marginBottom: "45px",
        clear: "both",
        "& span": {
          display: "block",
          background: "#fff",
          width: "auto",
          padding: "15px",
          fontSize: "12px",
          maxWidth: "360px",
          borderRadius: "10px",
          boxShadow: "-1px 4px 9px 0px #ccc",
          position: "relative",
          minWidth: "200px",
          '@media (max-width:767px)': {
            minWidth: "calc(100% - 90px)",
            maxWidth: "calc(100vw - 125px)",

          },
          "& font": {
            position: "absolute",
            bottom: "-27px",
            left: "15px",
            color: theme.palette.common.black
          }
        }
      }
    }
  },
  divpullRight: {
    float: "right",
    '@media (max-width:767px)': {
      float: "none ",
    },
    "& figure": {
      margin: "0 0 0 20px !important",
      width: "60px",
      height: "60px",
      "& img": {
        left: "inherit !important",
        right: "16px",
        '@media (max-width:767px)': {
          right: "6px",
        }
      },

    },
    "& span": {
      background: "#22bfea !important",
      color: "#fff",
      "& font": {
        textAlign: "right",
        right: "15px"
      }
    }
  },
  arrowMessageleft: {
    content: "",
    position: "absolute",
    borderTop: "26px solid transparent",
    borderLeft: "25px solid transparent",
    borderRight: "25px solid #fff",
    left: "11px",
    bottom: "-11px",
    transform: " rotate(-44deg)"
  },
  arrowMessageRight: {
    content: "",
    position: "absolute",
    borderTop: "26px solid transparent",
    borderLeft: "25px solid #22bfea",
    borderRight: "25px solid transparent",
    right: "31px",
    bottom: "-12px",
    transform: " rotate(42deg)"
  },
  backButton: {
    color: theme.palette.common.blue,
    textTransform: "uppercase",
    fontWeight: "500",
    paddingBottom: "5px",
    cursor: "pointer",
    "& i": {
      fontSize: "18px",
      verticalAlign: "middle",
      paddingRight: "2px",
      marginTop: "-2px"
    },
    "@media (max-width:767px)": {
      position: "fixed",
      width: "15px",
      height: "20px",
      overflow: "hidden",
      marginTop: "16px",
      color: theme.palette.common.black,
      zIndex: 99,
      top: '55px',
      "& i": {
        fontSize: "20px"
      }
    }
  },
  chatBox: {
    position: "relative",
    width: "100%",
    display: "block",
    clear: "both",

    "& > div": {
      width: "100%",
      position: "relative",
      marginTop: "40px",
      "& > div": {
        "& fieldset": {
          borderColor: "transparent !important"
        }
      }
    },
    "& > div > div": {
      background: "#fff",
      padding: "18px 35px 18px 15px",
      fontSize: "13px",

    },

    "& img": {
      right: "9px",
      position: "absolute",
      fontSize: "20px",
      maxWidth: "40px",
      top: "30px",
      bottom: "0",
      margin: "auto",
      cursor: "pointer"
    }
  },
  seePools: {
    background: '#fff',

    "& h2": {
      marginBottom: "20px"
    },
    "& img": {
      width: "100%"
    },
    "& > div": {

      padding: "0",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 0 3px #ccc",
    },
    "@media (max-width:767px)": {
      background: '#f2f2f2',
      paddingTop: '55px',
      "& > div": {
        boxShadow: "none",
        marginBottom: "25px",
        borderRadius: '0'
      }
    }
  },
  seePoolsBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2 + span':{
        color: '#fff',
        padding: '6px 13px'
    }
  },
  seePoolsContent: {
    padding: "10px 20px 20px",
    "& div:first-child": {
      fontSize: "20px",
      marginBottom: "0",
      color: theme.palette.common.black,
      fontWeight: "500",
      cursor: "pointer"
    },
    "& div:nth-child(2)": {
      marginBottom: "20px",
      marginTop: "2px"
    },
    "& span": {
      display: "inline-block",
      padding: "8px 35px",
      fontWeight: "500"
    },
    "& > span": {
      display: "inline-block",
      padding: "8px 0px",
      fontWeight: "500"
    },
    "@media (max-width:767px)": {
      paddingLeft: '0',
      "& div:nth-child(2)": {
        marginBottom: '0',
      },
      "& > span": {
        paddingBottom: '0'
      }
    }
  },
  poolImage: {
    cursor: "pointer"
  },
  requestedBookingLine: {
    textAlign: "center",
    width: "calc(100% - 40px)",
    clear: "both",
    display: "table",
    background: "url(../img/line.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      background: "#f7f8f7",
      padding: "10px 15px",
      fontSize: "12px",
      textTransform: "uppercase"
    },
    '@media (max-width:767px)': {
      width: "calc(100% - 0px)",
      "& span": {
        fontSize: "10px",
      }

    }
  },
  topHeaderChat: {
    boxShadow: 'none !important',
    "@media (max-width:767px)": {
      background: " #fff",
      margin: "0 -15px",
      padding: " 17px 15px 15px 8px !important",
      boxShadow: " 0 0 3px #ccc",
      borderRadius: "0 !important",
      borderBottom: ' 2px solid #dadcdb',
      position: 'fixed',
      width: 'calc(100% - 23px)',
      zIndex: '9',
      top: '55px',
      "& h2": {
        fontSize: "16px",
        paddingLeft: "23px",
        marginBottom: "0"
      },
      "& h2 + span": {
        marginTop: "0"
      }
    }
  },
  seepollsBoxNew: {
    marginBottom: '25px',
    "@media (max-width:767px)": {
      marginTop: "25px"
    }
  },
  seeReservationButton: {
    display: 'inline-block',
    margin: '0',
    fontSize: '16px',
    color: theme.palette.common.blue,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.9',
    }
  },
  errorMessageContainer: {
    marginTop: '5px',
    position: 'relative',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .close': {
      position: 'absolute',
      top: '2px',
      right: '3px',
      display: 'inline-block',
      padding: '2px 10px',
      fontSize: '18px',
      color: theme.palette.error.light,
      cursor: 'pointer'
    },
    '& .message': {
      width: '100%',
      maxWidth: '100%',
      padding: '15px 20px 15px 15px',
    }
  },
  avatarContainer: {
    position: 'relative',
    bottom: '-40px',
    maxWidth: '40px',
    '&.margin-right': {
      margin: '0 10px 0 0',
    },
    '&.margin-left': {
      margin: '0 20px 0 10px',
    }
  },
  avatar: {
    width: '35px',
    height: '35px',
  },
  typingLabel: {
    color: '#90979e',
    position: 'absolute',
    padding: '0 20px',
    fontStyle: 'italic',
    fontSize: 14,
    fontFamily: `'Poppins', sans-serif`,
  },
  breakWord: {
    overflowWrap: 'break-word',
  }
});

class ConvertionList extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    const {
      receiverId = '',
      receiverFirstName = '',
      receiverLastName = '',
      senderId = null,
      receiverAvatar = '',
      senderAvatar = '',
      senderVerifications = [],
      receiverVerifications = []
    } = this.props.chatDetails || {}
    this.state = {
      conversationList: [],
      message: "",
      receiverId,
      receiverDetails: {
        firstname: receiverFirstName,
        lastname: receiverLastName,
        img_url: receiverAvatar,
        verifications: receiverVerifications
      },
      senderDetails: {
        id: senderId,
        img_url: senderAvatar,
        verifications: senderVerifications
      },
      seePoolStatus: false,
      hostPoolList: [],
      loading: false,
      requestedBooking: false,
      lastName: ' ' + receiverLastName.charAt(0).toUpperCase(),
      chatDetails: null,
      isDefaultInstantBooking:  false,
      user: null,
      communicatorIsTyping: false,
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.redirectToMessages = this.redirectToMessages.bind(this);
    this.handleSeePool = this.handleSeePool.bind(this);
    this.handleHidePool = this.handleHidePool.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleNewReservation = this.handleNewReservation.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

    this.channel = '';
    this.whisperChannel = null;
    this.reservationChannel = '';
    this.reservationChannelHost = '';
    this.cancelTypingTimer = null;
  }

  /**
   * @param {*} event
   */

  componentWillMount() {
    // get previosly saved messages to show them while loading real chat
    let latestChats = UserUtils.getLatestChats()
    let chatIndex = latestChats.findIndex((chat) => chat.receiverId.toString() === this.state.receiverId.toString())
    if (chatIndex !== -1 && latestChats[chatIndex].messages.length) {
      this.setState({
        conversationList: latestChats[chatIndex].messages,
        loading: false
      }, () => {
        const messages = document.getElementById("messages");
        this.scrollToBottom(messages);
      })
    } else {
      this.setState({
        loading: true
      })
    }
  }
  
  componentDidMount() {
    this.handleChatRules()
    let accessToken = UserUtils.getAccessToken();
    let { history } = this.props;
    if (accessToken !== null && accessToken !== "") {
      let receiverId = UserUtils.getMessageReceiverId();
      if (receiverId !== null && receiverId !== "" && this.props.user) {
        this.setState({
          receiverId
        })
        this.readMessage(receiverId)
        let backBtnlink = UserUtils.getBackBtnLink();
        if (backBtnlink === 'pool-details') {
          this.props.client
            .query({
              query: userDetailsQuery,
              variables: {
                id: parseInt(receiverId)
              },
              fetchPolicy: "network-only"
            })
            .then(res => {
              if (res.data.user.lastname !== undefined && res.data.user.lastname !== null && res.data.user.lastname !== '') {
                res.data.user.lastname = ' ' + res.data.user.lastname.charAt(0)
                  .toUpperCase()
              } else {
                res.data.user.lastname = '.'
              }

              this.setState({
                receiverDetails: res.data.user,
                lastName: res.data.user.lastname,
                loading: false
              });
            })
            .catch(error => {
              this.setState({ loading: false });
            });

          UserUtils.removeBackBtnLink();
          this.handleSeePool();
        } else {
          this.renderCovertions(receiverId)
            .then(room_id => {
              this.channel = `room.${room_id}`
              this.whisperChannel = this.props.echo.join( this.channel )
              console.log('Chat room', this.channel)
              this.props.echo.join(this.channel)
                .here(user => {
                  console.log('here', user)
                })
                .joining(user => {
                  console.log('joining', user)
                })
                .leaving(user => {
                  console.log('leaving', user)
                })
                .listen('.message.created', (e) => {
                  this.handleNewMessage(e)
                })
                .listenForWhisper('typing', (e) => {
                  if (!this.state.communicatorIsTyping) {
                    this.setState({
                      communicatorIsTyping: true
                    })
                  }
                  clearTimeout(this.cancelTypingTimer)
                  this.cancelTypingTimer = setTimeout(() => {
                    this.setState({
                      communicatorIsTyping: false
                    });
                  }, 700);
                });
        
              this.reservationChannel = `reservation.${this.props.user.id}`
              this.props.echo.private(this.reservationChannel)
                .listen('.booking.created', (e) => {
                  this.handleNewReservation(e)
                })
                .listen('.booking.updated', (e) => {
                  this.handleStatusChange(e)
                });
              this.reservationChannelHost = `reservation.${this.props.user.id}`
              this.props.echo.private(this.reservationChannelHost)
                .listen('.booking.created.host', (e) => {
                  this.handleNewReservation(e)
                })
                .listen('.booking.updated.host', (e) => {
                  this.handleStatusChange(e)
                });
            })
        }
      } else {
        history.push("/messages");
      }
    } else {
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setPreviousSearchUrl(this.props.location.search);
      UserUtils.setIsPreviousUrl('yes');  
      history.push("/");
    }
  }

  componentDidUpdate (prevProps) {
    if (!this.state.user && (this.props.user !== prevProps.user)) {
      this.handleChatRules()
    }
  }

  componentWillUnmount() {
    // save 10 latest messages to show next time user will enter the chat instead of showing spinner while loading messages 
    let latestChats = UserUtils.getLatestChats()
    let currentChat = _.cloneDeep(this.state.conversationList)
    let lastTenMessages = currentChat.splice(0, 10)
    let chatToSave = {
      messages: lastTenMessages,
      receiverId: this.state.receiverId
    }

    let chatAlreadypresentIndex = latestChats.findIndex((chat) => chat.receiverId === this.state.receiverId)

    if (latestChats.length >= 10) {
      latestChats.pop()
    }

    if (chatAlreadypresentIndex !== -1) {
      latestChats.splice(chatAlreadypresentIndex, 1)
    }

    latestChats.unshift(chatToSave)
    UserUtils.setLatestChats(latestChats)

    clearTimeout(this.cancelTypingTimer)

    if (this.props.echo) {
      this.props.echo.leave( this.channel );
      this.props.echo.leave( this.reservationChannel );
      this.props.echo.leave( this.reservationChannelHost );
    }
  }

  readMessage = (receiverId) => {
    this.props.client
      .mutate({
        mutation: checkUnreadMessageMutation,
        variables: {
          reciever_id: receiverId
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.readMessage(receiverId)
          }
        }
      });
  }

  handleNewMessage (e) {
    console.log('new message', e)
    e.message.id = e.message.id.toString();
    e.message.reciever_id = e.message.reciever_id.toString();
    e.message.sender_id = e.message.sender_id.toString();

    // delete placeholder message to replace it with real one
    if (this.state.conversationList[0].id === 'temporary') {
      this.setState({
        conversationList: update( this.state.conversationList, {
          $splice: [[0, 1]]
        } )
      })
    }

    this.setState( {
      conversationList: update( this.state.conversationList, {
        $unshift: [e.message],
      }, () => {
        const messages = document.getElementById("messages");
        this.scrollToBottom(messages);
      } ),
    } );
  }

  handleNewReservation (reservation) {
    console.log('new reservation', reservation)
    if (reservation.user.id.toString() === this.state.chatDetails.conversation_with.id
      || this.props.user.id === this.state.chatDetails.conversation_with.id) {
      reservation.booking_status = reservation.status;
      this.setState( { chatDetails: update( this.state.chatDetails, {
          last_booking: { $set: reservation }
        } )
      } )
    }
  }

  handleStatusChange (reservation) {
    console.log('new status', reservation)
    if (reservation.booking_id) {
      reservation.booking = reservation.booking_id
    }
    if (this.state.chatDetails.last_booking && reservation.booking === this.state.chatDetails.last_booking.id) {
      this.setState( { chatDetails: update( this.state.chatDetails, {
          last_booking: {
            booking_status: { $set: reservation.status }
          }
        } )
      } )
    }
  }

  handleChatRules = () => {
    if (this.props.user && !this.props.user.accept_chat_rules) {
      this.setState({
        user: this.props.user
      }, () => {
        this.props.history.replace({
          pathname: '/chat-rules',
          state: {
            replaceTo: this.props.location.pathname
          }
        })
      })
    }
  }

  async renderCovertions (receiverId) {
    this.setState({
      loading: true,
      receiverId: receiverId
    });
    return this.props.client
      .query({
        query: conversionListQuery,
        variables: {
          data: {
            reciever_id: parseInt(receiverId),
          },
          time_zone: moment.tz.guess()
        },
        fetchPolicy: "network-only"
      })
      .then(async ({ data: { chatDetailsUpdate: data }}) => {
        let conversationWithLastName

        if (data.conversation_with.lastname !== undefined && data.conversation_with.lastname !== null && data.conversation_with.lastname !== '') {
          conversationWithLastName = ' ' + data.conversation_with.lastname.charAt(0)
            .toUpperCase()
        } else {
          conversationWithLastName = '.'
        }

        const bookingId = this.props.location.state && this.props.location.state.bookingId

        if (bookingId) {
          const { data: { reservationDetails: booking }} = await this.props.client.query({
            query: myReservationsQuery,
            variables: { id: bookingId },
            fetchPolicy:'no-cache',
          })
          data.last_booking = booking
          data.last_booking.booking_status = booking.status
        }

        this.setState({
          conversationList: data.messages.slice().reverse(),
          receiverDetails: data.conversation_with,
          lastName: conversationWithLastName,
          requestedBooking: data.requested_booking,
          is_host: data.is_host,
          senderDetails: data.sender_info,
          loading: false,
          chatDetails: data,
        }, () => {
          const messages = document.getElementById("messages");
          this.scrollToBottom(messages);
          const { chatDetails } = this.state
          if (chatDetails.last_booking) {
            const questsCount = chatDetails.last_booking.adult_guests + chatDetails.last_booking.children_guests
            const isDefaultInstantBooking = chatDetails.last_booking.pool.default_instant_booking
              && (chatDetails.last_booking.pool.instant_group_size >= questsCount)
              && (chatDetails.last_booking.pool.max_guests >= questsCount)
            this.setState({
              isDefaultInstantBooking
            })
          }
        });
        return data.room_id
      })
      .catch(async (error) => {
        this.setState({ loading: false });
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.renderCovertions(receiverId)
          }
        }
      });
  }

  handleMessage(e) {
    if (this.whisperChannel && !this.waitForTimeout) {
      let timer = null
      this.waitForTimeout = true
      this.whisperChannel.whisper('typing', {
        user: this.state.senderDetails.id,
      })
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.waitForTimeout = false
      }, 200)
    }

    this.setState({ message: e.target.value })
  }

  sendMessage(e) {
    let { message, receiverId } = this.state;
    e.preventDefault();
    if (message !== "") {
      // append fake message while sending and receiving requests
      this.setState( {
        message: '',
        conversationList: update( this.state.conversationList, {
          $unshift: [{
            message: message,
            id: 'temporary',
            sender_id: this.state.senderDetails.id,
            reciever_id: receiverId
          }],
        } ),
      }, () => {
        const messages = document.getElementById("messages");
        this.scrollToBottom(messages);
      } )

      let data = {
        reciever_id: parseInt(receiverId),
        message: message
      };
      this.setState({ loading: true });
      this.props.client
        .mutate({
          mutation: sendMessageMutation,
          variables: {
            data: data
          }
        })
        .then(res => {
          this.renderCovertions(receiverId);
          this.setState({
            loading: false,
            message: ""
          });
        })
        .catch(error => {
          let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
          this.setState({
            loginFailError: errorMsg,
            loading: false
          });
        });
      // const messages = document.getElementById("messages");
      // this.scrollToBottom(messages);
    }
  }

  scrollToBottom(messages) {
    messages.scrollTop = messages.scrollHeight;
  }

  redirectToMessages() {
    this.props.echo.leave(this.channel);
    this.props.echo.leave( this.reservationChannel );
    this.props.echo.leave( this.reservationChannelHost );
    let { history } = this.props;
    let backBtnlink = UserUtils.getBackBtnLink();
    let link = 'messages';
    if (backBtnlink === 'reservation') {
      if (UserUtils.getUserRole() === 'Host') {
				link = "/host-reservation";
			} else {
				link = "/my-reservation";
			}
    } else if (backBtnlink === 'pool-details-long') {
      let poolId = UserUtils.getPoolId()
      if (poolId.length > 0) {
        link = "/pooldetails/" + poolId;
      } else {
        link = 'messages';
      }
    } else if (typeof backBtnlink === 'string' && backBtnlink.match(/contact-host/)) {
      link = backBtnlink;
    }
    UserUtils.removeBackBtnLink();
    history.push(link);
  }

  handleSeePool() {
    let receiverId = UserUtils.getMessageReceiverId();
    this.setState({
      loading: true,
      seePoolStatus: true
    });
    this.props.client
      .query({
        query: hostPoolQuery,
        variables: {
          host_id: parseInt(receiverId)
        },
        fetchPolicy: "network-only"
      })
      .then(res => {
        if(res.data.hostPools.length === 1) {
          let { history } = this.props;
          let poolId = res.data.hostPools[0].id;
          history.push("/payment/"+poolId)
        } else {
          this.setState({
            hostPoolList: res.data.hostPools,
            loading: false
          });
        }
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.handleSeePool()
          }
        }
      });
  }

  handleHidePool() {
    this.setState({ seePoolStatus: false });
  }

  redirectToPoolDetails(id) {
    let { history } = this.props;
    UserUtils.setBackBtnLink("messages");
    history.push("/pooldetails/" + id);
  }

  clearChatDetails = (chatDetails = null) => {
    this.setState({
      chatDetails
    })
  }

  seeReservation = () => {
    const { user } = this.props
    const isHost = user && user.roles && user.roles[0].name === 'Host'
    if (isHost) {
      this.props.history.push('/host-reservation')
    } else {
      this.props.history.push('/my-reservation')
    }
  }

  getClassByStatus = (status) => {
    switch (status) {
      case 0:
        return 'pending'
      case 1:
        return 'approved'
      case 2:
        return 'declined'
      case 3:
        return 'confirmed'
      case 4:
        return 'declined'
      case 5:
        return 'cancelled'
      case 6:
        return 'confirmed'
      case 7:
        return 'empty'
      case 8:
        return 'approved'
      default:
        return ''
    }
  }

  handleErrorMessage = (errorMessage = '') => {
    this.setState({ errorMessage })
  }
  
  renderBookingMessage = () => {
    let { classes } = this.props;
    const { chatDetails } = this.state
    if (chatDetails && chatDetails.last_booking && UserUtils.getAccessToken()) {
      const isHost = UserUtils.getUserRole() === 'Host' && +chatDetails.last_booking.swimmer_id !== +UserUtils.getUserID()
      const status = chatDetails.last_booking.booking_status
      let bookingStatus = ''
      switch (status) {
        case 0:
          bookingStatus = 'Awaiting host approval';
          break
        case 1:
          bookingStatus = 'Awaiting guest confirmation';
          break
        case 2:
          bookingStatus = 'Request declined';
          break
        case 3:
          bookingStatus = 'Booking confirmed';
          break
        case 5:
          bookingStatus = 'Booking cancelled';
          break
        case 8:
          if (isHost) {
            bookingStatus = 'Awaiting guest confirmation';
          } else {
            bookingStatus = 'Pre approved';
          }
          break
        default:
          bookingStatus = ''
      }
      
      if (
        status === 0
        || status === 1
        || status === 2
        || status === 3
        || status === 5
        || status === 7
        || status === 8
      ) {

        // TODO in future need to optimization of this logic
        // --------
        let time_array = cloneDeep(timeArray)
        let from = time_array.find(item => item.time_insert === chatDetails.last_booking.from).timeNumber
        let to = time_array.find(item => item.time_insert === chatDetails.last_booking.to).timeNumber
        to += 1
        from = time_array.find(item => item.timeNumber === from).displayTime
        to = time_array.find(item => item.timeNumber === to).displayTime
        // --------

        const info = `${moment(chatDetails.last_booking.date).format('MMM DD, YYYY')} ${from} - ${to} | ${commonFunctions.handleGuests(chatDetails.last_booking)}`
        return (
          <div>
            {this.state.errorMessage && <div className={classes.errorMessageContainer}>
              <span className='close' onClick={this.handleErrorMessage.bind(this, '')}>x</span>
              <Typography variant='caption' component='p' className='message'>{this.state.errorMessage}</Typography>
            </div>}
            <div className={`${classes.bookingMessage} ${this.getClassByStatus(status)}`}>
              {bookingStatus ? <span className={classes.hostSmallText} style={{ color: '#FFF', textAlign: 'center' }}>{bookingStatus}</span> : null}
              <span className={classes.hostSmallText} style={{ color: '#FFF', textAlign: 'center' }}>{info}</span>
            </div>
          </div>
        )

      }
    } else {
      return null
    }
  }

  renderHeaderButton = () => {
    return <p className={this.props.classes.seeReservationButton} onClick={this.seeReservation}>
      See reservations
    </p>
  }

  /**
   * render
   */

  render() {
    let { classes } = this.props;
    let {
      conversationList,
      message,
      lastName,
      receiverDetails,
      senderDetails,
      hostPoolList,
      seePoolStatus,
      loading
    } = this.state;
    conversationList = conversationList.slice().reverse()
    let headingName = '';
    let seePoolHeading = '';
    if (receiverDetails.firstname !== undefined) {
      headingName = receiverDetails.firstname + lastName;
      seePoolHeading =
        receiverDetails.firstname + lastName + ".'s Pools";

      headingName = headingName.substring(0, 30) + '.';
      seePoolHeading = seePoolHeading.substring(0, 30);
    }
    
    return (
      <div className={classes.container}>
        {loading === true && !conversationList.length ? <Pageloader loading={loading} /> : ""}
        <Typography variant="body1" component="span">
          <div className={classes.messagesBlock}>
            <div
              className={classes.backButton}
              onClick={this.redirectToMessages}
            >
              <i className="fa fa-angle-left" /> back
            </div>
            {seePoolStatus !== true ? (
              <div>
                <div className={classes.topHeaderChat+' '+classes.seePoolsBtn}>
                  <Typography variant="h2">{headingName}</Typography>
                  {this.renderHeaderButton()}
                </div>
                {this.renderBookingMessage()}
                <div className={classes.convertionBox}>
                  <ul id="messages">
                    {conversationList.map((data, key) => {
                      let phoneExp = /[+]*[ ()-\s0-9]{10,15}/g;
                      let emailExp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/img;
                      let newMessage = data.message.replace(emailExp, ' Email address not shown ').replace(phoneExp, ' Phone number not shown ');
                      let createdAt1 = moment.utc(data.created_at);
                      let createdAt2 = moment(new Date());
                      let createdAt = createdAt1.from(createdAt2);
                      let newMsg = "";
                      if(data.message.includes('{Host}') || data.message.includes('{Swimmer}') || data.message.includes('{with_date}')) {
                        if(senderDetails.id === data.reciever_id) {
                         if(data.message.includes('{Host}')){
                          newMsg = data.message.replace('{Host}', receiverDetails.firstname+" "+receiverDetails.lastname+'.');
                         } else if (data.message.includes('{Swimmer}')) {
                          newMsg = data.message.replace('{Swimmer}', receiverDetails.firstname+" "+receiverDetails.lastname+'.');
                         } else {
                           newMsg = data.message.replace('{with_date}', '');
                         }
                        }
                      }
                      return (
                        <div key={key}>
                          {(data.message.includes('{Host}') || data.message.includes('{Swimmer}') || data.message.includes('{with_date}'))
                            ? (senderDetails.id === data.reciever_id
                              ? <p className={classes.requestedBookingLine}><span>{newMsg}</span></p>
                              : "")
                           : data.sender_id !== senderDetails.id ? (
                            <li>
                              <Avatar
                                user={receiverDetails}
                                containerClass={`${classes.avatarContainer} margin-right`}
                                className={classes.avatar}
                                verifiedIconSize='small'
                                alt='Avatar'
                                src={receiverDetails.img_url || (window.location.origin + '/img/profile-icon.png')}
                              />
                              <span className={classes.breakWord}>
                                {newMessage}
                                <font>{createdAt}</font>
                              </span>
                              <div className={classes.arrowMessageleft} />
                            </li>
                          ) : (
                              <li className={classes.divpullRight}>
                                <span className={classes.breakWord}>
                                  {newMessage}
                                  <font>{createdAt}</font>
                                </span>
                                <div className={classes.arrowMessageRight} />
                                <Avatar
                                  user={senderDetails}
                                  containerClass={`${classes.avatarContainer} margin-left`}
                                  className={classes.avatar}
                                  verifiedIconSize='small'
                                  alt='Avatar'
                                  src={senderDetails.img_url || (window.location.origin + '/img/profile-icon.png')}
                                />
                              </li>
                            )
                                  }
                        </div>
                      );
                    })}
                    
                  </ul>
                  <form onSubmit={this.sendMessage}>
                    <div className={classes.chatBox}>
                      <font className={classes.typingLabel}>{this.state.communicatorIsTyping ? 'typing...' : ''}</font>
                      <TextField
                        id="outlined-email-input"
                        placeholder="Type your message here..."
                        type="text"
                        name="message"
                        multiline={true}
                        variant="outlined"
                        value={message}
                        onChange={this.handleMessage}
                      />
                      <img
                        src={
                          message === ""
                            ? window.location.origin + "/img/sendbtn.png"
                            : window.location.origin + "/img/sendbtn3.png"
                        }
                        alt=""
                        onClick={this.sendMessage}
                      />
                    </div>
                    <BookingChatButton
                      chatDetails={this.state.chatDetails}
                      isDefaultInstantBooking={this.state.isDefaultInstantBooking}
                      clearChatDetails={this.clearChatDetails}
                      handleErrorMessage={this.handleErrorMessage}
                    />
                  </form>
                </div>
              </div>
            ) : (
                <div className={classes.seePools}>
                  <div className={classes.topHeaderChat}>
                    <Typography variant="h2"> {seePoolHeading}</Typography>
                    <span onClick={this.handleHidePool}>HIDE POOLS</span>
                  </div>
                  {hostPoolList && hostPoolList.length !== 0 ? (
                    hostPoolList.map((data, pool_index) => {
                      let coverImage = _.filter(data.images, { cover: true });
                      if (coverImage.length >= 1) {
                        coverImage = coverImage[0].url;
                      } else {
                        coverImage = "";
                      }
                      return (
                        <div className={classes.seepollsBoxNew} key={pool_index}>
                          <span
                            className={classes.poolImage}
                            onClick={this.redirectToPoolDetails.bind(
                              this,
                              data.id
                            )}
                          >
                            <div>
                              <img
                                alt=""
                                src={
                                  coverImage === "" ? window.location.origin + "/img/default-pool.png" : coverImage
                                }
                              />
                            </div>
                          </span>
                          <div className={classes.seePoolsContent}>
                            <span
                              onClick={this.redirectToPoolDetails.bind(
                                this,
                                data.id
                              )}
                            >
                              <div>{data.title}</div>
                            </span>
                            <div>
                              <p>{(data.city !== '' && data.city !== null) ? data.city + ', ' : ''} {(data.state !== '' && data.state !== null) ? data.state + ', ' : ''} {data.zip_code !== '00000' ? ('' + data.zip_code) : ''}</p>
                            </div>

                            <span
                              onClick={this.redirectToPoolDetails.bind(
                                this,
                                data.id
                              )}
                            >
                              <Typography variant="button">
                                View Details
                            </Typography>
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                      <Typography variant="h5"> No pools available.</Typography>
                    )}
                </div>
              )}
          </div>
        </Typography>
      </div>
    );
  }
}

ConvertionList.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function ConvertionListContainer(props) {
  const context = useContext(UserContext)
  const appContext = useContext(AppContext)
  const chatContext = useContext( ChatContext )
  return <ConvertionList {...context} {...appContext} {...chatContext} {...props} />
};

export default enhance(ConvertionListContainer);
