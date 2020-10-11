import React, {useContext} from 'react'
import moment from 'moment'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withApollo } from 'react-apollo'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

// utilities
import { handleNewMessage } from '../utilities/commonFunctions'

// components
import Avatar from '../commons/avatar'

// contexts
import AppContext from '../../contexts/AppContext';

class ChatlistItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTyping: false
    }
    this.channel = ''
    this.timer = null
  }

  componentDidMount() {
    if (this.props.chatIndex < 10) {
      this.addListeners(this.props.chatData.room_id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chatIndex !== this.props.chatIndex) {
      if (this.props.chatIndex < 10) {
        this.addListeners(this.props.chatData.room_id)
      }
    }
  }

  async componentWillUnmount() {
    if (this.props.echo) {
      this.props.echo.leave(this.channel)

      this.channel = ''
    }
    clearTimeout(this.timer)
  }

  addListeners = (room_id) => {
    this.channel = `room.${room_id}`

    if (this.props.echo) {
      this.props.echo.join(this.channel)
        .listen('.message.created', (e) => {
          handleNewMessage(e)
        })
        .listenForWhisper('typing', (e) => {
          this.setState({
            isTyping: true
          })
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.setState({
              isTyping: false
            });
          }, 700);
        })
    }
  }

  render() {
    let { classes } = this.props;

    let msg = this.props.chatData
    let createdAt1 = moment.utc(msg.created_at);
    let createdAt2 = moment(new Date());
    let createdAt = createdAt1.from(createdAt2);

    return (
      <ListItem
        alignItems='flex-start'
        onClick={this.props.redirectToConversations.bind(null, msg.user.id,)}
      >
        <ListItemAvatar>
          <Avatar
            user={msg.user}
            containerClass={classes.avatarContainer}
            verifiedIconSize='small'
            alt=''
            src={
              msg.user.img_url || (window.location.origin + '/img/profile-icon.png')
            }
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component='span' color='textPrimary'>
                {msg.user.firstname}
                {(msg.user.lastname !== undefined && msg.user.lastname !== null && msg.user.lastname !== '') ? (' '+msg.user.lastname.charAt(0).toUpperCase()) : ''}.
              </Typography>
              <font>{createdAt}</font>
              <font className={classes.typingLabel}>{this.state.isTyping ? 'typing...' : ' '}</font>
            </React.Fragment>
          }
        />
        <Typography variant='h6' color='inherit'>
          <span
            className={
              msg.count_of_unread_messages === 0
                ? ''
                : 'unreadImageIcon'
            }
          >
            <img src='img/chat-icon.png' alt='' />
          </span>
        </Typography>
      </ListItem>
    )
  }
}

const styles = theme => ({
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
})

const enhance = compose(
  withStyles( styles ),
  withRouter,
  withApollo,
)

function ChatlistItemContainer( props ) {
  const appContext = useContext( AppContext )
  return <ChatlistItem {...props} {...appContext} />
}

export default enhance(ChatlistItemContainer)
