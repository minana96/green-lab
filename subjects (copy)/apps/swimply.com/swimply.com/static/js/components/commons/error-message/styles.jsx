const styles = theme => ({
  errorMessageContainer: {
    marginTop: '5px',
    position: 'relative',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .close': {
      position: 'absolute',
      top: '2px',
      right: '3px',
      display: 'inline-block',
      padding: '2px 10px',
      fontSize: '18px',
      color: theme.palette.error.light,
      cursor: 'pointer'
    },
    '& .message': {
      width: '100%',
      maxWidth: '100%',
      padding: '15px 20px 15px 15px',
      overflow: 'hidden',
      overflowWrap: 'break-word',
    }
  }
})

export default styles
