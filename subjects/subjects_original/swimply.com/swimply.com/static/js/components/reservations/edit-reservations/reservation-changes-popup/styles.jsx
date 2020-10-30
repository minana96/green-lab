export default theme => ({
  popup: {
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    '& *': {
      boxSizing: 'border-box',
    },
    '& ul, p, h2': {
      padding: '0',
      margin: '0',
      listStyleType: 'none',
    },
    '& [class*="MuiDialog-paperScrollPaper"]': {
      '@media (max-width: 400px)': {
        margin: '15px',
      }
    }
  },
  popupContainer: {
    maxWidth: '380px',
    minWidth: '250px',
    padding: '0',
    '&:first-child': {
      padding: '0',
    },
  },
  titleContainer: {
    padding: '20px 15px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    color: theme.palette.common.black,
    '&:before': {
      content: `''`,
      display: 'inline-block',
      width: '18px',
      height: '18px',
      marginRight: '8px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundImage: 'url(/img/commons/alert.png)',
    }
  },
  description: {
    fontSize: '16px',
    color: theme.palette.common.darkgray,
  },
  priceContainer: {
    padding: '15px',
    borderTop: `1px solid ${theme.palette.common.border}`,
    borderBottom: `1px solid ${theme.palette.common.border}`,
    '& .item': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
      fontSize: '16px',
      '&:last-child': {
        marginBottom: '0',
      },
      '&.total': {
        marginTop: '12px',
        fontWeight: 'bold',
        fontSize: '18px',
        color: theme.palette.common.black,
      },
    }
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '22px 15px 15px',
    '& button': {
      padding: '2px',
      margin: '0 8px',
      outline: 'none',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      '&.cancel': {
        color: theme.palette.common.secondary,
      },
      '&.submit': {
        color: theme.palette.common.primary,
      }
    }
  }
})