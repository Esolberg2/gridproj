import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const GridExample = ({ rows, columns }) => {
  const generateGridItems = () => {
    const gridItems = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const key = `${row}-${col}`;
        gridItems.push(
          <Grid item key={key} xs={12 / columns}>
            <Paper style={{ padding: 16, textAlign: 'center' }}>
              <Typography>{key}</Typography>
            </Paper>
          </Grid>
        );
      }
    }

    return gridItems;
  };

  return (
    <Grid container spacing={2}>
      {generateGridItems()}
    </Grid>
  );
};

export default GridExample;