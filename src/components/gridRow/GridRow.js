
const GridRow = ({ rowIndex, columns, rowData, renderLabelCell, renderContentCell, showLabel, rowLabel }) => {
    
    const renderLabel = function() {
        if (showLabel) {
            return renderLabelCell(rowIndex, rowData, rowLabel)
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} key={rowIndex}>
            {renderLabel()}
            {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex}>
                    {renderContentCell(rowIndex, colIndex, rowData ? rowData : null)}
                </div>
            ))}
        </div>
    );
};

export default GridRow;