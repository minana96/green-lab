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
      padding: '0',
      margin: '0',
      listStyleType: 'none',
    }
  },
  innerContainer: {
    maxWidth: '700px',
    width: '100%',
    padding: '0 15px',
    transition: 'all 0.2s ease',
    '&.mobile-without-margin': {
      '@media (max-width: 400px)': {
        padding: '0',
      },
    },
    '@media (max-width: 500px)': {
      textAlign: 'center',
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '150px 0',
    background: 'url(/img/screens/referral/header.png) no-repeat center/cover',
    '& img': {
      width: '300px',
    },
    '& h1': {
      height: 0,
      width: 0,
      opacity: 0,
    },
    '@media (max-width: 500px)': {
      padding: '80px 0',
      textAlign: 'center',
      '& img': {
        width: '170px',
      }
    },
    '@media (max-width: 400px)': {
      padding: '65px 0',
    }
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.common.black,
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '30px',
      height: '30px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      '@media (max-width: 500px)': {
        width: '50px',
        height: '50px',
        margin: '0 0 10px 0',
      },
    },
    '&.swimmer:before': {
      backgroundImage: `url('/img/screens/profile/reffered-people.png')`,
    },
    '&.pool:before': {
      backgroundImage: `url('/img/screens/profile/reffered-pools.png')`,
    },
    '@media (max-width: 500px)': {
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
  text: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.common.black,
  },
  bold: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  credits: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.common.blue,
  },
  button: {
    display: 'block',
    maxWidth: '280px',
    width: '100%',
    marginTop: '25px',
    padding: '15px 0',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#12BFEA',
    color: theme.palette.common.white,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:hover': {
      opacity: '0.8',
    },
    '&.border': {
      padding: '13px 0',
      border: '2px solid #12BFEA',
      backgroundColor: 'transparent',
      color: '#12BFEA',
      '&:hover': {
        opacity: '0.8',
        backgroundColor: '#12BFEA',
        color: theme.palette.common.white,
      },
    },
    '@media (max-width: 500px)': {
      margin: '15px auto 0',
    },
  },
  divider: {
    margin: '30px 0',
    height: '1px',
    backgroundColor: '#E3E3E3',
  },
  invitedPersonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& .avatar': {
      width: '60px',
      height: '60px',
      marginRight: '15px',
      '@media (max-width: 500px)': {
        width: '45px',
        height: '45px',
        margin: '0 0 10px',
      },
    },
    '& p': {
      margin: '0',
      fontSize: '25px',
      fontWeight: '700',
      color: theme.palette.common.black,
    },
    '@media (max-width: 500px)': {
      flexDirection: 'column',
    }
  },
})

export default styles
