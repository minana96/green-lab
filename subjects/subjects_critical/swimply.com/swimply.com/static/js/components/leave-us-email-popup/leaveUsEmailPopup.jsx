import /* React,*/ { Component } from 'react'
import compose from 'recompose/compose'
import { withApollo } from "react-apollo"
import { withStyles } from '@material-ui/core/styles'
import { loader } from 'graphql.macro'

// import CustomPopup from '../commons/aboveRoutesCustomPopup'
import UserUtils from '../utilities/UserUtils'

const emailCollection = loader('./../../graphql/user/leaveEmail.graphql')

const styles = theme => ({})

class LeaveUsEmailPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailInput: '',
      zipCodeInput: '',
      needToShow: false,
      stopShowingPopup: true
    }
    this.sendUserEmail = this.sendUserEmail.bind(this)
    this.hidePopup = this.hidePopup.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.mouseLeaveTimeoutId = null
    this.popupTimerId = null
  }

  componentDidMount() {
    if (!UserUtils.getAccessToken() && !localStorage.getItem('popupShowed')) {
      this.setState({
        needToShow: true
      })
    }
  }

  sendUserEmail () {
    let email = this.state.emailInput
    let zipCode = this.state.zipCodeInput
    if (email) {
      this.hidePopup()
      this.props.client.mutate({
        mutation: emailCollection,
        variables: {
          data: {
            'email': email,
            'zip_code': zipCode
          }
        }
      })
      .then(
        this.setState({
          inputValue: '',
          stopShowingPopup: true
        })
      )
      .catch(error => {
        console.error(error)
      })
    }

  }

  hidePopup () {
    this.setState({
      needToShow: false,
      stopShowingPopup: true
    }, ()=>{
      localStorage.setItem('popupShowed', this.state.stopShowingPopup)
      // UserUtils.onPopupClose()
    })
  }

  handleInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    if (this.state.needToShow) {
      console.info('Promo popup was triggered, but hidden')
      // TODO temporary hiden
      // return (
      //   <CustomPopup
      //     showSubmitButton={true}
      //     handleOnSubmit={this.sendUserEmail}
      //     hidePopup={this.hidePopup}
      //     placeholder='Your email here'
      //     popupTitle="Enjoy $25 off"
      //     popupTitleSecondPart="your first booking!"
      //     mainInfo='Get your feet wet with a $25 promo code on us.'
      //     withUnderlay={true}
      //     displayInput={true}
      //     onInputChange={this.handleInput}
      //     inputValue={this.state.inputValue}
      //     showPopup={true}
      //     hidePopupCallback={this.hidePopup}
      //     emailInput={this.state.emailInput}
      //     zipCodeInput={this.state.zipCodeInput}
      //   />
      // )
      return null
    } else {
      return null
    }
  }
}

const enhance = compose(
	withStyles(styles),
	withApollo
);

export default enhance(LeaveUsEmailPopup);
