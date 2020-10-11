const styles = theme => ( {
  popupContainer: {
    maxWidth: '400px',
    overflowX: 'hidden',
    '& > a': {
      display: 'block',
      color: theme.palette.common.blue,
      marginBottom: '7px',
      textDecoration: 'none',
    },
  },
  bigAvatar: {
    margin: 0,
    width: 120,
    height: 120,
  },
  bigAvatarError: {
    margin: 0,
    width: 120,
    height: 120,
    border: '1px solid red',
  },
  EditProfilePopup: {
    position: 'relative',
    '& p': {
      color: theme.palette.common.blue,
      fontSize: '12px',
      textAlign: 'center',
      margin: '0',
      paddingTop: '8px',
      textTransform: 'uppercase',
    },
    '& i': {
      position: 'absolute',
      bottom: '30px',
      right: '0',
      zIndex: '9',
      cursor: 'pointer',
    },
    display: 'table',
    margin: '15px auto 12px',
  },
  textFieldTwo: {
    background: '#f3f5f5',
    fontSize: '12px',
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: '10px 15px',
      fontSize: '14px',
    },
  },
  textFieldTwoError: {
    background: '#f3f5f5',
    fontSize: '12px',
    borderRadius: '5px',
    width: '100%',
    '& > div': {
      padding: '10px 15px',
      fontSize: '14px',
    },
    '& fieldset': {
      border: '1px solid red !important',
    },
  },
  backButton: {
    color: theme.palette.common.blue,
    textTransform: 'uppercase',
    fontWeight: '500',
    paddingBottom: '5px',
    '& i': {
      fontSize: '18px',
      verticalAlign: 'middle',
      paddingRight: '2px',
      marginTop: '-2px',
    },
    '@media (max-width:767px)': {
      position: 'absolute',
      width: '15px',
      height: '15px',
      overflow: 'hidden',
      top: '13px',
      color: theme.palette.common.black,
      '& i': {
        fontSize: '20px',
      },
    },
  },
  uploadInput: {
    '& input': {
      position: 'absolute',
      top: '0',
      height: '100%',
      opacity: '0',
      cursor: 'pointer',
      visibility: 'hidden',
    },
    '& img': {
      cursor: 'pointer',
    },

  },
  deletePopup: {
    '& span': {
      padding: '3px 20px',
    },
  },
  buttonsContainer: {
    margin: '40px 0 0',
  },
  okButton: {
    transition: 'all 0.2s ease',
  },
  cancelButton: {
    background: 'transparent',
    color: theme.palette.common.blue,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common.blue,
      opacity: '0.9',
    },
  },
  subTitle: {
    marginBottom: '10px',
  },
} );

export default styles;
