import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withApollo } from 'react-apollo';
import UserUtils from '../utilities/UserUtils';
import * as commonFunctions from '../utilities/commonFunctions';
import { loader } from 'graphql.macro';
import Pageloader from './../commons/pageloader';
import PaymentInfoForm from './paymentinfoform';

// contexts
import UserContext from '../../contexts/UserContext'
const userDetailsQuery = loader('./../../graphql/user/me.graphql');

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
  formInputBox: {
    '& label + div ': {
      marginTop: '0',
      marginBottom: '0',
      width: '100%'
    },

    position: "relative",
    marginBottom: "15px",
    maxWidth: '450px',
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: "uppercase",
      fontSize: '14px',
      paddingBottom: '5px',
    },
    '& input': {
      background: theme.palette.common.gray,
      position: "relative",
      width: "100%",
      padding: "10px 15px ",
      fontWeight: "normal",
      border: '1px solid #f3f5f5',
      fontSize: '14px',
      borderRadius: '5px',

      '&:focus': {
        border: '1px solid #00ade2'
      }
    },
    '& span': {
      position: "absolute",
      top: "3px",
      bottom: "0",
      margin: "auto",
      height: "0px",
      left: "9px",
    },

  },
  paymentCard: {
    display: 'flex',
    maxWidth: '450px',
    '& > div': {
      paddingRight: '15px',
      width: '50%',
    },

    '& > div:last-child': {
      paddingRight: '0',
      width: '20%',
    }
  },
  signupBtn: {
    marginBottom: '15px',
    '& span': {
      display: 'inline-block'
    }

  },
  paymentMethod:{
    paddingTop: '40px',
    '& p':{
      fontSize:'12px',
      marginBottom:'0',
    },
    '&  a, p.link':{
      color: theme.palette.common.blue,
      marginTop:'20px',
      display:'table',
      textDecoration:'none',
      cursor: 'pointer',
      '& p':{
        fontSize:'14px',
        fontWeight:'500',
        marginBottom:'7px',
      }
    },
    '@media (max-width:767px)':{
      paddingTop: '0',
    position: 'fixed',
    width: 'calc(100% - 40px)',
    left:' 0',
    padding:' 20px',
    top: '0',
    background:' #fff',
    zIndex: '22',
    height:'100%',
    overflowY:'auto',
    '& h2':{
      fontSize:'20px',
    },
    '&  a':{
    '& p':{
     width:'25px',
     height:'25px',
     overflow:'hidden',
     fontSize:'25px !important',
     marginTop: '0',
    color: '#232323',
    paddingBottom:'10px'
    }
  }
    },
  },
  cardDisplay: {
    position: 'relative',
    '& > div':{
      width:'100%',
      maxWidth:'300px',
    },
    '& input': {
      padding: '13px 15px 13px 50px',
      background:'#f3f5f5',
      letterSpacing: '3.8px',
    },
    '& img' : {
      maxWidth: '30px',
      left: '10px',
      position: 'absolute',
      top: '25px',
    },
    '& fieldset':{
      borderColor:theme.palette.common.transparent,
      border: 'none',

    },
    '& img + div' : {
      marginTop:'15px',
      color:theme.palette.common.blue,
      cursor: 'pointer'
    }
  }
});

