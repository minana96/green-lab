export default theme => ({
  container: {
    position: 'relative',
  },
  dropDownSelect: {
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: '14px 15px 13px 15px',
    fontWeight: 'normal',
    border: '1px solid #e8e8e8',
    '& i': {
      float: 'right',
      fontSize: '22px',
      color: theme.palette.common.darkgray,
    },
    '&.focus': {
      '& div': {
        boxShadow: theme.shape.boxShadow,
        color: theme.palette.common.black,
        background: theme.palette.common.white,
      },
    }
  },
  guestsPopup: {
    position: 'relative',
    zIndex: '10',
    '& > div': {
      width: '100%',
      margin: '0',
      top: '8px',
    }
  }
})