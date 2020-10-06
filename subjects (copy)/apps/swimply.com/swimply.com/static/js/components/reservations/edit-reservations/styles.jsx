const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1170px',
    margin: '0 auto',
    width: '100%',
    padding: '40px 15px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    '&.extra-bottom-padding': {
      paddingBottom: '150px',
    },
    '& *': {
      boxSizing: 'border-box',
    },
    '& ul, p, h2, h3': {
      padding: '0',
      margin: '0',
      listStyleType: 'none',
    },
    '@media (max-width: 400px)': {
      padding: '40px 0'
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
    marginBottom: '15px',
    fontSize: '18px',
    color: theme.palette.common.black,
    '@media (max-width: 400px)': {
      fontSize: '16px',
    }
  },
  link: {
    margin: '0',
    color: theme.palette.common.blue,
    cursor: 'pointer'
  },
  poolInfoContainer: {
    padding: '15px',
    borderBottom: '1px solid #E3E3E3',
    color: theme.palette.common.black,
    fontSize: '16px',
    '& .title': {
      fontSize: '20px',
      fontWeight: '500',
    },
    '& .price-container': {
      marginTop: '7px',
    },
    '& .hourly-price': {
      fontSize: '18px',
    },
    '& .blue': {
      color: theme.palette.common.blue,
    },
    '& .gray': {
      color: theme.palette.common.darkgray
    },
  },
  formContainer: {
    padding: '15px',
    '& .section-title': {

    }
  },
  buttonContainer: {
    marginTop: '20px',
  },
  errorMessageContainer: {
    marginTop: '15px'
  },
})

export default styles
