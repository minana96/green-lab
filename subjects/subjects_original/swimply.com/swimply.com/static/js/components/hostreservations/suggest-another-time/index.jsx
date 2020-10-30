import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { loader } from 'graphql.macro';

// materials components
import {
  Button, TextField, Avatar, Typography,
} from '@material-ui/core';

// components
import Calendar from './calendar';
import TimePicker from './time-picker';
import PageLoader from '../../commons/pageloader';

// styles
import styles from './styles';
import * as commonFunctions from '../../utilities/commonFunctions';

// contexts
import UserContext from '../../../contexts/UserContext';

// constants
import { TIME_DETAILS } from '../../../constants';

// graphql
const declineReservation = loader( '../../../graphql/host/declinereservations.graphql' );

class SuggestAnotherTime extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      date: new Date(),
      time: {},
      showCalendar: false,
      showTimePicker: false,
      showSpinner: false,
      message: '',
      reservationDetails: null,
    };

    this.setReservationDetails = this.setReservationDetails.bind( this );
    this.toggleCalendar = this.toggleCalendar.bind( this );
    this.toggleTimePicker = this.toggleTimePicker.bind( this );
    this.handleCalenderApply = this.handleCalenderApply.bind( this );
    this.handleTimePickerApply = this.handleTimePickerApply.bind( this );
    this.onChange = this.onChange.bind( this );
    this.submit = this.submit.bind( this );
  }

  componentDidMount() {
    this.setReservationDetails();
  }

  setReservationDetails() {
    this.setState( {
      reservationDetails: this.props.location.state && this.props.location.state.reservationDetails,
    }, () => {
      if ( !this.state.reservationDetails ) {
        this.props.history.replace( '/host-reservation' );
      }
    } );
  }

  toggleCalendar( showCalendar ) {
    this.setState( {
      showTimePicker: false,
      showCalendar,
    } );
  }

  toggleTimePicker( showTimePicker ) {
    this.setState( {
      showCalendar: false,
      showTimePicker,
    } );
  }

  handleCalenderApply( date ) {
    this.setState( { date } );
  }

  handleTimePickerApply( time ) {
    this.setState( { time } );
  }

  onChange( { target: { value: message } } ) {
    this.setState( { message } );
  }

  submit() {
    this.setState( { showSpinner: true } );
    const date = new Date( this.state.date );
    const day = date.getDate();
    const year = date.getUTCFullYear();
    const monthVal = date.getMonth() + 1;
    const available = `${year}-${monthVal}-${day}`;

    this.props.client
      .mutate( {
        mutation: declineReservation,
        variables: {
          data: {
            booking_id: this.state.reservationDetails.id,
            decline_reason: this.state.message,
            date: available,
            from: TIME_DETAILS[this.state.time.startIndex],
            to: TIME_DETAILS[this.state.time.endIndex],
          },
        },
      } )
      .then( ( { data: { declineReservation } } ) => {
        if ( declineReservation.status === 'DECLINED_BOOKING_SUCCESSFULL' ) {
          this.props.history.goBack();
        } else {
          this.setState( { showSpinner: false } );
        }
      } )
      .catch(async ( error ) => {
        const errorMsg = commonFunctions.parseGraphQLErrorMessage( error );
        if ( errorMsg === 'Unauthenticated.' ) {
          const status = await this.props.refreshToken(this.props.history)
          if (status === 'ok') {
            this.submit()
          }
        }
        this.setState( { showSpinner: false } );
      } );
  }

  render() {
    const { classes } = this.props;
    const { reservationDetails } = this.state;

    if ( !reservationDetails ) {
      return (
        <PageLoader loading />
      );
    }

    return (
      <Typography variant="body1" component="div">
        <div className={classes.container}>
          <div className={classes.suggestAnotherTimeInfoContainer}>
            <Typography variant="h2" component="h2" className={classes.title}>Suggest Different Time</Typography>
            <div className={classes.infoContainer}>
              <Avatar
                alt="profile image"
                className={classes.viewProfileAvatar}
                src={reservationDetails.user.img_url || `${window.location.origin}/img/profile-icon.png`}
              />
              <div className={classes.info}>
                {
                  reservationDetails.user
                  && (
                    <Typography variant="h3">
                      {reservationDetails.user.firstname
                      + ( reservationDetails.user.lastname ? ` ${reservationDetails.user.lastname.charAt( 0 ).toUpperCase()}` : '' )}
                      .
                    </Typography>
                  )
                }
                <Typography
                  className={classes.poolName}
                >
                  {reservationDetails.pool.title}
                </Typography>
                <p>
                  <Moment format="MMMM DD, YYYY">{reservationDetails.date}</Moment>
                </p>
                <p>
                  <Moment format="h:mm A">
                    {`${reservationDetails.date} ${reservationDetails.from}`}
                  </Moment>
                  <span> - </span>
                  <Moment format="h:mm A" add={{ hours: 1 }}>
                    {`${reservationDetails.date} ${reservationDetails.to}`}
                  </Moment>
                </p>
                <p>
                  Adults:
                  {' '}
                  {reservationDetails.adult_guests}
                  ,
                  Children:
                  {' '}
                  {reservationDetails.children_guests}
                  ,
                  Infants:
                  {' '}
                  {reservationDetails.infant_guests}
                </p>
                <p>{reservationDetails.reason_for_booking}</p>
              </div>
            </div>
          </div>
          <div className={classes.newReservationDateFormContainer}>
            <Typography variant="h5">NEW RESERVATION DATE AND TIME</Typography>
            <div className={classes.timeAndDateContainer}>
              <Calendar
                toggleCalendar={this.toggleCalendar}
                handleApply={this.handleCalenderApply}
                date={this.state.date}
                show={this.state.showCalendar}
              />
              <TimePicker
                toggleTimePicker={this.toggleTimePicker}
                handleApply={this.handleTimePickerApply}
                show={this.state.showTimePicker}
                date={this.state.date}
                time={this.state.time}
              />
            </div>
            <div className={classes.textFieldContainer}>
              <TextField
                multiline
                label="Send message to user*"
                rows="5"
                variant="outlined"
                onChange={this.onChange}
              />
            </div>
            <Button
              onClick={this.submit}
              className={classes.submitButton}
              disabled={!this.state.message}
            >
              Submit new time
            </Button>
          </div>
        </div>
        {this.state.showSpinner && <PageLoader loading />}
      </Typography>
    );
  }
}

SuggestAnotherTime.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  hideSuggestAnotherTime: PropTypes.func.isRequired,
};

SuggestAnotherTime.defaultProps = {
  classes: {},
  theme: {},
  hideSuggestAnotherTime: () => {},
};

const enhance = compose(
  withStyles( styles, { withTheme: true } ),
  withRouter,
  withApollo,
);


function SuggestAnotherTimeContainer (props) {
  const userContext = useContext(UserContext)
  return <SuggestAnotherTime {...userContext} {...props} />
}

export default enhance(SuggestAnotherTimeContainer);
