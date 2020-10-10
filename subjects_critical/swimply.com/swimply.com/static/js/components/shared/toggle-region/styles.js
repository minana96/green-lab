export default theme => ( {
  regionToggleContainer: {
    position: 'relative',
    display: 'inline-block',
    padding: '5px 10px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    cursor: 'pointer',
    boxShadow: '1px 1px 10px #4d5051',
    '& span': {
      position: 'relative',
      fontSize: '14px',
    },
    '& span.active': {
      color: '#fff',
    },
    '& span.margin': {
      marginRight: '12px',
    },
    '& .toggle': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '55%',
      height: '100%',
      backgroundColor: theme.palette.common.blue,
      borderRadius: '12px',
      transition: 'all 0.4s ease',
      '&.active': {
        left: 'auto',
        right: 0,
      },
    },
  },
} );
