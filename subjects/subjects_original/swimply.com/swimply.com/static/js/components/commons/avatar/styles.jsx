const styles = (theme) => ({
  container: {
    position: 'relative',
    marginRight: '17px',
    '& .verified': {
      position: 'absolute',
      left: 'calc(100% - 16px)',
      bottom: '3px',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.common.blue,
      fontSize: '13px',
      zIndex: '5',
      '&:before': {
        content: `''`,
        display: 'inline-block',
        width: '18px',
        height: '20px',
        background: `url(/img/commons/verified-white-border.png) no-repeat center/contain`,
      },
      '&.small': {
        left: 'calc(100% - 14px)',
      },
      '&.small:before': {
        width: '16px',
        height: '18px',
      },
      '&.big': {
        left: 'calc(100% - 18px)',
      },
      '&.big:before': {
        width: '20px',
        height: '22px',
      },
      '&.two-pluses': {
        left: 'calc(100% - 20px)',
        '&.small': {
          left: 'calc(100% - 16px)',
        },
        '&.big': {
          left: 'calc(100% - 24px)',
        },
      }
    }
  }
})

export default styles
