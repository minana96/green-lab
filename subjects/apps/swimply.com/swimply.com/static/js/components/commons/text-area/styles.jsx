const styles = theme => ({
  container: {
    position: 'relative',
    padding: '20px 0',
    marginTop: '10px',
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
    '& *': {
      boxSizing: 'border-box',
    },
  },
  label: {
    position: 'absolute',
    top: '30px',
    left: '2px',
    margin: '0',
    fontSize: '14px',
    fontWeight: '300',
    transition: 'all 0.1s linear',
    cursor: 'pointer',
    '&.focused': {
      top: '0',
      fontSize: '12px',
    }
  },
  textarea: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    height: '60px',
    padding: '7px 2px',
    resize: 'none',
    border: 'none',
    outline: 'none',
    borderBottom: '1px solid #dadfdf',
    fontSize: '14px',
    fontWeight: '400',
  }
})

export default styles
