const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '40px 15px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    '& *': {
      boxSizing: 'border-box',
    },
    '& p': {
      margin: '0',
    }
  },
  innerContainer: {
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontWeight: '500',
    color: theme.palette.common.black,
  },
  light: {
    fontWeight: 'lighter',
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #dadfdf',
  },
  rightBlueArrow: {
    position: 'absolute',
    right: '12px',
    fontSize: '20px',
    color: theme.palette.common.blue,
  },
  beforeImage: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontWeight: '500',
    color: theme.palette.common.black,
    '&:before': {
      content: `''`,
      width: '15px',
      height: '15px',
      marginTop: '-3px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    '&.call:before': {
      backgroundImage: 'url(/img/screens/profile/call-us.png)',
    },
    '&.email:before': {
      backgroundImage: 'url(/img/screens/profile/email-us.png)',
    },
  }
})

export default styles
