import Grid from '@mui/material/Grid';

const TimelineCell = ({ colIndex, cellWidth, children }) => {
  return (
    <>
        <Grid
            item 
            key={colIndex}>
            <div style={{
                border: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                width: cellWidth,
                whiteSpace: "nowrap",
                minWidth: '30px',
                minHeight: '30px',
                padding: '10px'
            }}>
                {children}
            </div>
        </Grid>
    </>
  );
};

export default TimelineCell;