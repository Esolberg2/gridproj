import Cell from '../cell/Cell';

const GridRow = ({ rowIndex, columns, rowData, renderLabelCell, renderContentCell, showLabel, rowLabel, cellWidth }) => {
    
    console.log(rowLabel, rowData)
    renderContentCell = renderContentCell != null ? renderContentCell : (rowIndex, colIndex, rowData) => <Cell key={colIndex} style={{width: cellWidth}}>{rowData[colIndex]}</Cell>;
    renderLabelCell = renderLabelCell != null ? renderLabelCell : (rowIndex, rowData, rowLabel) => <Cell key={`${rowIndex},-1`} style={{backgroundColor: 'white', width: cellWidth}}>{rowLabel}</Cell>;

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