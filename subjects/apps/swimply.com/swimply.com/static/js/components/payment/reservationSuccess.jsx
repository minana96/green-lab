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
import Pageloader from './../commons/pageloader';
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
      fontSize:'14px',
      marginTop:'10px',
      marginBottom: '0px',
      color: theme.palette.common.black,
      fontWeight: '400'
    },
    '& span':{
      display:'inline-block',
      marginTop:'20px',
      padding: '8px 30px'
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
          loading: false,
        })
      }).catch((error) => {
        this.setState({ loading: false });
      });
    } else {
      history.push('/')
    }
  }

  /**
   * render
   */
  render() {
    const { classes } = this.props;
    const { loading, bookingDetails, poolDetails, userRole } = this.state;
    return (
      <Typography variant="body1" component="span">
        {loading === true ? <Pageloader loading={loading} /> : ''}
        <img className={classes.reservationSuccessImg} src={window.location.origin + "/img/reservation_banner.png"} alt=""></img>
        <div className={classes.successPage}>
           <div className={classes.successPageTop}>
           
           <Typography variant="h2">
           {bookingDetails.status === 'book_this_pool'?'Your pool is booked!':'Reservation Requested'}
           </Typography>
           <p>
           {bookingDetails.status === 'book_this_pool'?'The host has been notified and is excited for you a take a dip!':'Your request has been sent to the host for review. Once approved, you will be asked to confirm and proceed to checkout.'}
           </p>
           <p></p>
           </div>
           <div className={classes.successPageBottom}>
           <Typography variant="h3">
            {poolDetails.title}
           </Typography>

                {bookingDetails.status === 'book_this_pool'?(
                  <p>{poolDetails.full_address}</p>
                ):('Address will be shown after confirmation')}

                <p>{bookingDetails.date} from {bookingDetails.from} to {bookingDetails.to}</p>

              {userRole === 'Host'?(
                <Link to="/host-reservation" onClick={() => {UserUtils.setPreviousUrl('reservation-success')}}>
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

ReservationSuccess.propTypes = {
  classes: PropTypes.object.isRequired
};

const enhance = compose(
  withStyles(styles),
  withRouter,
  withApollo
);

export default enhance(ReservationSuccess);
