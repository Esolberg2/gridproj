const Cell = ({ style, index, children, className}) => {

    return (
        <div 
            className={`Cell ${className ? className : ''}`}
            style={{
                border: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: "nowrap",
                minWidth: '30px',
                minHeight: '40px',
                ...style // allows inline style to override default style properties
            }} >
            {children}
        </div>
    );
  };
  
  export default Cell;