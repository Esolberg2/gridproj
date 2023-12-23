import Cell from '../cell/Cell';

const GridRow = ({ rowIndex, columns, values, rowLabel, renderLabelCell, renderContentCell }) => {
    
    renderContentCell = renderContentCell != null ? renderContentCell : (colIndex, value) => <Cell key={colIndex}>{value}</Cell>;
    renderLabelCell = renderLabelCell != null ? renderLabelCell : () => <Cell key={`${rowIndex},-1`} style={{backgroundColor: 'white'}}>{rowLabel}</Cell>;

    const renderLabel = function () {
        if (rowLabel != null) {
            return renderLabelCell()
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}} key={rowIndex}>
            <div style={{position: 'sticky', left: '0'}}>
                {renderLabel()}
            </div>
            {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex}>
                    {renderContentCell(colIndex, values ? values[colIndex] : null)}
                </div>
            ))}
        </div>
    );
};

export default GridRow;