const styles = theme => ( {
  subTitle: {
    fontWeight: '100',
    fontSize: '0.925rem',
    color: 'black',
  },
  backContainer: {
    marginBottom: '10px',
    fontWeight: '500',
    color: theme.palette.common.blue,
    cursor: 'pointer',
    '& a': {
      fontWeight: '500',
      color: theme.palette.common.blue,
    },
    '& i': {
      marginRight: '3px',
      marginTop: '-1px',
      fontSize: '22px',
      verticalAlign: ' text-bottom',
    },
    '@media (max-width:767px)': {
      width: '25px',
      height: '25px',
      // marginBottom: '0',
      overflow: 'hidden',
      color: theme.palette.common.black,
      '& i': {
        fontSize: '30px',
      },
    },
  },
  stepperContainer: {
    marginBottom: '20px',
  },
  listContainer: {
    marginTop: '20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    listStyleType: 'none',
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  listNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    padding: '6px 14px',
    border: '1px solid',
    borderColor: theme.palette.common.blue,
    borderRadius: '50%',
  },
  conditionList: {
    paddingLeft: 17,
  },
  buttonContainer: {
    marginTop: '20px',
  },
  link: {
    marginRight: '3px',
    marginLeft: '3px',
    textDecoration: 'underline',
    fontSize: '13px',
    fontWeight: '100',
    color: theme.palette.common.blue,
    cursor: 'pointer',
  },
  linkBold: {
    fontWeight: 'bold',
  },
} );

export default styles;
