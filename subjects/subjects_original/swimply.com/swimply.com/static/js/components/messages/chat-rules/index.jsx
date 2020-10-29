import React, {Component, useContext} from 'react'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { loader } from 'graphql.macro'
import compose from 'recompose/compose'

// material components
import Typography from '@material-ui/core/Typography'

// components
import Loader from '../../commons/pageloader'
import CheckBoxView from './check-box-view'

// utils
import UserUtils from '../../utilities/UserUtils'
import * as commonFunctions from '../../utilities/commonFunctions'

// styles
import styles from './styles'
import UserContext from '../../../contexts/UserContext';

// graphql
const acceptChatRules = loader('../../../graphql/messages/acceptChatRules.graphql')

class ChatRules extends Component {
  state = {
    loading: false,
    safe: false,
    polite: false,
    keep: false,
    disable: true,
    errorMessage: '',
    replaceTo: '/messages',
  }

  componentDidMount () {
    this.handleParams()
    let accessToken = UserUtils.getAccessToken()
    if (!accessToken) {
      this.props.history.push('/')
    }
  }

  handleParams = () => {
    const { location } = this.props
    const replaceTo = location && location.state && location.state.replaceTo ? location.state.replaceTo : '/messages'
    this.setState({ replaceTo })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  onChange = (field) => {
    this.setState({
      [field]: !this.state[field]
    }, this.handleDisable)
  }

  handleDisable = () => {
    this.setState({
      disable: !this.state.safe || !this.state.polite || !this.state.keep
    })
  }

  accept = () => {
    if (!this.state.loading && !this.state.disable) {
      this.setState({ loading: true }, () => {
        this.props.client.mutate({
          mutation: acceptChatRules,
          variables: {
            accept_chat_rules: true,
          }
        }).then(({ data: { acceptChatRules: data }}) => {
          this.setState({ loading: false }, () => {
            if (data.status) {
              this.props.handleUser({
                ...(this.props.user || {}),
                accept_chat_rules: true,
              })
              this.props.history.replace(this.state.replaceTo)
            } else {
              this.setState({ errorMessage: data.message })
            }
          })
        }).catch((error) => {
          console.log('error', error)
          this.setState({ loading: false }, async () => {
            const errorMsg = commonFunctions.parseGraphQLErrorMessage( error )
            if (errorMsg === 'Unauthenticated.') {
              const status = await this.props.refreshToken(this.props.history)
              if (status === 'ok') {
                this.accept()
              }
            }
          })
        })
      })
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.backContainer}>
            <font onClick={this.goBack}>
              <i className='fa fa-angle-left' aria-hidden />
            </font>
          </div>
          <div className={classes.padding}>
            <p className={classes.title}>Swimply Chat: Rules of Conduct</p>
          </div>
          <CheckBoxView
            onClick={this.onChange.bind(this, 'safe')}
            checked={this.state.safe}
            label='Be Safe'
            text='Don’t share any personal information like your phone number, address etc.'
            icon={`${window.location.origin}/img/screens/chat-rules/safe.png`}
            iconClass={classes.safeIcon}
          />
          <CheckBoxView
            onClick={this.onChange.bind(this, 'polite')}
            checked={this.state.polite}
            label='Be Polite'
            text='Foul and discriminatory language won’t fly.'
            icon={`${window.location.origin}/img/screens/chat-rules/smile.png`}
            containerClass={classes.checkBoxBorder}
          />
          <CheckBoxView
            onClick={this.onChange.bind(this, 'keep')}
            checked={this.state.keep}
            label='Keep It Here'
            text='Don’t arrange payments outside of the platfrom. We won’t be able to protect them and it’s against our terms of use.'
            icon={`${window.location.origin}/img/screens/chat-rules/payment.png`}
            iconClass={classes.keepIcon}
          />
          <div className={`${classes.messageContainer} ${classes.padding}`}>
            <img className={classes.messageIcon} src={`${window.location.origin}/img/screens/chat-rules/info.png`} alt='chat rules info' />
            <p className={classes.message}>Violating these rules may result in account suspension.</p>
          </div>
          <div className={`${classes.buttonContainer} ${classes.padding}`}>
            <Typography className={`${this.state.disable ? classes.disableButton : ''}`} variant='button' onClick={this.accept}>
              Accept
            </Typography>
          </div>
        </div>
        {this.state.loading && <Loader loading />}
      </div>
    )
  }
}

ChatRules.propTypes = {}

ChatRules.defaultProps = {}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo,
)

function ChatRulesContainer (props) {
  const context = useContext(UserContext)
  return <ChatRules {...context}  {...props} />
}


export default enhance(ChatRulesContainer)
