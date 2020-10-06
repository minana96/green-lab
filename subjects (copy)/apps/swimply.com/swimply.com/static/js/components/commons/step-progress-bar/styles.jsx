const styles = theme => ({
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .step': {
      flexGrow: '1',
      marginRight: '5px',
      padding: '2px 0',
      borderRadius: '2px',
      backgroundColor: '#EAEAEA',
      '&:last-child': {
        marginRight: '0',
      },
      '&.active': {
        backgroundColor: theme.palette.common.blue,
      }
    }
  },
})

export default styles
