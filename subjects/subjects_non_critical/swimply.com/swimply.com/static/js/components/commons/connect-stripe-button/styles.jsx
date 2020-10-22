const styles = theme => ({
  popupContainer: {
    minWidth: '250px'
  },
  subTitle: {
    marginTop: '5px',
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  select: {
    maxWidth: '300px',
    width: '100%',
  },
  buttonsContainer: {
    display: 'flex',
    margin: '40px 0 0',
  },
  okButton: {
    maxWidth: '70px',
    transition: 'all 0.2s ease',
  },
  cancelButton: {
    maxWidth: '70px',
    background: 'transparent',
    color: theme.palette.common.blue,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common.blue,
      opacity: '0.9',
    },
  },
})

export default styles
