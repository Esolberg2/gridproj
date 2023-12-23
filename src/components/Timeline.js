import React from 'react';
import Cell from './Cell';
import TimelineCell from './TimelineCell';
import HorizontalScrollGrid from './HorizontalScrollGrid';
import moment from 'moment';


const Timeline = ({ rows, cellWidth}) => {

    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    
    // Timeline specific logic to compose with HorizontalScrollGrid
    const columnLabels = calculateColumns("01:00", "11:53");
    const rowLabels = Array.from(Array(columnLabels.length + 1).keys())

    function calculateColumns(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(':');
        const [endHour,   endMinute]   = endTime.split(':');
        let timeHeaders = [];
    
        let start = moment();
        start.set({hour:startHour,minute:startMinute,second:0,millisecond:0});
        
        let end = moment();
        end.set({hour:endHour,minute:endMinute,second:0,millisecond:0});
    
        // set start to nearest half hour prior.
        moment(start).subtract(start.minute() % 30, "minutes").format("DD.MM.YYYY, h:mm:ss a");
    
        while (start.isBefore(end)) {
          timeHeaders.push(start.format('HH:mm'))
          start.add(30, 'minutes')
        }
        return timeHeaders;
      }

    const renderColHeaderCell = function(colIndex, headerLabel) {
        return (
            <Cell key={colIndex} index={colIndex} cellWidth={cellWidth}>
                {headerLabel}
            </Cell>
        )
    }

    const renderContentCell = function(colIndex, cellData) {
        return (
            <TimelineCell key={colIndex} colIndex={colIndex} cellWidth={cellWidth}>
                {cellData ? cellData : '_'}
            </TimelineCell>
        )
    }

    return (
        <HorizontalScrollGrid
            rows={rows}
            columns={columnLabels.length}
            cellWidth={cellWidth}
            columnLabels={columnLabels}
            rowLabels={rowLabels}
            renderContentCell={renderContentCell}
            renderColHeaderCell={renderColHeaderCell}
            />
    );
};

export default Timeline;