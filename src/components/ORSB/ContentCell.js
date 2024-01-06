import Cell from './Cell';
import moment from 'moment';
import React, { useMemo } from 'react';
import CaseTile from './CaseTile';


const ContentCell = ({ rowKey, cellWidth, rowData, cellStartMoment, cellEndMoment, pixelsPerMinute }) => {

    const selectEventsForCell = function(rowData) {
        return rowData.events?.filter(eventObj => {
            if (eventObj.startTime) {
                const [startHour, startMinute] = eventObj.startTime.split(':');
                let eventStart = moment().set({hour:startHour,minute:startMinute,second:0,millisecond:0});
                const isSameOrAfterCellStart = eventStart.isSameOrAfter(cellStartMoment);
                const isBeforeCellEnd = eventStart.isBefore(cellEndMoment);
                return isSameOrAfterCellStart && isBeforeCellEnd
            }
            return false
        })
    }

    const cellDuration = useMemo(() => {
        const cellDuration = cellEndMoment.diff(cellStartMoment, 'minutes');
        return cellDuration
      }, [cellStartMoment, cellEndMoment]);

    // const pixelsPerMinute=(cellWidth+2)/cellDuration
    const cellData = selectEventsForCell(rowData);
    
    return (
        <Cell style={{position: 'relative', width: cellWidth}} >
            {
                cellData.map(caseObj => {
                    return <CaseTile pixelsPerMinute={pixelsPerMinute} style={{position: 'absolute'}} key={caseObj.id} caseObj={caseObj} />
                })
            }
        </Cell>
    );
}

export default ContentCell;