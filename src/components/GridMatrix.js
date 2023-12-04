import React from 'react';
import GridColumnHeaders from './GridColumnHeaders';
import GridRow from './GridRow';

const GridMatrix = ({ rows, columns, cellWidth, columnLabels, rowLabels }) => {

    const renderRows = function(rows, conlumns, cellWidth) {
        return (
            <div >
                {[...Array(rows)].map((_, rowIndex) => (
                    <GridRow key={rowIndex} rowIndex={rowIndex} columns={columns} cellWidth={cellWidth} cellContent={Array(columns).fill(rowIndex)}/>
                ))}
            </div>
        )
    }

    return (
        <div>
            <GridColumnHeaders columns={columns} cellWidth={cellWidth} columnLabels={columnLabels} />
            {renderRows(rows, columns, cellWidth )}
        </div>
    );
};

export default GridMatrix;