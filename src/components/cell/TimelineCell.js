import Cell from './Cell';
import CaseTile from '../caseTile/CaseTile';
import moment from 'moment';


/*
1) the row could maintain a map of which cells have which time range, and allocate the data for the row into 
the correct cell.

2) every cell could watch the data the row recives, and grab what applies to each of themselves.

what if we want to provide the grid with data in a way where we want to specify which cell the data goes in?
for example, what if this were a game board and we want to put an X in row 3, cell 5?

- we could simple supply the move coordinates to the grid, which would then hand the move to row 3,
which would then hand the move to cell 5.

- we could hand the move to grid, then the row, and then to all cells, and only the correct cell would accept the move.

- we could hand the move to the grid, then to all rows, then to all cells.

So we can broadcast data, or we can route data.

routing data is more efficient, so I would rather do this.  It also would cut down on the rendering.

for the board example, we might hardcode the rows and columns, rather then sending the whole data structure as our packet.

---
The Grid will maintain its own default data structure
the datastructure will be an object where the key is the rowLabel and the value is a list of events for the row.

The grid will be supplied with an allocatonPredicate, which will return a row and cell index when given an event.

The grid will optionally accept a mapping function which provides instructions on how to populate the event list for each row key.

- alternatively -
we can mandate the structure of the input data and assume the grid can always read it ** seems like the more standard option
this would mean that the mapping function is part of the grid, or gridData is just a direct passthrough of the received data.


this would be for Timeline
{
  roomKey: {
    label: string,
    events: list<object>
  }
}

for HorizontalScrollGrid:
we would generate the object if not provided

gridData = {}
rows.forEach((_, index) => {
  gridData[index] = {
                      label: index,
                      contents: list<object>
                    }
}

we will also need to provide a function to map contents of a row to a cell.


-----
For live reordering of case tiles:
1) each row could have a temporaryOffset prop.
    When a case is being dragged:
      we check what row it is hovering over, and set that row's temporaryOffset to the width of the case tile.
    when a case is being dragged, 
      we calculate the time where the left edge of the case is, and pass this into the offsetStartTime for the row.
    when a case is being dragged, 
      we pass its startTime to the row it is hovering over.

    The row can use these variables to modify its rowData state as the case is being dragged.
      Note, if a heartbeat happens while the drag is occuring, what happens?
      - If the temporaryOffset, offsetStartTime, and offSetEndTime are separate from rowData,
      then the updating of rowData will just update the projected new ordering.
      Note: if the offSetEndTime is referencing the endTime of the case being dragged,
      its possible that the projected layout could even adapt to the case being dragged being changed.
      Note: what happens if the case being dragged is removed?
      1) - each post is preceeded by a get, and if the get shows the dragged case as being cancelled / already moved, then cancel the post.
          - if one of the other cases being rescheduled is cancelled or moved...
            if an intermediary case is cancelled, then what? 
              check if the prior case is LT or Equal to the removed intermediate case?
              what if the intermediate case and prior case have extra time inbetween?
    
    When the case is dropped, we send the data to the backend, and update the app with the response (which should now reflect the new schedule order if POST was successful)

2) could just have a duplicated rowData object that is actually getting mutated, and when we save the change, the new rowData gets sent to the backend.


*/
const TimelineCell = ({ colIndex, data, pixelsPerMinute, style }) => {
  return (
    <Cell colIndex={colIndex} style={style} >
      {
        data.map(caseObj => {
          const startTime = moment.utc(caseObj.startTime, "HH:mm", true);
          const endTime = moment.utc(caseObj.endTime, "HH:mm", true);
          const duration = endTime.diff(startTime, 'minutes');
          const width = duration * pixelsPerMinute
          return <CaseTile style={{width: width}} key={caseObj.id} name={caseObj.name} specialty={caseObj.specialty} />
        })
      }
      
    </Cell>
  );
};

export default TimelineCell;