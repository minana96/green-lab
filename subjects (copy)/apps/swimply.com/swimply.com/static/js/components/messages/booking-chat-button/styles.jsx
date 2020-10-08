export default () => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width:767px)':{
      boxShadow: '5px 8px 5px 5px #000',
      backgroundColor: '#fff',
    }
  },
  fullWidth: {
    width: '100%',
  },
  disabledFullWidth: {
    width: '100%',
    background: 'lightgray',
    cursor: 'disable',
    pointerEvents: 'none',
    '&:hover': {
      background: 'lightgray',
    }
  },
  bookingButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 0 20px',
    width: '100%',
    maxWidth: '300px',
  }
})