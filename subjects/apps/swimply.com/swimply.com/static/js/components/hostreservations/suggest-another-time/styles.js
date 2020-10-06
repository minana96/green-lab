const styles = theme => ( {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '40px 15px',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width:1000px)': {
      flexDirection: 'column',
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
  title: {
    marginBottom: '40px',
  },
  poolName: {
    marginBottom: '0',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: '14px',
    letterSpacing: '0.5px',
    color: theme.palette.common.black,
  },
  suggestAnotherTimeInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
  },
  infoContainer: {
    display: 'flex',
    boxShadow: '0 0 3px #ccc',
    padding: '25px 15px',
  },
  info: {},
  viewProfileAvatar: {
    width: '60px',
    height: '60px',
    marginRight: '10px',
  },
  newReservationDateFormContainer: {
    borderRadius: '5px',
    padding: '25px',
    boxShadow: '0 0 3px #ccc',
    color: '#232325',
    '@media (max-width:1000px)': {
      maxWidth: '600px',
      marginTop: '20px',
      boxSizing: 'border-box',
      '& > *': {
        maxWidth: '350px',
      },
    },
  },
  timeAndDateContainer: {
    marginTop: '10px',
  },
  textFieldContainer: {
    '& > div': {
      width: '100%',
    },
  },
  submitButton: {
    width: '100%',
    marginTop: '15px',
    '&[disabled]': {
      opacity: '0.6',
    },
  },
} );

export default styles;
