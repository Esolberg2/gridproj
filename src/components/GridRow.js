import Grid from '@mui/material/Grid';
import TimelineCell from './TimelineCell';

const GridRow = ({ rowIndex, columns, cellWidth, cellContent }) => {

    const renderCellContent = function(colIndex) {
        return cellContent && Array.isArray(cellContent) && cellContent.length === columns ? cellContent[colIndex] : null
    }

    return (
        <Grid 
            container 
            item 
            key={rowIndex} 
            spacing={0}
            wrap="nowrap"
            >
            {[...Array(columns)].map((_, colIndex) => (
                <Grid
                    item 
                    key={colIndex}>
                    <TimelineCell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} cellWidth={cellWidth}>
                        {renderCellContent(colIndex)}
                    </TimelineCell>
                </Grid>
            ))}
        </Grid>
    );
};

export default GridRow;