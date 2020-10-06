export default theme => ({
  container: {

  },
  declineButton: {
    marginLeft: '10px',
    padding: '10px 25px',
    background: 'transparent',
    border: '1px solid lightgray',
    borderRadius: '6px',
    outline: 'none',
    color: '#5e5e5e',
    transition: 'all 0.1s ease',
    '&:hover': {
      background: 'transparent',
      color: '#323232',
    }
  },
  selectContainer: {
    marginTop: '20px'
  },
  dropDownTitle: {
    maxWidth: '300px',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 400
  },
  selectDeclineReason: {
    width: '100%'
  },
  popupButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '0px',
    marginTop: '20px',
    borderTop: '1px solid #fff',
    '& span:last-child': {
      background: theme.palette.common.transparent,
      color: theme.palette.common.blue,
      fontSize: '12px'
    }
  },
  mainButton: {
    width: '100%',
    maxWidth: '260px',
    padding: '12px 20px',
    '& span:last-child, span:first-child': {
      padding: '0',
      fontSize: '14px',
      color: '#fff'
    },
    '&:disabled': {
      opacity: '0.6'
    }
  },
  cancelBtn: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '5px'
  },
  blueBox: {
    margin: '10px 0',
    padding: '12px',
    border: '1px solid #00c8f0',
    color: '#00c8f0',
    '& p': {
      margin: '0'
    }
  }
})