import Cell from './Cell';


const TimelineCell = (props) => {

  const { startTime, endTime, colIndex, cellWidth, children } = props;
  // const cellData = rowData ? rowData.filter(event => event.startTime.isBetween(startTime, endTime, undefined, '[)')) : []

  return (
    <Cell colIndex={colIndex} cellWidth={cellWidth} >
      {children}
    </Cell>
  );
};

export default TimelineCell;