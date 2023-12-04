import GridRow from './GridRow';


const GridColumnHeaders = ({ columns, cellWidth, columnLabels }) => {
    
    return (
        <GridRow rowIndex={-1} columns={columns} cellWidth={cellWidth} cellContent={columnLabels}  />
    )
};

export default GridColumnHeaders;