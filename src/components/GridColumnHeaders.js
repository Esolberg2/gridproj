import GridRow from './GridRow';


const GridColumnHeaders = ({ columns, cellWidth, headerLabels }) => {
    
    return (
        <GridRow rowIndex={-1} columns={columns} cellWidth={cellWidth} cellContent={headerLabels}  />
    )
};

export default GridColumnHeaders;