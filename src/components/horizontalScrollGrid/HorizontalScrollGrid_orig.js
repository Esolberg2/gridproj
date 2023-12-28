import React from 'react';
import GridRow from '../gridRow/GridRow';
import Cell from '../cell/Cell';
import { useState } from 'react'


const HorizontalScrollGrid = ({ rows, columns, gridData, cellWidth, columnLabels, renderLabelCell, renderContentCell, renderColHeaderCell, showRowLabels }) => {

    const getDefaultRowData = function() {
        const gridData = {};
        Array.from(Array(rows).keys()).forEach((_, index) => {
            gridData[index] = {label: index, contents: getDefaultCellData()}
        });
        return gridData;
    }

    const getDefaultCellData = function() {
        const rowData = {}
        Array.from(Array(columns).keys()).forEach((_, colIndex) => {
            rowData[colIndex] = {}
        })
        return rowData
    }

    const [gridStateData, setGridStateData] = useState(gridData || getDefaultRowData() );

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

    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    renderColHeaderCell = renderColHeaderCell != null ? renderColHeaderCell : (colIndex, columnLabels) => <Cell key={colIndex} index={colIndex} cellWidth={cellWidth}>{columnLabels}</Cell>

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