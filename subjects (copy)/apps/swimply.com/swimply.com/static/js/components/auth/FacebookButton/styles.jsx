const styles = theme => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    padding: '4px 25px',
    fontSize: '0.875rem',
    fontWeight: '500',
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: '5px',
    lineHeight: '1.75',
    border: 'none',
    background: 'linear-gradient(90deg, #23d1f2, #14c8ef, #04bfeb, #00b6e7, #00ade2)',
    color: theme.palette.common.white,
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    '&:hover': {
      opacity: '0.8',
      background: 'linear-gradient(90deg, #00b6e7, #04bfeb, #23d1f2, #00b6e7, #23d1f2)',
    },
    '& p': {
      margin: '0',
    },
    '@media (max-width:360px)': {
      padding: '4px 10px',
      fontSize: '13px',
    }
  },
  icon: {
    width: '23px',
    height: '23px',
    marginRight: '10px',
    '& img': {
      width: '100%',
      height: '100%',
    }
  }
})

export default styles