class PaymentMethod extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      poolId: 0,
      cardBrand: '',
      cardLastFourDigit: '',
      loading: false,
      updatePayment: false
    };
    this.addNewPaymentMethod = this.addNewPaymentMethod.bind(this);
  }
  /**
   * @param {*} event
   */
  componentDidMount() {
    let fromPage = UserUtils.getPaymentFromId();
    let booking_id = '';
    let from_page = '';
    if(fromPage !== null && fromPage !== '') {
      fromPage = JSON.parse(fromPage);
      booking_id = fromPage.booking_id;
      from_page = fromPage.from;
    }
    let poolId = UserUtils.getPoolId();
    let cardBrand = UserUtils.getCardBrand();
    let cardLastFourDigit = UserUtils.getCardLastFourDigit();
    this.setState({
      poolId: poolId,
      cardBrand: cardBrand,
      cardLastFourDigit: cardLastFourDigit,
      loading: true,
      bookingId:booking_id,
      fromPage:from_page
    });
    this.getProfileDetails()
  }

  getProfileDetails = async () => { // refactored
    try {
      let fromPage = UserUtils.getPaymentFromId()
      fromPage = fromPage && JSON.parse(fromPage)
      const { data: { me: user }} = await this.props.client.query({
        query: userDetailsQuery,
        fetchPolicy: 'network-only'
      })
      this.setState({
        cardBrand: user.card_brand,
        cardLastFourDigit: user.card_last_four,
        loading: false
      }, () => {
        if (fromPage && (fromPage.from === 'my-reservations')) {
          this.addNewPaymentMethod()
        }
      })
    } catch (e) {
      this.setState({ loading: false },  async () => {
        let errorMsg = commonFunctions.parseGraphQLErrorMessage(e)
        if (errorMsg === 'Unauthenticated.') {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.getProfileDetails()
          }
        }
      })
    }
  }

  handlePaymentMethod(data) {
    let { poolId,fromPage } = this.state;
    let { history, location } = this.props;
    UserUtils.setCardBrand(data.saveCardDetails.card_brand);
    UserUtils.setCardLastFourDigit(data.saveCardDetails.card_last_four);
    if (location && location.state && location.state.needGoBackAfterUpdate) {
      history.goBack();
    } else if(fromPage === 'my-reservations') {
      UserUtils.removePaymentFromId();
      history.push('/my-reservation');
    } else if (poolId) {
      history.push('/payment/' + poolId);
    } else {
      // all other cases
      // e.g. profile
      history.goBack();
    }
  }

  addNewPaymentMethod() {
    this.setState({
      cardLastFourDigit: '',
      updatePayment: true
    });
  }

  goBack = () => {
    if (this.state.fromPage) {
      this.props.history.push(`/my-reservation`)
    } else {
      this.props.history.goBack()
    }
  }

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    let { loading, poolId, bookingId, cardLastFourDigit, cardBrand, updatePayment } = this.state;
    let cardNumber = "**** **** **** " + cardLastFourDigit;
    return (
      <Typography variant="body1" component="span">
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <div className={classes.container}>
          <div className={classes.paymentMethod}>
            <p className='link' onClick={this.goBack}>
              <i className='fa fa-angle-left'></i> BACK
            </p>

            <Typography variant="h2">{updatePayment === true ? "Update your payment method" : "Choose a payment method" }</Typography>
            <p>You won't be charged until your booking is confirmed</p>

            {cardLastFourDigit === null || cardLastFourDigit === '' ?
              <PaymentInfoForm
                poolId={poolId}
                bookingId={bookingId}
                updatePayment = {updatePayment}
                handlePaymentMethod={this.handlePaymentMethod.bind(this)} />
              :
              <div className={classes.cardDisplay}>
                <TextField
                  id="card-number"
                  className={classes.textField}
                  type="text"
                  name="pool"
                  autoComplete=""
                  margin="normal"
                  variant="outlined"
                  value={cardNumber}
                  disabled={true}
                />
                  {cardBrand === ('MasterCard' || 'Mastercard (2-series)' || 'Mastercard (debit)' || 'Mastercard (prepaid)') ? <img alt="" src={window.location.origin + "/img/cards/mastercard.png"} /> : ""}
                  {cardBrand === ('Visa' || 'Visa (debit)') ? <img alt="" src={window.location.origin + "/img/cards/visa-card.png"} /> : ""}
                  {cardBrand === 'American Express' ? <img alt="" src={window.location.origin + "/img/cards/american.png"} /> : ""}
                  {cardBrand === 'Discover' ? <img alt="" src={window.location.origin + "/img/cards/discover.png"} /> : ""}
                  {cardBrand === 'Diners Club' ? <img alt="" src={window.location.origin + "/img/cards/dinnerclub.png"} /> : ""}
                  {cardBrand === 'JCB' ? <img alt="" src={window.location.origin + "/img/cards/jcb.png"} /> : ""}
                  {cardBrand === 'UnionPay' ? <img alt="" src={window.location.origin + "/img/cards/union.png"} /> : ""}
                <div onClick={this.addNewPaymentMethod}> Update your payment method </div>
              </div>
            }
          </div>
        </div>
      </Typography>
    );
  }
}

PaymentMethod.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

function PaymentMethodContainer (props) {
  const userContext = useContext(UserContext)
  return <PaymentMethod {...userContext} {...props} />
}

export default enhance(PaymentMethodContainer);
