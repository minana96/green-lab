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
  },
  innerContainer: {
    maxWidth: '400px',
    width: '100%',
  },
  alignItemsCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    margin: '0',
    color: theme.palette.common.blue,
    cursor: 'pointer'
  },
  marginBottom: {
    marginBottom: '10px',
  },
  title: {
    fontWeight: '500',
    color: theme.palette.common.black,
  },
  avatarContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginRight: '15px',
    borderRadius: '50%',
    '&:after': {
      content: `''`,
      position: 'absolute',
      bottom: '0',
      left: '0',
      display: 'block',
      width: '100%',
      height: '30px',
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '16px',
      backgroundImage: 'url(/img/screens/profile/camera.png)',
      cursor: 'pointer',
    }
  },
  avatar: {
    width: '70px',
    height: '70px',
  },
  imageCoverInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    // top: '0',
    // left: '0',
    // right: '0',
    // bottom: '0',
    opacity: '0',
    outline: 'none',
    cursor: 'pointer',
    // zIndex: '10',
  },
  popupContainer: {
    padding: '0 !important',
    minWidth: '300px',
    boxSizing: 'border-box',
    textAlign: 'center',
    '& *': {
      boxSizing: 'border-box',
    },
    '& h2': {
      width: '100%',
      padding: '5px',
      margin: '0',
      fontSize: '20px',
      color: theme.palette.common.black,
    },
    '& p': {
      width: '100%',
      padding: '7px',
      margin: '0',
      border: '1px solid #a1a9ac',
      borderBottomWidth: '0',
      borderLeftWidth: '0',
      borderRightWidth: '0',
      fontSize: '18px',
      color: theme.palette.common.black,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#e6e9ea',
      }
    }
  }
})

export default styles
