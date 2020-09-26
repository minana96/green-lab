const styles = () => ( {
  container: {
    position: 'relative',
    '& h3': {
      fontSize: '18px',
      fontWeight: '500',
    },
  },
  formContainer: {
    marginTop: '20px',
  },
  subTitle: {
    marginTop: '5px',
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    '& img': {
      width: '100%',
    },
  },
  checkbox: {
    width: '20px',
    height: '20px',
  },
  buttonContainer: {
    marginTop: '20px',
    '& button[disabled]': {
      background: '#d1d4d8',
    },
  },
} );

export default styles;
