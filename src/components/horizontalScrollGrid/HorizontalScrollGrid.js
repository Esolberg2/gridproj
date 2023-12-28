import React from 'react';
import GridRow from '../gridRow/GridRow';
import Cell from '../cell/Cell';
import { useState } from 'react'


const HorizontalScrollGrid = ({ rows, columns, gridData, cellWidth, columnLabels, renderLabelCell, renderContentCell, renderColHeaderCell, showRowLabels }) => {

    const [gridStateData, setGridStateData] = useState(gridData);

    const updateRow = function () {
        setGridStateData(current => {
            return {
                ...current,
                1: {
                    ...current[1],
                    label: "foo"
                }
            }
        })
    }

    // render helpers
    const renderColHeaders = function() {
        if (columnLabels != null) {
            return (
                <GridRow
                    key={-1}
                    rowIndex={-1}
                    columns={columns}
                    cellWidth={cellWidth}
                    showLabel={showRowLabels}
                    rowData={columnLabels}
                    renderContentCell={renderColHeaderCell}
                    renderLabelCell={renderLabelCell}
                    />
            )
        }
    }

    const renderBodyRows = function() {
        return (
            <div>
                {Object.keys(gridStateData).map((rowKey, rowIndex) => (
                    <GridRow
                        key={rowKey}
                        rowIndex={rowIndex}
                        columns={columns} 
                        cellWidth={cellWidth}
                        showLabel={showRowLabels}
                        renderContentCell={renderContentCell}
                        rowLabel={gridStateData[rowKey].label}
                        rowData={gridStateData[rowKey]}
                        renderLabelCell={renderLabelCell}
                        />
                ))}
            </div>
        )
    }

    return (
        <div className="HorizontalScrollGridContainer" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {renderColHeaders()}
                    {renderBodyRows()}
                </div>
            </div>
            <button onClick={updateRow}>test</button>
        </div>
    );
};

export default HorizontalScrollGrid;