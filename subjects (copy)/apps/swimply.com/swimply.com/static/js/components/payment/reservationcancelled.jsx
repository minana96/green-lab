import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import { Link } from 'react-router-dom';
import UserUtils from '../utilities/UserUtils';
import { loader } from 'graphql.macro'; 
import moment from 'moment';
import Pageloader from '../commons/pageloader';
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');

const styles = theme => ({
  successPage:{
    background: '#fff',
    boxShadow: '0 0 3px #ccc',    
    width:' 100%',
    maxWidth: '500px',
    margin: '-165px auto 0 auto',
    position: 'relative', 
    textAlign: 'center',
    padding: '25px', 
    '@media (max-width:767px)':{
      width:'75%',
    }
  },
  successPageTop:{
    borderBottom: '1px solid #f3f5f5',
    paddingBottom: '25px',
    margin: '0 -25px 25px',
    '& p':{
      fontSize:'12px',
      marginTop:'5px',
      padding:'0 15px'
      
    },
    '& h2':{
      fontSize:'16px',
    }
  },
  successPageBottom:{
    maxWidth:'300px',
    margin:'0 auto',
    '& h3': {
      marginBottom: '8px',
    },
    '& p':{
      fontSize:'14px',
      marginTop:'0px',
      color: theme.palette.common.black,
      marginBottom: '0'
    },
    '& span':{
      display:'inline-block',
      marginTop:'20px'
    }
  },
  successPageMessage:{
    background:'#fdece2',
    padding:'15px 15px',
    textAlign:'left',
    margin: '30px 0 20px',
    '& p':{
      color:'#f7a371',
      marginTop: 0,
      marginBottom: 0,
      '& font':{
        textTransform:'uppercase',
      }
    }
  },
  '& font':{
    textTransform:'uppercase',
  },
  reservationSuccessImg: {
    width: '100%',
    '@media (max-width:767px)':{
      minHeight:'200px',
    }
  }
  
});

/**
 * Login Form
 */
class ReservationCancelled extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    let userRole = UserUtils.getUserRole();
    this.state = {
      bookingDetails:'',
      poolDetails:'',
      loading: false,
      userRole:userRole
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let { history } = this.props;
    let poolBookingDetails = UserUtils.getPoolBookingStatus();
    if(poolBookingDetails !== null && poolBookingDetails !== '') {
      poolBookingDetails = JSON.parse(poolBookingDetails);
      let id = poolBookingDetails.pool_id;
      let poolId = parseInt(id);
      this.setState({ loading: true })
      this.props.client.query({
        query: pooldetailsQuery,
        variables: { 
          "id": poolId
        },
        fetchPolicy:"network-only"
      })
      .then((res) => {
        UserUtils.removePoolBookingStatus();
        this.setState({ 
          poolDetails: res.data.pool,
          bookingDetails:poolBookingDetails,
          loading: false
        })
      }).catch((error) => {
        this.setState({ loading: false });
      });
    } else {
      history.push('/')
    }


  }
  successfulBooking(data) {
    window.location.href = '/payment-method';
  }
  /*
    <font></font> 
  */

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    const { loading, bookingDetails, poolDetails, userRole } = this.state;
    let fullDate = new Date(bookingDetails.date);   
    fullDate = moment(fullDate).format('ddd, MMMM DD, YYYY');
    
    return (
      <Typography variant="body1" component="span">
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <img className={classes.reservationSuccessImg} src={window.location.origin + "/img/reservation_banner.png"} alt=""></img>
        <div className={classes.successPage}>
           <div className={classes.successPageTop}>
           
           <Typography variant="h2">
           Reservation cancelled
           </Typography>
           <p>The host has been notified.</p>
           </div>
           <div className={classes.successPageBottom}>
           <Typography variant="h3">
            {poolDetails.title}
           </Typography>
                <p>{fullDate} </p>
                <p>from <font>{bookingDetails.from}</font> to <font>{bookingDetails.to}</font></p>
                <div className={classes.successPageMessage}>
                  <p>You may be charged for this cancelled reservation per the Host's cancellation policy. refunds due to weather are granted at the hosts's discretion. </p>
                </div>

              {userRole === 'Host'?(
                <Link to="/host-reservation">
                  <Typography variant="button">
                    View my Reservations
                  </Typography>
                </Link>
               ):(
                 <Link to="/my-reservation">
                  <Typography variant="button">
                    View my Reservations
                  </Typography>
                </Link>
               )}
            </div>
           
        </div>
      </Typography>
    );
  }
}

ReservationCancelled.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(ReservationCancelled);
