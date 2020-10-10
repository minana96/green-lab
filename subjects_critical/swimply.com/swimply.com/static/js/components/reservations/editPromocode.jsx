import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withApollo } from "react-apollo";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { loader } from 'graphql.macro';
import * as commonFunctions from '../utilities/commonFunctions';
const verifyPromocode = loader('./../../graphql/reservations/verifyPromocode.graphql');

const styles = theme => ({
  promocodeDetails: {
    '& i': {
        cursor: 'pointer',
        color: '#65d7f3'
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
    '& input': {
      padding:'15px',
    },
    '& input:focus': {
      outline: 'none',
      boxShadow: '0 0 2px #00ade2'
    },
    '& label + div': {
      display:'flex',
      '& > div' :{
        marginTop:'5px',
      },
      '& > div:last-child': {
        marginTop:'8px',
        marginLeft:'25px',
        '& span': {
          position: 'inherit',
          height: 'auto',
          filter:'none'
        }
      }
    }
  },
  paymentDetails: {
    '& p': {
      fontSize: '16px',
      marginBottom: '5px',
      '& span': {
        float: 'right',
        color: theme.palette.common.black,
      }
    },
  },
  error: {
      color:"red"
  },
  success: {
    color:"green"
  }
})

class EditPromoCode extends React.Component {
    /**
     * @param {*} props
     */
    constructor(props) {
      super(props);
      this.state = {
        edit_promocode:false,
        promo_code:'',
        promoCodeError:''
      };
      this.editPromoCode = this.editPromoCode.bind(this);
      this.handlePromoCode = this.handlePromoCode.bind(this);
      this.applyPromocode = this.applyPromocode.bind(this);
    }
    
    editPromoCode() {
        let { reservationData } = this.props;
        let promo_code = '';
        if(reservationData.promocode_status !== 'no') {
            if(reservationData.promocode !== null && reservationData.promocode !== '') {
                promo_code = reservationData.promocode.promo_code;
            } else {
                promo_code = '';
            }
        } else {
            promo_code = '';
        }
        this.setState({
            promo_code,
            edit_promocode:true
        })
    }

    handlePromoCode(event) {
        this.setState({
            promo_code:event.target.value
        })
    }

    applyPromocode() {
        let { promo_code } = this.state;
        let { reservationIndex } = this.props;

        if(promo_code !== undefined && promo_code !== '') {
            this.props.client.mutate({
                mutation: verifyPromocode,
                variables: {
                    data: {
                        'promocode':promo_code
                    }
                }
            })
            .then((res) => {
                if(reservationIndex !== undefined && reservationIndex !== '') {
                    this.props.updatePromoCode(reservationIndex, res.data.verifyPromocode);
                } else {
                    this.props.updatePromoCode(res.data.verifyPromocode);
                }
                
                this.setState({
                    edit_promocode:false,
                    promoCodeError:''
                })
            }).catch((error) => {
                let errorMsg = commonFunctions.parseGraphQLErrorMessage(error);
                this.setState({
                    promoCodeError:errorMsg
                })
                if(reservationIndex !== undefined && reservationIndex !== '') {
                  this.props.updatePromoCode(reservationIndex,'remove');
                } else {
                  this.props.updatePromoCode('remove');
                }
                
            });
        } else {
            if(reservationIndex !== undefined && reservationIndex !== '') {
              this.props.updatePromoCode(reservationIndex,'remove');
            } else {
              this.props.updatePromoCode('remove');
            }
            this.setState({
                promoCodeError:'Please enter promo code',
            })
        }
    }
    
  
    /**
     * render
     */
    render() {
      const { classes, reservationData } = this.props;
      let { edit_promocode, promo_code, promoCodeError } = this.state;
      let totalPrice = reservationData.reservation_price;
      let basicAmount = totalPrice;
      let promoCodeAmount = 0;
    
      let isPromocodeApplied = false;
      if(reservationData.promocode_status === 'ok' && reservationData.promocode !== null && reservationData.promocode !== '') {
        isPromocodeApplied = true;
        let promoCodeDetails = reservationData.promocode
        if(promoCodeDetails.off_type === 'percent') {
            promoCodeAmount = (totalPrice/100)*promoCodeDetails.percent_off;
        } else {
            promoCodeAmount = promoCodeDetails.percent_off;
        }
      }
    if(promoCodeAmount >=  totalPrice) {
        totalPrice = 0;
        promoCodeAmount = basicAmount;
    } else {
        totalPrice = totalPrice-promoCodeAmount;
    }

    let serviceCharge = (totalPrice / 100) * reservationData.service_fee;

    let referalAmount = 0;
    let referral = false;
    if(reservationData.referral_credit !== null  &&  reservationData.referral_credit === '') {
      referalAmount = (totalPrice / 100) * reservationData.referral_credit;
      referalAmount = referalAmount.toFixed(2)
      referral = true;
    }

    totalPrice = totalPrice + serviceCharge-referalAmount;

      return (
        <div className={classes.promocodeDetails}>
          {(reservationData.promocode_status !== 'no' || edit_promocode === true )  ? (
            (edit_promocode === true?(
              <div className={classes.formInputBox+' '+classes.formInputBoxPromocode}>
                  <Typography variant="subtitle2" component="label">Promo code</Typography>
                  <div>
                    <TextField
                      id="promocode"
                      placeholder="Promo code"
                      type="text"
                      name="promocode"
                      autoComplete=""
                      margin="normal"
                      variant="outlined"
                      value={promo_code}
                      onChange={this.handlePromoCode}
                    />
                    <div onClick={this.applyPromocode} className={classes.activeReservationBtn}>
                        <Typography variant="button">
                          Apply
                        </Typography>
                    </div>
                  </div>
                  {promoCodeError !== ''?<p className={classes.error}>{promoCodeError}</p>:''}
                </div>
              ):(
                <div>
                    <p>Applied promocode: {reservationData.promocode.promo_code} <i className="fa fa-edit" onClick={this.editPromoCode}></i></p>
                    <p className={classes.error}>
                        {reservationData.promocode_status === 'used'&&'Promocode already used.'}
                        {reservationData.promocode_status === 'expire'&&'Promocode expired, please try with another promocode.'}
                        {reservationData.promocode_status === 'max'&&'Maximum usage of promocode reached, please try with another promocode'}
                    </p>
               </div>
              ))
          ):(
            <p>Add Promocode <i className="fa fa-plus-circle" onClick={this.editPromoCode}></i></p>
          )}
            <div className={classes.paymentDetails}>
              <p>Booking cost <span>${parseFloat(reservationData.reservation_price).toFixed(2)}</span></p>
              {isPromocodeApplied === true?(<p>Promocode Discount: <span>-${parseFloat(promoCodeAmount).toFixed(2)}</span></p>):''}
              <p>Service fee <span>${parseFloat(serviceCharge).toFixed(2)}</span></p>
              {referral ===true ? (<p>{reservationData.referral_credit}% referral credit <span>-${referalAmount}</span></p>):'' }
              <p>Total Booking Cost <span>${parseFloat(totalPrice).toFixed(2)}</span></p>
            </div>
        </div>
      );
    }
  }
  
  
  
  EditPromoCode.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const enhance = compose(
    withStyles(styles),
    withRouter,
    withApollo
  );
  
  export default enhance(EditPromoCode);