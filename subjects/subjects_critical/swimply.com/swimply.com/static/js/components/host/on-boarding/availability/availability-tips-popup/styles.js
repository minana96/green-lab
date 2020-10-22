const styles = () => ( {
  availabilityTipsContainer: {
    position: 'relative',
    '& h3': {
      fontSize: '18px',
      fontWeight: '500',
    },
  },
  textContainer: {
    padding: '20px 0',
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
} );

export default styles;
