const styles = theme => ( {
  placeholderContainer: {
    maxWidth: '1170px',
    padding: '0 20px',
    margin: '0 auto',
    '@media (max-width:1170px)': {
      maxWidth: '992px',
    },
    '@media (max-width: 1000px)': {
      maxWidth: '750px',
    },
    '@media (max-width:767px)': {
      width: 'calc(100% - 30px)',
    },
  },
  link: {
    marginLeft: '5px',
    color: theme.palette.common.blue,
    cursor: 'pointer',
  },
  logout: {
    float: 'right',
    marginLeft: '15px',
    '@media (max-width: 500px)': {
      display: 'block',
      float: 'initial',
      margin: '0 0 10px 0',
    },
  },
} );

export default styles;
