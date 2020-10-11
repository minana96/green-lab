const styles = theme => ({
  container: {
    overflow: 'hidden',
    position: 'relative',
    padding: '4px 0',
    boxSizing: 'border-box',
    borderRadius: '30px',
    backgroundColor: '#EAEAEA',
    '& *': {
      boxSizing: 'border-box',
    },
  },
  progress: {
    position: 'absolute',
    top: '0',
    marginLeft: '-100%',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.common.blue,
    transition: 'all 0.3s ease-in-out'
  }
})

export default styles
