const styles = () => ( {
  monthsList: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '280px',
    padding: '0',
    listStyleType: 'none',
  },
  monthItem: {
    width: '33.3333%',
    padding: '4px',
    border: '1px solid #eef0f1',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  activeMonthItem: {
    background: '#22bfea',
    color: '#fff',
    borderColor: '#5ed1f1',
  },
} );

export default styles;
