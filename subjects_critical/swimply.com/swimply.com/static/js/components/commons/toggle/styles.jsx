const styles = theme => ({
  toggleContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '42px',
    height: '20px',
    borderRadius: '12px',
    background: '#efefef',
    border: ' #d5d5d5',
    boxShadow: '1px 1px 6px #aaa',
    transition: 'all 100ms ease-in-out',
    cursor: 'pointer',
    '&.toggled': {
      background: theme.palette.common.blue,
      '& .toggle-slider-button': {
        left: 'calc(100% - 19px)',
      },
      '&.check-mark-icon:before': {
        opacity: '1',
      }
    },
    '&.check-mark-icon:before': {
      content: `''`,
      display: 'inline-block',
      position: 'absolute',
      left: '5px',
      width: '10px',
      height: '10x',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: `url('/img/commons/check-mark.png')`,
      opacity: '0',
      transition: 'all 100ms ease-in-out'
    },
    '& .toggle-slider-button': {
      position: 'absolute',
      left: '1px',
      top: '1px',
      width: '18px',
      height: '18px',
      background: '#fff',
      border: '#d5d5d5',
      borderRadius: '50%',
      boxShadow: '1px 1px 6px #aaa',
      zIndex: '1',
      transition: 'all 100ms ease-in-out',
    }
  }
})

export default styles
