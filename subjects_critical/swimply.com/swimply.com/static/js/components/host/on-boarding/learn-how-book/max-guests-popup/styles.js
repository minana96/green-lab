const styles = theme => ( {
  popupContainer: {
    maxWidth: '400px',
  },
  subTitle: {
    fontWeight: '100',
    fontSize: '15px',
    color: 'black',
  },
  select: {
    marginRight: '5px',
  },
  buttonsContainer: {
    display: 'flex',
    margin: '40px 0 0',
  },
  okButton: {
    maxWidth: '70px',
    transition: 'all 0.2s ease',
  },
  cancelButton: {
    maxWidth: '70px',
    background: 'transparent',
    color: theme.palette.common.blue,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common.blue,
      opacity: '0.9',
    },
  },
  reduceMarginTop: {
    marginTop: '0',
  },
} );

export default styles;
