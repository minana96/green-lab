const styles = theme => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    marginTop: '20px',
    padding: '4px 25px',
    fontSize: '0.875rem',
    fontWeight: '500',
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: '5px',
    lineHeight: '1.75',
    border: 'none',
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    '&:hover': {
      opacity: '0.8'
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
    width: '16px',
    height: '20px',
    marginRight: '10px',
    '& img': {
      width: '100%',
      height: '100%',
      display: 'block !important',
    }
  }
})

export default styles
