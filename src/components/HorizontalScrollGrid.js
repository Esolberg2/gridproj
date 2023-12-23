import React from 'react';
import GridRow from './GridRow';
import Cell from './Cell';

const HorizontalScrollGrid = ({ rows, columns, cellWidth, columnLabels, rowLabels, renderContentCell, renderColHeaderCell }) => {
    
    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    renderColHeaderCell = renderColHeaderCell != null ? renderColHeaderCell : (colIndex, headerLabel) => <Cell key={colIndex} index={colIndex} cellWidth={cellWidth}>{headerLabel}</Cell>

    // render helpers
    const renderColHeaders = function() {
        if (columnLabels != null) {
            return (
                <GridRow
                    key={-1}
                    rowLabel={""}
                    rowIndex={-1}
                    columns={columns}
                    cellWidth={cellWidth}
                    values={columnLabels}
                    renderContentCell={renderColHeaderCell}
                    />
            )
        }
    }

    const renderBodyRows = function() {
        return (
            <div>
                {[...Array(rows)].map((_, rowIndex) => (
                    <GridRow
                        key={rowIndex}
                        rowIndex={rowIndex}
                        columns={columns} 
                        cellWidth={cellWidth} 
                        rowLabel={rowLabels ? rowLabels[rowIndex] : null}
                        renderContentCell={renderContentCell}
                        />
                ))}
            </div>
        )
    }

    return (
        <div className="TimelineContainer" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {renderColHeaders()}
                    {renderBodyRows()}
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollGrid;