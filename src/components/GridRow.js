
const GridRow = ({ rowIndex, columns, values, children }) => {
    return (
        <div style={{display: 'flex'}} key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex}>
                    {children(colIndex, values ? values[colIndex] : null)}
                </div>
            ))}
        </div>
    );
};

export default GridRow;