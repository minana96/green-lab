export default theme => ({
  wrapper: {
    padding: '40px 0',
    maxWidth: '1170px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '480px',
    width: '100%',
    padding: '0 15px',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box'
    },
    '&.mobile-none-padding': {
      '@media (max-width: 480px)':{
        padding: '0'
      }
    },
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
    marginBottom: '10px',
    '& h2': {
      fontSize: '18px'
    }
  },
  backStep: {
    position: 'absolute',
    left: '0',
    top: '6px',
    display: 'inline-block',
    marginBottom: '10px',
    fontWeight: '500',
    color: theme.palette.common.blue,
    cursor: 'pointer',
    '& i': {
      fontSize: '22px',
      verticalAlign: ' text-bottom',
      marginRight: '3px',
      marginTop: '-1px',
    },
    '@media (max-width:767px)':{
      top: '0',
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: '0px',
      '& i': {
        fontSize: '30px',
      }
    }
  },
  blueMessageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '7px 0',
    padding: '25px',
    backgroundColor: '#e6f9fd',
    borderRadius: '5px',
    '& p': {
      maxWidth: '250px',
      margin: 0,
      color: '#91999f',
    },
    '& .exclamation-blue-icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px',
      borderRadius: '15px',
      backgroundColor: theme.palette.common.blue,
      color: '#fff',
      fontSize: '14px'
    }
  },
  hostInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '& .price': {
      fontSize: '14px',
      fontWeight: '500',
      color: theme.palette.common.blue,
    },
    '& .hosted': {
      fontSize: '14px',
      fontWeight: '400',
      color: theme.palette.common.darkgray,
    },
    '& .hosted-container': {
      display: 'flex',
      alignItems: 'center',
      margin: '3px 0 5px',
    },
  },
  avatar: {
    width: '70px',
    height: '70px',
  },
  paddingNoneRight: {
    paddingRight: '0 !important'
  },
  onFocusCalendar: {
    '& div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    '& span': {
      filter: "grayscale(0)"
    }
  },
  onFocusTimer: {
    '& div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    '& span': {
      filter: "grayscale(0)"
    }
  },
  formInputBox: {
    position: 'relative',
    marginBottom: '15px',
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: 'uppercase',
      fontWeight: 600,
      '&.light': {
        fontSize: 12,
        fontWeight: 300
      }
    },
    '& input': {
      background: theme.palette.common.gray,
      position: 'relative',
      width: '100%',
      padding: '15px 35px',
      fontWeight: 'normal',
    },
    '& span': {
      filter: 'grayscale(1)',
      position: 'absolute',
      top: '1px',
      bottom: '0',
      margin: 'auto',
      height: '0px',
      left: '7px',
    },
  },
  dropDownSelectTime: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '14px 15px 13px 35px',
    fontSize: '14px',
    fontWeight: 'normal',
    whiteSpace: 'pre',
    border: '1px solid #e8e8e8',
    '& i': {
      float: 'right',
      fontSize: '22px',
    }
  },
  textFieldContainer: {
    marginTop: '20px',
    '& > div': {
      width: '100%',
    },
    '@media (max-width: 360px)': {
      '& label': {
        fontSize: '14px',
      }
    }
  },
  nextButton: {
    width: '100%',
    padding: '10px 15px',
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
    },
  },
  disableBtn: {
    background: '#ccc',
    width: '100%',
    padding: '10px 15px',
    cursor: 'default',
    '&:hover': {
      background: '#ccc',
    },
  },
  buttonContainer: {
    marginTop: '20px'
  },
  hostedContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '3px 0 5px'
  },
  verified: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 8px',
    fontSize: '12px',
    fontWeight: '700',
    color: theme.palette.common.blue,
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '14px',
      height: '16px',
      marginRight: '4px',
      background: `url(/img/commons/verified.png) no-repeat center/contain`,
    }
  }
})