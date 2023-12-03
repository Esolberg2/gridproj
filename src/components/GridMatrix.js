import React from 'react';
import Grid from '@mui/material/Grid';
import GridColumnHeaders from './GridColumnHeaders';
import GridRow from './GridRow';


const GridMatrix = ({ rows, columns, cellWidth, headerLabels }) => {

    const renderRows = function(rows, conlumns, cellWidth) {
        return (
            <Grid 
                container 
                spacing={0}>
                {[...Array(rows)].map((_, rowIndex) => (
                    <GridRow key={rowIndex} rowIndex={rowIndex} columns={columns} cellWidth={cellWidth} />
                ))}
            </Grid>
        )
    }

    return (
        <div>
            <GridColumnHeaders columns={columns} cellWidth={cellWidth} headerLabels={headerLabels} />
            {renderRows(rows, columns, cellWidth )}
        </div>
    );
};

export default GridMatrix;