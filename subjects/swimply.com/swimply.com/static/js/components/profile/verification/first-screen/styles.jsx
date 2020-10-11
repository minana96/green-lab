const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '40px 0',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    color: '#161616',
    '& *': {
      boxSizing: 'border-box',
    },
  },
  innerContainer: {
    maxWidth: '400px',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  paddingHorizontal: {
    padding: '0 15px'
  },
  alignItemsCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
  },
  text: {
    margin: '0',
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.common.darkgray,
  },
  marginVertical: {
    margin: '15px 0',
  },
  marginTop: {
    marginTop: '30px'
  },
  marginBottom: {
    marginBottom: '15px'
  },
  button: {
    padding: '15px',
    marginBottom: '15px',
    border: '1px solid #cdcdcd',
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.common.blue,
      opacity: '0.8',
    }
  },
  buttonTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 10px 0',
    fontSize: '16px',
    fontWeight: '500',
    '& .right-blue-arrow': {
      fontSize: '20px',
      color: theme.palette.common.blue,
    },
    '& .text': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .text:before': {
      content: `''`,
      display: 'inline-block',
      marginRight: '6px',
      width: '26px',
      height: '26px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
    '&.passport .text:before': {
      height: '18px',
      backgroundImage: 'url(/img/screens/verification/passport.png)',
    },
    '&.owner .text:before': {
      width: '20px',
      backgroundImage: 'url(/img/screens/verification/owner.png)',
    },
    '&.booking .text:before': {
      width: '24px',
      height: '24px',
      backgroundImage: 'url(/img/screens/verification/booking.png)',
    },
  },
  buttonText: {
    margin: '0'
  },
  verifiedProgressIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '4px',
    '& .verified': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.common.blue,
      zIndex: '10',
      filter: 'grayscale(1)',
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '22px',
        height: '24px',
        background: `url(/img/commons/verified-white-border.png) no-repeat center/contain`,
      },
      '&.active': {
        filter: 'grayscale(0)',
      }
    }
  },
  progressBarContainer: {
    margin: '15px 0 40px',
  },
  alertMessage: {
    display: 'flex',
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '18px',
      height: '18px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: 'url(/img/commons/alert.png)',
    }
  },
})

export default styles
