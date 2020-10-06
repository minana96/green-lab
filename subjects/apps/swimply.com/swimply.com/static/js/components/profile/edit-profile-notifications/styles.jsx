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
    '& ul, p': {
      padding: '0',
      margin: '0',
      listStyleType: 'none',
    },
  },
  innerContainer: {
    maxWidth: '340px',
    width: '100%',
  },
  title: {
    fontWeight: '500',
    color: theme.palette.common.black,
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
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: '18px 0',
    cursor: 'pointer',
    '&:after': {
      content: `''`,
      position: 'absolute',
      right: '0',
      width: '18px',
      height: '18px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      borderRadius: '50%',
      border: '1px solid #dadfdf',
      transition: 'all 0.2s ease',
    },
    '&.checked:after': {
      border: 'none',
      backgroundImage: 'url(/img/commons/checked.png)',
    },
    '&:before': {
      content: `''`,
      width: '18px',
      height: '18px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    '&.message:before': {
      backgroundImage: 'url(/img/screens/profile/sms.png)',
    },
    '&.email:before': {
      backgroundImage: 'url(/img/screens/profile/email.png)',
    },
    '&.notification:before': {
      backgroundImage: 'url(/img/screens/profile/notifications.png)',
    },
  }
})

export default styles
