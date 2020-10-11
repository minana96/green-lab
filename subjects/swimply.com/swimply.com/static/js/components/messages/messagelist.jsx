import React, {useContext} from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { withApollo } from "react-apollo";
import { loader } from "graphql.macro";
// import moment from "moment";
import UserUtils from "../utilities/UserUtils";
import * as commonFunctions from "./../utilities/commonFunctions";
import Pageloader from "./../commons/pageloader";
import { ClipLoader } from 'react-spinners';
import _ from 'lodash';
import UserContext from '../../contexts/UserContext';
import ChatContext from '../../contexts/ChatContext';
import AppContext from '../../contexts/AppContext';
import ChatlistItem from './chatListItem';
// import Avatar from '../commons/avatar';
import update from "immutability-helper";
const messagesListQuery = loader(
  "./../../graphql/messages/messagesListQuery.graphql"
);

const queryString = require('query-string');


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
      background:' #f5f5f5',
    minHeight: 'calc(100vh - 56px)',
    }
  },
  messagesBlock: {
    paddingTop: "35px",
    "@media (max-width:767px)": {
      paddingTop: "20px"
    },
    "& h2": {
      paddingBottom: "20px"
    },

    "& ul": {
      maxWidth: "420px",
      marginLeft: "15px",    
     
      "@media (max-width:767px)": {
        margin: "0 -15px",
        width: "calc(100% + 30px)",
        padding: "0"
      }
    },
    "& li": {
      paddingBottom: "15px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",

      "& Span": {
        "& img": {
          maxWidth: "25px"
        }
      },
      "@media (max-width:767px)": {
        borderBottom: "1px solid #eaefee",
        "&:first-child": {
          borderTop: "1px solid #eaefee",
          marginTop:'20px'
        }
      }
    },
    "& p": {
      fontSize: "12px",
      color: theme.palette.common.darkgray,
      display: 'flex',
      flexDirection: 'column',
      "& span": {
        fontWeight: 500,
        color: theme.palette.common.black,
        fontSize: "14px"
      }
    },
    "& h6": {
      "& img": {
        paddingTop: "3px",
        cursor: "pointer"
      }
    }
  },
  noMessages: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.common.black,
    "& figure": {
      margin: "0 18px 0 -15px"
    },
    "& p": {
      color: theme.palette.common.black,
      fontSize: "14px",
      fontWeight: "300",
      marginTop: "0",
      marginBottom: "30px"
    },
    "@media (max-width:767px)": {
      display: "table",
      margin: "0 auto",
      "& figure": {
        margin: "0 auto",
        textAlign: "center"
      },
      "& P": {
        marginTop: "8px"
      }
    }
  },
  avatarContainer: {
    marginRight: '5px',
  },
  typingLabel: {
    lineHeight: 1,
    height: 12,
    color: theme.palette.common.blue,
    fontStyle: 'italic',
    fontSize: 12,
    fontFamily: `'Poppins', sans-serif`,
    marginBottom: -15,
  },
});

