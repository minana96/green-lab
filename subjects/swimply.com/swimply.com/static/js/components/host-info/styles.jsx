const styles = theme => ({
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '40px 0',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    '& *': {
      boxSizing: 'border-box',
    },
    '& ul': {
      margin: '0',
      padding: '0',
      listStyleType: 'none',
    }
  },
  innerContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '0 15px',
    transition: 'all 0.2s ease',
    '@media (max-width: 500px)': {
      textAlign: 'center',
    }
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '& .avatar': {
      width: '60px',
      height: '60px',
    },
    '& .name': {
      marginLeft: '5px',
      fontSize: '20px',
      fontWeight: '500',
      color: theme.palette.common.black,
    }
  },
  verifiedList: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .verified-item': {
      display: 'flex',
      padding: '5px 0',
      alignItems: 'center',
      width: '50%',
      fontSize: '15px',
      fontWeight: '400',
      color: theme.palette.common.darkgray,
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '18px',
        height: '18px',
        marginRight: '8px',
        background: `url(/img/commons/check.png) no-repeat center/contain`,
      }
    }
  },
  description: {
    margin: '24px 0 16px',
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.common.darkgray,
  },
  createdAt: {
    marginTop: '15px',
    fontSize: '12px',
    fontWeight: '400',
    color: '#b4b7b8',
  },
  divider: {
    height: '1px',
    marginTop: '15px',
    backgroundColor: '#E5E5E5',
  }
})

export default styles
