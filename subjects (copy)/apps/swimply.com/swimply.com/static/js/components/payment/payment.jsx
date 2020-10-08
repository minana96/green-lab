import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PaymentForm from './paymentform';
import PoolDetailsInfo from '../commons/pooldetailsinfo';
import { withApollo } from "react-apollo";
import { loader } from 'graphql.macro';
import Pageloader from './../commons/pageloader';
import UserUtils from '../utilities/UserUtils';
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');
const serviceChargeQuery = loader('./../../graphql/findpool/serviceChargeQuery.graphql');


const styles = theme => ({
  container: {
    maxWidth: '1170px',
		margin: '0 auto',
		width: '100%',
		padding: '25px',
		boxSizing: 'border-box',
		// '@media (max-width:400px)': {
		// 	padding: '0 15px',
    // },
    // '& > a': {
    //   width: '100%',
    //   '@media (max-width: 850px)': {

    //   }
    // },
    '& font': {
      color: '#16c0ea',
      cursor: 'pointer',
      marginBottom: '5px',
      display: 'inline-block',
      '&:hover': {
        color: theme.palette.common.black,
      },
      '@media (max-width:850px)': {
        width: '45px',
        height: '45px',
        fontSize: '30px',
        overflow: 'hidden',
        paddingLeft: '15px',
        color: '#232323',
      }
    },
    // maxWidth: '1170px',
    // margin: '0 auto',
    // width: '100%',
    // padding: '0 15px',
    // '@media (max-width:1170px)': {
    //   maxWidth: '992px',
    // },
    // '@media (max-width:1000px)': {
    //   maxWidth: '750px',
    // },
    // '@media (max-width:767px)': {
    //   width: 'calc(100% - 30px)',
    // }

  },
  poolDetailsContainer: {
    // paddingTop: '40px',
    // '& h2': {
    //   display: 'inline-block',
    //   fontSize: '25px',
    // }
  },
  paymentContainer: {
    '& h2': {
      display: 'block',
      fontSize: '33px',
      fontWeight: 600,
      marginBottom: '20px',
      '@media (max-width:850px)': {
        marginBottom: '0',
        paddingLeft: '15px'
      },
    },
    '& h3': {
      fontSize: '20px',
      marginBottom: '5px',
    },
    '& h4': {
      fontSize: '14px',
      marginBottom: '10px',
    },

    // '& p': {
    //   marginTop: '0'
    // },
    '& font': {
      color: '#16c0ea',
      cursor: 'pointer',
      marginBottom: '5px',
      display: 'inline-block',
      '&:hover': {
        color: theme.palette.common.black,
      },
      '@media (max-width:850px)': {
        width: '45px',
        height: '45px',
        fontSize: '30px',
        overflow: 'hidden',
        paddingLeft: '15px',
        color: '#232323',
      }
    },
    '@media (max-width:850px)': {
      position: 'fixed',
      background: '#fff',
      zIndex: '99',
      left: '0',
      right: '0',
      top: '0',
      margin: 'auto',
      width: 'calc(100% - 0px)',
      height: '100%',
      overflow: 'auto',
    }
  },
  mobileHide: {
    display: 'block',
    '@media (max-width:850px)': {
      display: 'none'
    }
  },
  mobileShow: {
    display: 'none',
    '@media (max-width:850px)': {
      display: 'block'
    }
  }
});

/**
 * Login Form
 */
class Payment extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      poolDetails: [],
      booking: [],
      hourlyPrice: 0,
      serviceCharge: 0,
      referalDiscount: 0,
      poolId: '',
      loading: true
    };
  }

  componentDidMount() {
    UserUtils.removePaymentFromId();
    window.scrollTo(0, 0);
    let { history } = this.props;
    let poolId = UserUtils.getPoolId();
    poolId = parseInt(this.props.match.params.id);
    if (isNaN(poolId)) {
      history.push('/');
    } else {
      this.setState({
        loading: true,
        poolId: poolId
      })
      this.props.client.query({
        query: pooldetailsQuery,
        variables: {
          "id": poolId
        },
        fetchPolicy: "network-only"
      })
        .then((res) => {
          if (res.data.pool === null) {
            UserUtils.removePoolId(poolId);
            history.push('/');
          } else {
            UserUtils.setPoolId(poolId);
            if (!(res.data.pool.status === 1 || res.data.pool.status === 5)) {
              history.push('/');
            }
            this.setState({
              poolDetails: res.data.pool,
              hourlyPrice: res.data.pool.hourly_price,
            })
          }
        }).catch((error) => {
        });
      let data = {
        "id": parseInt(poolId),
        "percentage": this.state.hourlyPrice
      }

      this.props.client.query({
        query: serviceChargeQuery,
        variables: data,
        fetchPolicy: "network-only"
      })
        .then((res) => {
          let service_fee_index = res.data.serviceCharge.findIndex(x => x.name === "service_fee");
          let referal_fee_index = res.data.serviceCharge.findIndex(x => x.name === "referral_credit");
          this.setState({
            serviceCharge: res.data.serviceCharge[service_fee_index].percentage,
            referalDiscount: res.data.serviceCharge[referal_fee_index].percentage,
            poolId: poolId,
            loading: false
          })
        }).catch((error) => {
          this.setState({ loading: false })
        });
    }

  }

  handleRequestReservation(data) {
    let { history } = this.props;
    history.push('/reservation-success');
  }

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    let { loading, poolDetails, hourlyPrice, serviceCharge, poolId, referalDiscount } = this.state;
    return (
      <Typography variant="body1" component="span">
        {loading === true ? <Pageloader loading={loading} /> : ''}
        {/* <div className={classes.poolDetailsContainer}> */}
          <div className={classes.container}>
            <div className={classes.paymentContainer}>
              {/* <Grid item xs={12} sm={12} md={8}> */}
              <div className={classes.mobileShow}>
                <Link to={"/pooldetails/" + poolId}>
                  <font><i className="fa fa-angle-left" aria-hidden="true"></i> BACK</font>
                </Link>
                <Typography variant="h2">Request a reservation</Typography>
              </div>
                <div className={classes.mobileHide}>
                  {/* <Typography variant="h4">{poolDetails.title}</Typography> */}
                  {/* {poolDetails.full_address !== undefined ? (
                    <p>{(poolDetails.city !== '' && poolDetails.city !== null) ? poolDetails.city + ', ' : ''} {(poolDetails.state !== '' && poolDetails.state !== null) ? poolDetails.state + ', ' : ''} {poolDetails.zip_code !== '00000' ? ('' + poolDetails.zip_code) : ''}</p>
                  ) : ''} */}
                  <PoolDetailsInfo
                    paymentForm={(poolDetails.id !== undefined) ? true : false}
                    poolDetails={poolDetails}
                    from="payment"
                    hourlyPrice={hourlyPrice}
                    serviceCharge={serviceCharge}
                    referalDiscount={referalDiscount}
                    poolId={poolId}
                    handleRequestReservation={this.handleRequestReservation.bind(this)}
                  />
                </div>
              {/* </Grid> */}
              {poolDetails.id !== undefined && poolDetails !== ''?(
                // <Grid item xs={12} sm={12} md={4}>
                <div className={classes.mobileShow}>
                  <PaymentForm
                    poolDetails={poolDetails}
                    hourlyPrice={hourlyPrice}
                    serviceCharge={serviceCharge}
                    referalDiscount={referalDiscount}
                    poolId={poolId}
                    handleRequestReservation={this.handleRequestReservation.bind(this)}
                  />
                </div>
                // </Grid>
              ):''}
              
            </div>
          </div>
        {/* </div> */}
      </Typography>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(Payment);
