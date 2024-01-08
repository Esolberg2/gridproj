import Cell from './Cell';
import moment from 'moment';
import React from 'react';
import CaseTile from './CaseTile';


const ContentCell = ({ cellWidth, rowData, cellStartMoment, cellEndMoment, pixelsPerMinute }) => {

    const selectEventsForCell = function(rowData) {
        return rowData.events?.filter(eventObj => {
            if (eventObj.startTime) {
                let eventStart = moment(eventObj.startTime, 'hh:mm');
                const isSameOrAfterCellStart = eventStart.isSameOrAfter(cellStartMoment);
                const isBeforeCellEnd = eventStart.isBefore(cellEndMoment);
                return isSameOrAfterCellStart && isBeforeCellEnd;
            }
            return false;
        });
    }

    const cellData = selectEventsForCell(rowData);
    
    return (
        <Cell style={{position: 'relative', width: cellWidth}} >
            {
                cellData.map(caseObj => {
                    return <CaseTile pixelsPerMinute={pixelsPerMinute} cellStartMoment={cellStartMoment} key={caseObj.id} caseObj={caseObj} />
                })
            }
        </Cell>
    );
}

export default ContentCell;