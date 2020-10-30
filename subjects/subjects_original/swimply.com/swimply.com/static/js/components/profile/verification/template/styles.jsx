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
    fontSize: '15px',
    fontWeight: '400',
  },
  marginVertical: {
    margin: '15px 0',
  },
  marginTop: {
    marginTop: '30px'
  },
  marginBottom: {
    marginBottom: '20px'
  },
  uploadImageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
    border: '1px dashed #CDCDCD',
    borderRadius: '6px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundColor: '#F8F8F8',
    cursor: 'pointer',
  },
  uploadImageText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '200px',
    textAlign: 'center',
    '&:before': {
      content: `''`,
      display: 'inline-block',
      marginBottom: '8px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    '&.passport:before': {
      width: '50px',
      height: '30px',
      backgroundImage: 'url(/img/screens/verification/passport.png)',
    },
    '&.owner:before': {
      width: '30px',
      height: '50px',
      backgroundImage: 'url(/img/screens/verification/owner.png)',
    },
    '&.hidden': {
      opacity: '0'
    }
  },
  alert: {
    display: 'flex',
    '&:before': {
      content: `''`,
      display: 'inline-block',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: 'url(/img/commons/alert.png)',
    }
  },
  button: {
    display: 'block',
    width: '100%',
    maxWidth: '320px',
    padding: '10px 0',
    margin: '0 auto',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue,
    outline: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.1s ease',
    '&:hover': {
      opacity: '0.8'
    },
    '&[disabled]': {
      backgroundColor: theme.palette.common.gray,
      '&:hover': {
        opacity: '1'
      }
    }
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
  hiddenInput: {
    opacity: 0,
    height: 0,
    width: 0,
  }
})

export default styles
