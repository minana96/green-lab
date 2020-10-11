const styles = theme => ({
  container: {
    maxWidth: '400px',
  },
  subTitle: {
    marginTop: '5px',
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    '& img': {
      width: '100%',
    },
  },
  list: {
    margin: '0',
    paddingLeft: '20px',
    color: theme.palette.common.darkgray
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  button: {
    width: '100%',
    maxWidth: '270px',
    padding: '10px 0',
    transition: 'opacity 0.1s ease-in-out',
    '&:first-child': {
      marginBottom: '10px',
    },
    '&:hover': {
      opacity: '0.8',
    }
  }
})

export default styles
