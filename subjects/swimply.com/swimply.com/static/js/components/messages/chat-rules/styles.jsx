export default (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '1170px',
    width: '100%',
    margin: '0 auto',
    padding: '0 15px',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box'
    },
    '@media (max-width: 420px)':{
      padding: '0',
    },
  },
  innerContainer: {
    maxWidth: '420px',
    padding: '20px 0',
  },
  padding: {
    padding: '0 18px',
  },
  backContainer: {
    display: 'inline-block',
    padding: '8px 18px',
    fontWeight: '500',
    fontSize: '34px',
    color: theme.palette.common.black,
    cursor: 'pointer',
  },
  disableButton: {
    background: '#ccc',
    cursor: 'default',
    '&:hover': {
      background: '#ccc',
    }
  },
  title: {
    marginTop: '10px',
    marginBottom: '15px',
    fontSize: '18px',
    fontFamily: "'Poppins', sans-serif",
    color: '#161616',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageIcon: {
    width: '20px',
    height: '20px',
    marginRight: '15px',
  },
  message: {
    margin: '0',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    color: '#161616',
  },
  buttonContainer: {
    maxWidth: '420px',
    marginTop: '20px',
  },
  keepIcon: {
    width: '22px',
    height: '20px',
  },
  safeIcon: {
    width: '20px',
    height: '28px',
  },
  checkBoxBorder: {
    borderTop: '1px solid #EAEAEA',
    borderBottom: '1px solid #EAEAEA',
  }
})