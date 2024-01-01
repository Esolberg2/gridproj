
const GridRow = ({ rowIndex, columns, rowData, renderLabelCell, renderContentCell, showLabel, rowLabel }) => {
    
    const renderLabel = function() {
        if (showLabel) {
            return renderLabelCell(rowIndex, rowData, rowLabel)
        }
    }

    const dragOver = function (e) {
        e.preventDefault()
    }

    const handleDrop = function (e) {
        console.log(rowData)
        console.log(e.dataTransfer.getData("originalData"))
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} key={rowIndex} onDrop={handleDrop} onDragOver={dragOver}>
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