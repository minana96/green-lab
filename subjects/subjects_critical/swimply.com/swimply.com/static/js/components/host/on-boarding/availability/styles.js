

const styles = theme => ( {
  subTitle: {
    marginTop: '5px',
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
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
  selectContainer: {
    margin: '40px 0',
  },
  select: {
    maxWidth: '300px',
    width: '100%',
  },
  title: {
    fontSize: '16px',
    fontWeight: '500',
  },
  selectSubTitle: {
    marginTop: '5px',
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  availabilityTipsContainer: {
    position: 'relative',
    margin: '30px 0',
    padding: '15px',
    backgroundColor: theme.palette.common.darkgray,
    boxSizing: 'border-box',
    '& h3': {
      fontSize: '18px',
      fontWeight: '500',
    },
    '& p': {
      margin: '0',
      paddingRight: '40px',
      color: '#fff',
    },
    '@media (max-width: 600px)': {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      margin: '0',
    },
  },
  availabilityTipsButton: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    padding: '4px 10px',
    border: '1px solid #fff',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  availabilityTipsArrowButton: {
    display: 'none',
    position: 'absolute',
    top: '13px',
    right: '20px',
    height: '20px',
    width: '20px',
    border: '1px solid #fff',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
    '& img': {
      width: '100%',
      marginTop: '-1px',
      transform: 'rotate(-90deg)',
    },
    '@media (max-width: 600px)': {
      display: 'block',
    },
  },
  textContainer: {
    padding: '20px 0',
  },
  buttonContainer: {
    marginTop: '20px',
  },
} );

export default styles;
