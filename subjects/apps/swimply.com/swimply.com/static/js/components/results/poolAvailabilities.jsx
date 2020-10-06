import React, { Fragment } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserUtils from "./../utilities/UserUtils";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import EditProfilePopup from "../payment/editprofile-popup"
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// config
import { timeArray } from '../../config'

// services
import HelperService from '../../services/helper'

// graphql
const userDetailsQuery = loader('./../../graphql/user/me.graphql')

const styles = theme => ({
  notAvailable: {
    fontWeight: "500",
    color: theme.palette.common.black,
    marginTop: "10px",
    display: "block"
  },
  activeReservationBtn: {
    marginTop: "25px"
  },
  disableBtn: {
    pointerEvents: 'none',
      '& span': {
        background: '#ccc',
      },
      '& span:hover': {
        background: '#ccc',
        cursor: 'default'
      },
      '& div': {
          background: '#fbece2',
          color: '#eca167',
          padding: '10px',
          fontSize: '12px',
          lineHeight: '18px',
          borderRadius: '5px',
          margin: '10px 0',
          maxWidth: '255px',
          marginTop:'10px'
      }
  },
  disablePaymentBtn: {
    pointerEvents: 'none',
    '& span': {
      background: '#ccc',
    },
    '& span:hover': {
      background: '#ccc',
      cursor: 'default'
    },
    '& div': {
        background: '#fbece2',
        color: '#eca167',
        padding: '10px',
        fontSize: '12px',
        lineHeight: '18px',
        borderRadius: '5px',
        margin: '10px 0',
        marginTop:'10px'
    }
  },
  paymentDisableBtn :{
    pointerEvents: 'none',
    '& span': {
      marginTop:'20px'
    },
  },
  paymentMethodBtn: {
    '& Button': {
      background: theme.palette.common.transparent,
      width: '100%',
      padding: '10px',
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
          marginTop: '-2px',
          position: 'absolute',
          right: '11px',
          color: '#12bfea'
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
  caption: {
    margin: '15px 0 10px',
    maxWidth: '100%',
  },
  choosePaymentBtn: {
    '& button': {
      '& span': {
        letterSpacing: '0'
      }
    }
  },
});

class PoolAvailabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      instabooking: false,
      showEditProfilePopup: false,
      customerCanBook: false,
      disableSubmitButton: false
    };
    this.handleRequestReservation = this.handleRequestReservation.bind(this);
    this.handleEditProfilePopup = this.handleEditProfilePopup.bind(this);
  }

  componentWillMount() {
    this.checkConditions();
    const { customerInfo } = this.props;
    this.setState({
      customerCanBook: customerInfo
          && customerInfo.img_url
          && customerInfo.description
          && customerInfo.description.length >= 15
    })
  }

  componentWillReceiveProps() {
    this.checkConditions();
  }

  handleEditProfilePopup( showEditProfilePopup, success ) {
    this.setState( { showEditProfilePopup, customerCanBook: success } );
    if (success) {
      this.props.handleRequestReservation(this.state.instabooking);
    }
  }

  setButtonActiveCallback = () => {
    this.setState({
      disableSubmitButton: false
    })
  }

  handleRequestReservation() {
    this.setState({
      disableSubmitButton: true
    })
    let { from, poolDetails } = this.props;
    let accessToken = UserUtils.getAccessToken();
    if (from === 'pool_details') {
      this.props.handleRequestBooking(poolDetails.id);
    } else {
      if (accessToken !== undefined && accessToken !== null && accessToken !== '') {
        this.props.client.query({
          query: userDetailsQuery,
          fetchPolicy: "network-only"
        })
          .then((res) => {
            let customerInfo = res.data.me
            this.setState({
              customerCanBook: customerInfo
                  && customerInfo.img_url
                  && customerInfo.description
                  && customerInfo.description.length >= 15
            }, () => {
              if (!this.state.customerCanBook) {
                this.handleEditProfilePopup(true)
              } else {
                this.props.handleRequestReservation(this.state.instabooking);
                this.setState({
                  disableSubmitButton: false
                })
              }
            })
          }).catch((error) => {
            if (!this.state.customerCanBook) {
              this.handleEditProfilePopup(true)
            } else {
              this.props.handleRequestReservation();
              this.setState({
                disableSubmitButton: false
              })
            }
          });
      } else {
        this.props.handleLoginModelOpen(this.setButtonActiveCallback);
      }
    }
  }

  checkConditions() {
    let { poolDetails, searchFields } = this.props
    const isAnyDate = searchFields && searchFields.anyDate
    const isAnyTime = searchFields && searchFields.anytime

    const availableFrom = timeArray.find(time => time.time_insert === poolDetails.available_from).timeNumber
    const availableTo = timeArray.find(time => time.time_insert === poolDetails.available_to).timeNumber


    if (isAnyDate) {
      if (!isAnyTime) {
        // check if selected time range into range of pool available from and to.
        // In case if user user didn't select date but selected time
        const available = !(searchFields.timerRange.min >= availableTo || searchFields.timerRange.max <= availableFrom)
        this.setState({ available })
      } else {
        this.setState({
          available: true
        })
      }
      return
    }

    const availableDate = UserUtils.getAvailableDate()
    const date = availableDate ? moment(availableDate) : moment()
    const isToday = moment().startOf('day').isSame(moment(date).startOf('day'))

    let formattedDate = date.format('YYYY-MM-DD')
    let startTime = parseInt(UserUtils.getTimerMin())
    let endTime = parseInt(UserUtils.getTimerMax())
    startTime = startTime < availableFrom ? availableFrom : startTime
    endTime = endTime > availableTo ? availableTo : endTime

    if (isToday) {
      const currentHour = moment().hours() + 1
      startTime = startTime < currentHour ? currentHour : startTime
    }

    let poolsAvailableMonths = HelperService.getAvailableMonths(poolDetails.months)
    const searchedMonth = date.format('MM')
    if (!poolsAvailableMonths.includes(searchedMonth)) {
      this.setState({ available: false })
      return
    }

    if (
      poolDetails.unavailable_dates
      && poolDetails.unavailable_dates.length
      && poolDetails.unavailable_dates.find(d => d === formattedDate)
    ) {
      this.setState({ available: false })
      return
    }

    // logic to handle advance notice
    const minAvailableDate = moment().add(poolDetails.advance_notice, 'hours')
    const minAvailableHours = minAvailableDate.hour() < availableFrom ? availableFrom : minAvailableDate.hour()
    const currentDateTime = moment(date).hour(startTime)
    const sameDay = minAvailableDate.isSame(currentDateTime, 'd')
    const diffInHours = (endTime > availableTo ? availableTo : endTime) - minAvailableHours
    if (
      (sameDay && (diffInHours < 2))
      || (!sameDay && (minAvailableDate > currentDateTime))
    ) {
      this.setState({ available: false })
      return
    }

    const bookings = HelperService.filterBookings(poolDetails.bookings, formattedDate)
    const bookingTimes = HelperService.getBookingsTimes(bookings)

    const available = HelperService.handlePoolUnAvailabilities({
      poolUnAvailabilities: poolDetails.pool_unavailabilities,
      date: formattedDate,
      startTime,
      endTime,
      bookingTimes,
    })

    this.setState({ available })
  }

  goToPaymentMethodScreen = () => {
    this.props.history.push({
      pathname: '/payment-method',
      state: {
        needGoBackAfterUpdate: this.props.needGoBackAfterUpdate
      }
    })
  }

  render() {
    const { classes, from, poolDetails, cardLastFourDigit, cardBrand, isDefaultInstantBooking, preApprovedFlow } = this.props;
    let accessToken = UserUtils.getAccessToken();
    const { available } = this.state;

    return (
        <Fragment>
          <div>
            {from === 'search' && isDefaultInstantBooking ? (
                <label>
                  <img alt='' src={window.location.origin + "/img/time.png"} /> Book Instantly
                </label>
            ) : (
                ""
            )}

            {from === 'search' && !available ? (
                <label className={classes.notAvailable}>
                  Not available for requested time
                </label>
            ) : (
                ""
            )}

            {from === 'pool_details' ? (
                isDefaultInstantBooking ? (
                    (poolDetails.createdBy.stripe_id ? (
                      <div className={this.state.disableSubmitButton ? classes.disableBtn : ''}>
                        <Typography onClick={this.handleRequestReservation} variant="button">Book Now</Typography>
                      </div>
                    ):(
                        <div className={classes.disableBtn}>
                          <Typography variant="button" >Book Now</Typography>
                          <Typography component="div">
                            No payment can be applied because payment profile for the host isn't configured yet. Please message your host.
                          </Typography>
                        </div>
                    ))
                ) : (
                    <Typography onClick={this.handleRequestReservation} variant="button">Request to Book</Typography>
                )
            ) : (
                ""
            )}



            {from === "payment" ? (
                isDefaultInstantBooking || preApprovedFlow ? (
                    (poolDetails.createdBy.stripe_id ?(
                        <div>
                          {accessToken !== null && accessToken !== '' ? (
                              (cardLastFourDigit === '' || cardLastFourDigit === null || cardLastFourDigit === undefined) ?
                                  (<div className={classes.paymentMethodBtn + " " + classes.choosePaymentBtn}>
                                    {/*<Link to="/payment-method">*/}
                                      <Button onClick={this.goToPaymentMethodScreen}>
                                        Choose a Payment Method <i className="fa fa-angle-right"></i>
                                      </Button>
                                    {/*</Link>*/}
                                  </div>) :
                                  (<div className={classes.paymentMethodBtn}>
                                    {/*<Link to="/payment-method">*/}
                                      {cardBrand && <Button onClick={this.goToPaymentMethodScreen}>
                                        {cardBrand === ('MasterCard' || 'Mastercard (2-series)' || 'Mastercard (debit)' || 'Mastercard (prepaid)') ? <img alt="" src={window.location.origin + "/img/cards/mastercard.png"} /> : ""}
                                        {cardBrand === ('Visa' || 'Visa (debit)') ? <img alt="" src={window.location.origin + "/img/cards/visa-card.png"} /> : ""}
                                        {cardBrand === 'American Express' ? <img alt="" src={window.location.origin + "/img/cards/american.png"} /> : ""}
                                        {cardBrand === 'Discover' ? <img alt="" src={window.location.origin + "/img/cards/discover.png"} /> : ""}
                                        {cardBrand === 'Diners Club' ? <img alt="" src={window.location.origin + "/img/cards/dinnerclub.png"} /> : ""}
                                        {cardBrand === 'JCB' ? <img alt="" src={window.location.origin + "/img/cards/jcb.png"} /> : ""}
                                        {cardBrand === 'UnionPay' ? <img alt="" src={window.location.origin + "/img/cards/union.png"} /> : ""}
                                        <div className={classes.cardNumberDots}>.... .... ....  </div> {cardLastFourDigit} <i className="fa fa-angle-right"></i>
                                      </Button>}
                                    {/*</Link>*/}
                                  </div>)
                          ) : (
                              <div className={classes.paymentMethodBtn + " " + classes.choosePaymentBtn} onClick={this.props.handleLoginModelOpen}>
                                <Button>
                                  Choose a Payment Method <i className="fa fa-angle-right"></i>
                                </Button>
                              </div>
                          )
                          }
                          {this.props.errorMessage === "" ? "" : <Typography variant="caption" className={classes.caption} component="p">{this.props.errorMessage}</Typography>}
                          {!cardLastFourDigit ?(
                              <div
                                  className={classes.disablePaymentBtn +' '+ classes.paymentDisableBtn}
                              >
                                <Typography variant="button">COMPLETE PURCHASE</Typography>
                              </div>
                          ):(
                              <div>
                                <div
                                    onClick={this.handleRequestReservation}
                                    className={this.state.disableSubmitButton ? classes.disablePaymentBtn +' '+ classes.paymentDisableBtn : classes.activeReservationBtn}
                                >
                                  <Typography variant="button">COMPLETE PURCHASE</Typography>
                                </div>
                              </div>
                          )}
                        </div>
                    ):(
                        <div>
                          <div className={classes.disablePaymentBtn}>
                            <Typography component="div">
                              No payment can be applied because payment profile for the host isn't configured yet. Please message your host.
                            </Typography>

                            <Typography variant="button" >COMPLETE PURCHASE</Typography>
                          </div>
                        </div>
                    ))
                ) : (
                    <div>
                      {this.props.errorMessage === "" ? "" : <Typography variant="caption" className={classes.caption} component="p">{this.props.errorMessage}</Typography>}
                      <div
                          onClick={this.handleRequestReservation}
                          className={this.state.disableSubmitButton ? classes.disablePaymentBtn +' '+ classes.paymentDisableBtn : classes.activeReservationBtn}
                      >
                        <Typography variant="button">REQUEST RESERVATION</Typography>
                      </div>
                    </div>
                )
            ) : (
                ""
            )}
          </div>
          {this.state.showEditProfilePopup && <EditProfilePopup
            setButtonActiveCallback={this.setButtonActiveCallback}
            handlePopup={this.handleEditProfilePopup}
            isDefaultInstantBooking={isDefaultInstantBooking}
          />}
        </Fragment>
    );
  }
}
PoolAvailabilities.propTypes = {
  classes: PropTypes.object.isRequired,
  isDefaultInstantBooking: PropTypes.bool,
  preApprovedFlow: PropTypes.bool,
  needGoBackAfterUpdate: PropTypes.bool,
};

const enhance = compose(
  withStyles(styles),
  withApollo,
  withRouter
);

export default enhance(PoolAvailabilities);
