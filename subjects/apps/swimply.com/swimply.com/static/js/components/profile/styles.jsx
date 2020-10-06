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
    '& ul': {
      padding: '0',
      margin: '0',
      listStyleType: 'none',
    }
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
  marginBottom: {
    marginBottom: '15px'
  },
  sectionTitle: {
    margin: '20px 0 10px',
    fontSize: '18px',
    color: '#aeb3b3',
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
    padding: '10px 25px 10px 10px',
    marginTop: '10px',
    borderBottom: '1px solid #dadfdf',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    '&:hover': {
      opacity: '0.8',
    },
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '20px',
      height: '20px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
    '&.public:before': {
      backgroundImage: `url('/img/screens/profile/public.png')`
    },
    '&.private:before': {
      backgroundImage: `url('/img/screens/profile/private.png')`
    },
    '&.verification:before': {
      backgroundImage: `url('/img/commons/verified.png')`
    },
    '&.notifications:before': {
      backgroundImage: `url('/img/screens/profile/notifications.png')`
    },
    '&.help:before': {
      backgroundImage: `url('/img/screens/profile/help-center.png')`
    },
    '&.contact:before': {
      backgroundImage: `url('/img/screens/profile/email.png')`
    },
    '&.terms:before': {
      backgroundImage: `url('/img/screens/profile/terms-of-use.png')`
    },
    '&.privacy:before': {
      backgroundImage: `url('/img/screens/profile/privacy-policy.png')`
    },
    '&.pool:before': {
      width: '24px',
      height: '24px',
      marginRight: '6px',
      backgroundImage: `url('/img/screens/profile/pool.png')`,
    },
    '&.present:before': {
      backgroundImage: `url('/img/screens/profile/colored-present.png')`
    },
    '&.payments:before': {
      backgroundImage: `url('/img/screens/profile/payments.png')`
    },
    '&.favorites:before': {
      backgroundImage: `url('/img/icons/heart-filled.png')`
    },
    '&.bank:before': {
      backgroundImage: `url('/img/commons/swimply-bank.png')`
    },
    '&.invite-friends:before': {
      backgroundImage: `url('/img/screens/profile/invite-friends.png')`
    },
    '&.bank': {
      marginTop: '20px',
      paddingRight: '60px',
      '& p.money': {
        position: 'absolute',
        right: '25px',
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '20px',
        color: theme.palette.common.blue,
      }
    },
    '&.blue': {
      backgroundColor: '#e0f7fb',
    },
    '&.border-none': {
      border: 'none'
    },
    '&.margin-none': {
      margin: '0'
    },
    '&.extra-padding': {
      padding: '17px 10px',
    },
    '& p': {
      margin: '0',
      fontSize: '16px',
      '&.blue': {
        color: theme.palette.common.blue,
      },
    },
  },
  rightBlueArrow: {
    position: 'absolute',
    right: '10px',
    fontSize: '20px',
    color: theme.palette.common.blue,
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '70px',
    height: '70px',
  },
  email: {
    margin: '5px 0',
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.common.darkgray,
  },
  exclamation: {
    '& p': {
      color: 'red'
    },
    '& div': {
      position: 'absolute',
      right: '15px',
      top: '10px',
      '& .with-margin': {
        marginRight: '10px',
        color: 'red',
        fontSize: '20px',
      }
    }
  },
  verifiedButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '320px',
    width: '100%',
    marginTop: '20px',
    padding: '10px 20px',
    border: `1px solid ${theme.palette.common.blue}`,
    borderRadius: '30px',
    fontSize: '16px',
    color: theme.palette.common.black,
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.1s ease',
    '&:hover': {
      opacity: '0.8'
    },
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '15px',
      height: '18px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: 'url(/img/commons/verified.png)',
    },
    '& .right-blue-arrow': {
      fontSize: '22px',
      right: '18px',
    }
  },
  verifiedMessage: {
    display: 'flex',
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '18px',
      height: '18px',
      marginRight: '10px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: 'url(/img/commons/alert.png)',
    }
  },
  progressBarContainer: {
    maxWidth: '320px',
    width: '100%',
    margin: '20px 0 10px',
    paddingBottom: '20px',
    borderBottom: '1px solid #dadfdf',
    '& .percentage': {
      textAlign: 'center',
    }
  }
})

export default styles
