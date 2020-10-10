export default theme => ({
  button: {
    width: '100%',
    padding: '10px 15px',
    '&:hover': {
      background: 'linear-gradient(90deg,#00b6e7,#04bfeb,#23d1f2,#00b6e7,#23d1f2)',
    },
  },
  disable: {
    background: '#ccc',
    width: '100%',
    padding: '10px 15px',
    cursor: 'default',
    '&:hover': {
      background: '#ccc',
    },
  },
})