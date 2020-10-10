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
    '& *': {
      boxSizing: 'border-box',
    },
    '& ul': {
      listStyleType: 'none',
      margin: '0',
      padding: '0',
    }
  },
  innerContainer: {
    maxWidth: '400px',
    padding: '0 15px',
    width: '100%',
    transition: 'all 0.2s ease',
    '&.mobile-without-margin': {
      '@media (max-width: 400px)': {
        padding: '0',
      },
    }
  },
  alignItemsCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    margin: '0',
    fontSize: '15px',
    fontWeight: '400',
    color: theme.palette.common.black
  },
  marginVertical: {
    margin: '15px 0',
  },
  linkTopText: {
    margin: '30px 0 10px',
  },
  reduceMargin: {
    margin: '0',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  info: {
    maxWidth: '340px',
    margin: '0 auto'
  },
  bankIcon: {
    width: '100px',
  },
  title: {
    margin: '0',
    fontWeight: '500',
    color: theme.palette.common.black,
  },
  sectionTitle: {
    margin: '0 0 10px 10px',
    fontSize: '14px',
    color: '#aeb3b3',
  },
  dollar: {
    marginRight: '5px',
    fontSize: '20px',
    fontWeight: '500',
    color: theme.palette.common.black
  },
  credits: {
    fontSize: '24px',
    fontWeight: '600',
    color: theme.palette.common.blue
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '10px',
    border: '1px solid',
    borderColor: theme.palette.common.blue,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
    '@media (max-width: 370px)': {
      padding: '10px 15px',
    },
    '& p': {
      display: 'flex',
      alignItems: 'center',
      margin: '0',
      fontSize: '14px',
      color: theme.palette.common.blue,
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      '@media (max-width: 370px)': {
        fontSize: '13px',
      },
      '@media (max-width: 350px)': {
        fontSize: '12px',
      },
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '18px',
        height: '18px',
        marginRight: '6px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundImage: `url('/img/screens/profile/blue-present.png')`,
        '@media (max-width: 370px)': {
          width: '16px',
          height: '16px',
        },
        '@media (max-width: 350px)': {
          width: '14px',
          height: '14px',
          marginRight: '4px',
        },
      },
    },
    '&:hover': {
      opacity: '0.8',
    }
  },
  inviteByEmail: {
    margin: '20px 0 0'
  },
  referralInfoContainer: {
    display: 'flex',
    margin: '30px 0',
    '& .referral': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '50%',
      padding: '20px 0',
      border: '1px solid #dadfdf',
      '&:first-child': {
        borderRight: 'none',
      },
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '22px',
        height: '22px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      },
      '&.people:before': {
        backgroundImage: `url('/img/screens/profile/reffered-people.png')`
      },
      '&.pools:before': {
        backgroundImage: `url('/img/screens/profile/reffered-pools.png')`
      },
      '& .referral-text': {
        margin: '0',
        fontSize: '16px',
        color: theme.palette.common.black,
        '@media (max-width: 370px)': {
          // fontSize: '14px',
        },
      },
      '& .referral-count': {
        margin: '0',
        fontSize: '24px',
        fontWeight: '600',
        color: theme.palette.common.blue,
      }
    }
  },
  historyList: {
    '& p': {
      margin: '0',
    },
    '& .item': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      marginTop: '10px',
      borderBottom: '1px solid #dadfdf',
      '& .info': {
        display: 'flex',
        flexDirection: 'column',
      },
      '& .email': {
        fontSize: '15px',
        fontWeight: '500',
        color: theme.palette.common.black
      },
      '& .action': {
        fontSize: '13px',
        fontWeight: '400',
      },
      '& .credits': {
        margin: '0',
        fontSize: '16px',
        fontWeight: '600',
        color: theme.palette.common.blue,
      }
    }
  },
  marginLeft: {
    marginLeft: '5px'
  }
})

export default styles
