export default theme => ({
  backButton: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    color: theme.palette.common.blue,
    cursor: 'pointer',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
    '& i': {
      fontSize: '22px',
      verticalAlign: ' text-bottom',
      marginRight: '6px',
      marginTop: '-3px',
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      overflow: 'hidden',
      color: theme.palette.common.black,
      marginBottom: '0px',
      '& i': {
        fontSize: '30px',
      },
      '& span': {
        display: 'none',
      }
    }
  },
})