const Cell = ({ index, cellWidth, children }) => {

    return (
      <>
          <div
              key={index}>
              <div style={{
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  width: cellWidth,
                  whiteSpace: "nowrap",
                  minWidth: '30px',
                  minHeight: '30px',
                  padding: '10px'
              }}>
                  {children}
              </div>
          </div>
      </>
    );
  };
  
  export default Cell;