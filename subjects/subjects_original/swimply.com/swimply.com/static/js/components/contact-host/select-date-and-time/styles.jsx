export default theme => ({
  container: {
    display: 'flex',
    position: 'relative',
    '@media (max-width: 400px)':{
      flexDirection: 'column',
    },
    '& *': {
      boxSizing: 'border-box',
    }
  },
  inputItem: {
    '&.time': {
      width: '55%',
      '@media (max-width: 1000px)':{
        width: '50%',
      },
      '@media (max-width: 850px)':{
        width: '55%',
      },
      '@media (max-width: 400px)':{
        maxWidth: '100%',
        width: '100%',
        padding: '0',
      },
    },
    '&.date': {
      width: '45%',
      '@media (max-width: 1000px)':{
        width: '50%',
      },
      '@media (max-width: 850px)':{
        width: '45%',
      },
      '@media (max-width: 400px)':{
        maxWidth: '100%',
        width: '100%',
        padding: '0',
      },
    },
  },
  paddingRight: {
    paddingRight: '15px',
    '@media (max-width: 400px)':{
      paddingRight: '0',
    }
  },
  relative: {
    position: 'relative',
  },
  formInputBox: {
    position: 'relative',
    marginBottom: '15px',
    '& input': {
      background: theme.palette.common.gray,
      position: 'relative',
      width: '100%',
      padding: '15px 35px ',
      fontWeight: 'normal',
    },
    '& .icon': {
      filter: 'grayscale(1)',
      position: 'absolute',
      top: '1px',
      bottom: '0',
      margin: 'auto',
      height: '0px',
      left: '7px',
    },
    '&.focus': {
      '& div': {
        boxShadow: theme.shape.boxShadow,
        color: theme.palette.common.black,
        background: theme.palette.common.white,
      },
      '& span': {
        filter: 'grayscale(0)'
      }
    }
  },
  dropDownSelectTime: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '14px 15px 13px 35px',
    fontSize: '14px',
    fontWeight: 'normal',
    whiteSpace: 'pre',
    border: '1px solid #e8e8e8',
    overflow: 'hidden',
  },
  timeBlock: {
    zIndex: '10',
    position: 'absolute',
    top: '85px',
    right: '0',
    width: '100%',
    minWidth: '320px',
    maxWidth: '320px',
    '@media (max-width: 360px)':{
      minWidth: '290px',
    },
    '& ul.time-block': {
      width: '100%',
      margin: '0',
      padding: '0',
      boxShadow: '0 0 3px #ccc',
      background: '#fff',
    },
    '& ul.time-block li': {
      display: 'inline-block',
      height: '44px',
      width: '16.66666%',
      padding: 5,
      border: '1px solid #eef0f1',
      cursor: 'pointer',
      color: '#232323',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'lowercase',
      position: 'relative',
      '&.disable': {
        backgroundColor: '#edf0f0',
        color: '#e0e0e0',
        borderColor: '#e8e8e8',
        cursor: 'not-allowed'
      },
      '& .lineThrough': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '-6px',
        right: 0,
        margin: 'auto',
        zIndex: 15,
        width: '125%',
        height: 1,
        backgroundColor: '#d0cfcf',
        transform: 'rotate(140deg)'
      },
      '&.active:not(.disable)': {
        backgroundColor: '#22bfea',
        color: '#fff',
        borderColor: '#5ed1f1',
      },
      '&.instant:not(.disable):not(.active)': {
        backgroundImage: 'url(/img/time.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 2px right 5px',
        backgroundSize: '14px'
      },
      '&.hovered:not(.disable):not(.active)': {
        backgroundColor: '#e8e8e8',
      },
    },
    '& .timer-buttons': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '15px',
      paddingBottom: '15px',
      '& button[disabled]': {
        background: '#e8e8e8'
      },
      '& button:first-child': {
        background: 'transparent',
        color: '#232323',
      },
      '& button:first-child span': {
        color: '#232323',
      },
      '& button': {
        marginLeft: '10px',
        padding: '3px 20px'
      }
    }
  },
  calendar: {
    position: 'relative',
    paddingLeft: '10px',
    zIndex: '10',
    '& > div': {
      margin: '0 !important'
    }
  },
})