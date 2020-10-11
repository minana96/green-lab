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
  title: {
    fontSize: '18px',
  },
  text: {
    margin: '0',
    fontSize: '15px',
    fontWeight: '400',
  },
  marginTop: {
    marginTop: '30px'
  },
  marginBottom: {
    marginBottom: '20px'
  },
  listTitle: {
    margin: '25px 0 0',
    fontSize: '16px',
    fontWeight: '500',
  },
  verifiedList: {
    margin: '0',
    paddingLeft: '20px',
    color: theme.palette.common.darkgray
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
  blueBox: {
    margin: '10px 0',
    padding: '12px',
    border: `1px solid ${theme.palette.common.blue}`,
    color: theme.palette.common.blue,
    '& p': {
      margin: '0'
    }
  },
})

export default styles
