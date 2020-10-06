const styles = theme => ( {
  signupContainer: {},
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  formInputBox: {
    '& label + div ': {
      marginTop: '0',
      marginBottom: '0',
      width: '100%',
    },

    position: 'relative',
    marginBottom: '15px',
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: 'uppercase',
      fontSize: '12px',
      letterSpacing: '0.6px',
      marginBottom: '3px',
    },
    '& input': {
      background: theme.palette.common.gray,
      position: 'relative',
      width: '100%',
      padding: '10px 15px ',
      fontWeight: 'normal',
      border: '1px solid #f3f5f5',
      fontSize: '13px',
      borderRadius: '5px',

      '&:focus': {
        border: '1px solid #00ade2',
      },
    },
    '& span': {
      position: 'absolute',
      top: '3px',
      bottom: '0',
      margin: 'auto',
      height: '0px',
      left: '9px',
    },

  },
  CheckboxBottm: {
    position: 'relative',
    marginTop: '-10px',
    '& span:last-child': {
      color: '#787878',
      fontSize: '13px',
    },
    '& img': {
      position: 'absolute',
      top: '14px',
      bottom: '0',
      left: '28px',
      width: '18px',
    },
  },
  checkBox: {
    color: theme.palette.common.darkgray,
    paddingRight: '5px',
    '&$checked': {
      color: theme.palette.common.blue,
    },
  },
  checked: {},
  dialogBoxContainer: {
    padding: '15px 22px',

    '& h3': {
      padding: '15px 22px',

    },
  },
  dialogBox: {
    minWidth: '280px',
    '@media (max-width:767px)': {
      paddingBottom: '8px',

    },
    '@media (max-width:480px)': {
      minWidth: '200px',
    },

    '& > label': {
      marginBottom: '15px',
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  signupBtn: {
    margin: '25px 0',
  },
  signupToHostBtn: {
    marginBottom: '10px',
    '& span': {
      color: theme.palette.common.black,
      background: theme.palette.common.transparent,
      border: '2px solid #00ade2',
      padding: '6px 15px',
    },
  },
  alreadyHaveAccount: {
    background: theme.palette.common.gray,
    padding: '15px',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
    '& label': {
      fontSize: '13px',
      '& span': {
        color: theme.palette.common.blue,
        textTransform: 'uppercase',
        fontWeight: '500',
        cursor: 'pointer',
        '@media (max-width:767px)': {
          fontSize: '16px',
        },
      },
      '& span:hover': {
        color: theme.palette.common.black,
      },
    },

  },
  mobileIcon: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontFamily: '"Poppins", sans-serif',
    color: theme.palette.common.darkgray,
    paddingBottom: '15px',
    '& i': {
      position: 'absolute',
      left: '10px',
      fontSize: '27px',
      top: '7px',
      color: theme.palette.common.blue,
      '& img': {
        maxWidth: '20px',
        marginTop: '10px',
        marginLeft: '15px',
      },
    },

  },
  modalCloseIcons: {
    position: 'absolute',
    right: '15px',
    cursor: 'pointer',
    top: '-8px',
    '& img': {
      maxWidth: '30px',
      filter: 'grayscale(1)',
    },
    '& img:hover': {
      filter: 'grayscale(0)',
    },
  },

  textFieldTwo: {
    background: '#f3f5f5',
    width: '100%',
    marginTop: 0,
  },
  errorMessage: {
    '& input': {
      border: '1px solid red',
      borderRadius: '5px',
    },
  },

  inputTooltip: {
    display: 'none',
  },
  inputTooltipError: {
    position: 'absolute',
    top: '20px',
    right: '11px',
    background: '#ccc',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toolTipForms: {
    color: '#ffffff',
    backgroundColor: 'green',
    maxWidth: '240px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
  },
  checkBoxMessage: {
    '& svg': {
      fill: 'red',
    },
  },
  paddingLeftZero: {
    paddingLeft: '7px !important',
  },
  paddingRightZero: {
    paddingRight: '7px !important',
  },
  closeBtn: {
    float: 'right',
    fontSize: '18px',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '10px',
    margin: 'auto',
    height: '17px',
    color: '#ff6161',

  },
  errorMsgClose: {
    position: 'relative',
    marginTop: '45px',
    transition: 'all 0.2s ease'
  },
  hidden: {
    opacity: '0',
    marginTop: '25px',
  },
  sinupLabelMain: {
    display: 'inline-block',
    marginLeft: '-14px',
    '& label': {
      fontSize: '13px',
      verticalAlign: 'middle',
      '@media (max-width:767px)': {
        color: '#989fa2',
      },
      '@media (max-width:360px)': {
        fontSize: '11px',
      },
    },
    '& a': {
      textDecoration: 'underline',
      color: 'inherit',
    },

  },
} );

export default styles