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
  hidden: {
    opacity: '0',
    height: '0',
    width: '0',
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
  },
  avatar: {
    width: '70px',
    height: '70px',
  },
})

export default styles
