const styles = theme => ( {
  formInputBox: {
    position: 'relative',
    marginBottom: '15px',
    cursor: 'pointer',
    '& fieldset': {
      opacity: 0,
    },

    '& label': {
      textTransform: 'uppercase',
    },
    '& input': {
      background: theme.palette.common.gray,
      position: 'relative',
      width: '100%',
      padding: '15px 35px ',
      fontWeight: 'normal',
    },
    '& span': {
      filter: 'grayscale(1)',
      position: 'absolute',
      top: '1px',
      bottom: '0',
      margin: 'auto',
      height: '0px',
      left: '7px',
    },
  },
  onFocus: {
    '& div': {
      boxShadow: theme.shape.boxShadow,
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    '& span': {
      filter: 'grayscale(0)',
    },
  },
  dropDownSelectTime: {
    background: theme.palette.common.gray,
    color: theme.palette.common.black,
    padding: '14px 15px 13px 35px',
    fontSize: '14px',
    fontWeight: 'normal',
    whiteSpace: 'pre',
    '& i': {
      float: 'right',
      fontSize: '22px',
    },
  },
  timerContainer: {
    position: 'relative',
    '& .time_block': {
      top: 0,
      '& li': {
        width: '20%',
        boxSizing: 'border-box',
      },
    },
  },
} );

export default styles;
