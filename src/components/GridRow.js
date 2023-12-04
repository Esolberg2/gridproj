import TimelineCell from './TimelineCell';

const GridRow = ({ rowIndex, columns, cellWidth, cellContent }) => {

    const renderCellContent = function(colIndex) {
        return cellContent && Array.isArray(cellContent) && cellContent.length === columns ? cellContent[colIndex] : null
    }

    return (
        <div style={{display: 'flex'}} key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex}>
                    <TimelineCell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} cellWidth={cellWidth}>
                        {renderCellContent(colIndex)}
                    </TimelineCell>
                </div>
            ))}
        </div>
    );
};

export default GridRow;