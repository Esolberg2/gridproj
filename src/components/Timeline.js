import React from 'react';
import GridRow from './GridRow';
import Cell from './Cell';
import TimelineCell from './TimelineCell';


const Timeline = ({ rows, columns, cellWidth, columnLabels, rowLabels }) => {

    // const renderCellContent = function(colIndex) {
    //     return cellContent && Array.isArray(cellContent) && cellContent.length === columns ? cellContent[colIndex] : null
    // }

    const renderBodyCell = function(colIndex, rowIndex, rowData) {

        return (
            <TimelineCell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} cellWidth={cellWidth}>
                {rowData ? rowData : '_'}
            </TimelineCell>
        )
    }

    const renderColHeaderCell = function(colIndex, headerLabel) {
        return (
            <Cell key={colIndex} index={colIndex} cellWidth={cellWidth}>
                {headerLabel}
            </Cell>
        )
    }

    const renderRowLabelCell = function(rowIndex, rowLabel) {
        return (
            <Cell key={rowIndex} index={rowIndex} cellWidth={100}>
                {rowLabel}
            </Cell>
        )
    }

    const renderBodyRows = function(rows, columns, cellWidth) {
        return (
            <div>
                {[...Array(rows)].map((_, rowIndex) => (
                    <GridRow key={rowIndex} rowIndex={rowIndex} columns={columns} cellWidth={cellWidth}>
                        {renderBodyCell}
                    </GridRow>
                ))}
            </div>
        )
    }

    const renderRowLabels = function(rows) {
        // const labels = Array.from(Array(rows + 1).keys())
        return (
            <div>
                {[...Array(rows + 1)].map((_, rowIndex) => (
                    renderRowLabelCell(rowIndex, rowLabels[rowIndex])
                ))}
            </div>
        )
    }

    const renderColumnHeaders = function(columns) {
        return (
            <div>
                <GridRow key={-1} rowIndex={-1} columns={columns} cellWidth={cellWidth} values={columnLabels}>
                    {renderColHeaderCell}
                </GridRow>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex'}}>
            {renderRowLabels(rows, cellWidth)}
            <div>
                {renderColumnHeaders(columns, cellWidth)}
                {renderBodyRows(rows, columns, cellWidth)}
            </div>
        </div>
    );
};

export default Timeline;