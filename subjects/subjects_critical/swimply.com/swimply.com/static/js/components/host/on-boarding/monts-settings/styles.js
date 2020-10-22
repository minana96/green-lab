const styles = theme => ( {
  backContainer: {
    marginBottom: '10px',
    fontWeight: '500',
    color: theme.palette.common.blue,
    cursor: 'pointer',
    '& a': {
      fontWeight: '500',
      color: theme.palette.common.blue,
    },
    '& i': {
      marginRight: '3px',
      marginTop: '-1px',
      fontSize: '22px',
      verticalAlign: ' text-bottom',
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      // marginBottom: '0',
      overflow: 'hidden',
      color: theme.palette.common.black,
      '& i': {
        fontSize: '30px',
      },
    },
  },
  stepperContainer: {
    marginBottom: '20px',
  },
  subTitle: {
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  buttonContainer: {
    marginTop: '40px',
  },
  marginTop: {
    marginTop: '40px',
  },
  link: {
    display: 'inline-block',
    marginRight: '3px',
    marginLeft: '3px',
    textDecoration: 'underline',
    fontSize: '13px',
    fontWeight: '100',
    color: theme.palette.common.blue,
    cursor: 'pointer',
  },
  time: {
    fontWeight: '100',
    fontSize: '13px',
    margin: '0',
  },
  inputRangeContainer: {
    maxWidth: '200px',
    padding: '6px 0',
    '& .input-range__track--active': {
      background: '#00a6e2',
    },
    '& .input-range__slider-container > div': {
      borderColor: theme.palette.common.white,
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
      background: theme.palette.common.white,
    },
    '& .input-range__label-container': {
      display: 'none',
    },
  },
  displayTimerRange: {
    display: 'flex',
    padding: '5px 0',
    '& div': {
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center',
      color: theme.palette.common.black,
      '& div': {
        width: '100%',
        fontSize: '13px',
        fontWeight: '500',
      },
    },
    '& span': {
      margin: '0 10px',
    },
  },
  nextButton: {
    width: '100%',
    padding: '10px 15px',
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
    },
  },
  disableBtn: {
    background: '#ccc',
    width: '100%',
    padding: '10px 15px',
    cursor: 'default',
    '&:hover': {
      background: '#ccc',
    },
  },
} );

export default styles;