class MessageList extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      messagesList: [],
      loading: false,
      showEmpty: false,
      senderId: null,
      senderAvatar: '',
      senderVerifications: [],
      firstTenChats: [],
      isTyping: [],
    };
  }

  /**
   * @param {*} event
   */

  UNSAFE_componentWillMount() {
    // get previously saved data to show it during real chats loading
    let firstTenChats = UserUtils.getChatsList()
    if (firstTenChats.length > 0) {
      this.setState({
        messagesList: firstTenChats,
        loading: false,
        showEmpty: false,
      })
    }
  }

  componentDidMount() {
    let accessToken = UserUtils.getAccessToken();
    let { history } = this.props;
    if (accessToken !== null && accessToken !== "") {
      let parsed = queryString.parse(this.props.location.search);
      if(parsed.sender_id !== undefined && parsed.sender_id !== '') {
        history.push("/messages");
        this.redirectToConversions(parsed.sender_id)
      } 

      this.setState({ loading: true });
      this.getMessages()
    } else {
      UserUtils.setPreviousUrl(this.props.location.pathname);
      UserUtils.setPreviousSearchUrl(this.props.location.search);
      UserUtils.setIsPreviousUrl('yes');  
      history.push("/");
    }
  }

  componentDidUpdate( prevProps ) {
    if ( !!this.props.newMessage
      && ( !prevProps.newMessage
        || prevProps.newMessage.id !== this.props.newMessage.id ) ) {
      if ( +this.props.user.id !== this.props.newMessage.sender_id ) {
        console.log( 'New message', this.props.newMessage );
        const messageIndex = this.state.messagesList.findIndex( message => message.room_id === this.props.newMessage.room_id );
        console.log('messageIndex', messageIndex)
        if ( messageIndex >= 0 ) {
          let currentChat = this.state.messagesList[messageIndex]
          currentChat.count_of_unread_messages = 1
          currentChat.created_at = this.props.newMessage.created_at
          this.setState( {
            messagesList: update( this.state.messagesList, {
              $splice: [[messageIndex, 1]],
              $unshift: [currentChat]
            } ),
          } );
        } else {
          this.setState( {
            messagesList: update( this.state.messagesList, {
              $unshift: [this.props.newMessage],
            } ),
          } );
        }
      }
    }
  }

  getMessages = () => {
    this.props.client
      .query({
        query: messagesListQuery,
        fetchPolicy: "network-only"
      })
      .then(res => {
        let firstTenChats = _.cloneDeep(res.data.chatList)

        firstTenChats = firstTenChats.splice(0, 9)
        UserUtils.setChatsList(firstTenChats)

        this.setState({
          messagesList: res.data.chatList,
          loading: false,
          firstTenChats,
        }, 
          // () => this.setListenersForChats()
        );
      })
      .catch(async (error) => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
        this.setState({ loading: false });
        if (errorMsg === "Unauthenticated.") {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getMessages()
          }
        }
      });
  }

  /**
   * render
   */
  redirectToConversions(rec_id) {
    const selectedChatIndex = this.state.messagesList.findIndex(chat => chat.user.id === rec_id)
    if (selectedChatIndex >= 0) {
      this.setState( { messagesList: update(this.state.messagesList, {
          [selectedChatIndex]: {
            count_of_unread_messages: { $set: 0 }
          }
        }) }, () => {
        const hasUnread = this.state.messagesList.find(chat => chat.count_of_unread_messages > 0)
        this.props.setHasUnreadMessages(!!hasUnread)
      } )
      let receiver = this.state.messagesList[selectedChatIndex].user
      if (this.props.user) {
        let params = {
          receiverId: rec_id,
          receiverFirstName: receiver.firstname,
          receiverLastName: receiver.lastname,
          receiverAvatar: receiver.img_url,
          receiverVerifications: receiver.verifications,
          senderId: this.props.user.id,
          senderAvatar: this.props.user.img_url,
          senderVerifications: this.props.user.verifications
        }
        if (!this.props.user.accept_chat_rules) {

          this.props.handleChat(params)
          this.props.history.replace('/chat-rules')
        } else {
          let { history } = this.props;
          UserUtils.setMessageReceiverId(rec_id);
          history.push({
            pathname: "conversations"
          });
          this.props.handleChat(params)
        }
      }
    }
  }

  render() {
    let { classes } = this.props;
    let { messagesList, loading } = this.state;
    messagesList = _.reject(messagesList,{'user':null});
    messagesList = _.reject(messagesList,{'user':''});
    return (
      <div className={classes.container}>
        {loading === true && messagesList.length <= 0 ? <Pageloader loading={loading} /> : ""}
        <div className={classes.messagesBlock}>
          <Typography variant="h2">My Messages</Typography>
          <div>
            <List className={classes.root}>
              {messagesList.length !== 0 ? (
                messagesList.map((msg, msgIndex) => {
                  return <ChatlistItem key={`chatlistItem-${msg.room_id}-${msgIndex}`} redirectToConversations={this.redirectToConversions.bind(this)} chatIndex={msgIndex} chatData={msg} />
                })
              ) : (
                <Typography variant="h6" color="inherit">
                  <div className={classes.noMessages}>
                    <figure>
                      <img src="img/messages.png" alt="" />
                    </figure>
                    <p>You don't have any messages yet!</p>
                  </div>
                </Typography>
              )}
              {messagesList.length > 0 && loading &&
                <ListItem alignItems='center' style={{justifyContent: 'center'}}>
                  <ClipLoader
                    sizeUnit={"px"}
                    size={40}
                    color={'#00ADE2'}
                    loading={loading}
                  />
                </ListItem>
              }
            </List>
          </div>
        </div>
      </div>
    );
  }
}

MessageList.propTypes = {
  classes: PropTypes.object.isRequired,
  newMessage: PropTypes.any,
  user:PropTypes.object.isRequired
};

MessageList.defaultProps = {
  newMessage: null,
};

const enhance = compose(
  withStyles( styles ),
  withRouter,
  withApollo,
);

function MessageListContainer( props ) {
  const context = useContext( UserContext )
  const appContext = useContext( AppContext )
  const chatContext = useContext( ChatContext )
  return <MessageList {...context} {...props} {...appContext} {...chatContext} />;
}

export default enhance(MessageListContainer);
