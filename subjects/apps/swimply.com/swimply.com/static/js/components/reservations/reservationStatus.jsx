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
const pooldetailsQuery = loader('./../../graphql/findpool/pooldetailsQuery.graphql');


const styles = theme => ({
  successPage:{
    background: '#fff',
    boxShadow: '0 0 3px #ccc',    
    width:' 100%',
    maxWidth: '650px',
    margin: '-165px auto 0 auto',
    position: 'relative', 
    textAlign: 'center',
    padding: '25px', 
  },
  successPageTop:{
    borderBottom: '1px solid #f3f5f5',
    paddingBottom: '25px',
    margin: '0 -25px 25px',
    '& p':{
      fontSize:'12px',
      marginTop:'5px',
    },
    '& h2':{
      fontSize:'25px',
    }
  },
  successPageBottom:{
    maxWidth:'300px',
    margin:'0 auto',
    '& h3': {
      marginBottom: '8px',
    },
    '& p':{
      fontSize:'13px',
      marginTop:'8px',
    },
    '& span':{
      display:'inline-block',
      marginTop:'20px'
    }
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
class ReservationSuccess extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails:'',
      poolDetails:'',
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
          bookingDetails:poolBookingDetails
        })
      }).catch((error) => {
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
    const {bookingDetails, poolDetails} = this.state;
    let fullDate = new Date(bookingDetails.date);
    
    fullDate = moment(fullDate).format('ddd, MMMM DD, YYYY');
    
    return (
      <Typography variant="body1" component="span">
        <img className={classes.reservationSuccessImg} src={window.location.origin + "/img/reservation_banner.png"} alt=""></img>
        <div className={classes.successPage}>
           <div className={classes.successPageTop}>
           
           <Typography variant="h2">
           {bookingDetails.status === 'book_this_pool'?'You booked this pool!':'Reservation Requested'}
           </Typography>
           <p>The host has been noticed and is excited for you a take a dip!</p>
           </div>
           <div className={classes.successPageBottom}>
           <Typography variant="h3">
            {poolDetails.title}
           </Typography>
                {bookingDetails.status === 'book_this_pool'?(
                  <p>{poolDetails.city}, {poolDetails.state} 
                  {poolDetails.zip_code !== '00000'?(', '+poolDetails.zip_code):''}</p>
                ):('Address will be shown after confirmation')}

                <p>{fullDate} from {bookingDetails.from} to {bookingDetails.to}</p>

              <Link to="/my-reservation">
                <Typography variant="button">
                  View my Reservations
                </Typography>
              </Link>
            </div>
           
        </div>
      </Typography>
    );
  }
}

ReservationSuccess.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(ReservationSuccess);
