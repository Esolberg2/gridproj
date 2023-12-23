import React from 'react';
import GridRow from './GridRow';
import Cell from './Cell';
import TimelineCell from './TimelineCell';
import moment from 'moment';


const Timeline = ({ rows, columns, cellWidth, columnLabels, rowLabels }) => {

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

    const renderHeader = function() {
        return (
            <GridRow
                key={-1}
                rowLabel={""}
                rowIndex={-1}
                columns={columns}
                cellWidth={cellWidth}
                values={columnLabels}
                renderContentCell={renderColHeaderCell}
                />
        )
    }

    const renderBodyCell = function(colIndex, cellData) {
        return (
            <TimelineCell key={colIndex} colIndex={colIndex} cellWidth={cellWidth}>
                {cellData ? cellData : '_'}
            </TimelineCell>
        )
    }

    const renderBodyRows = function() {
        return (
            <div>
                {[...Array(rows)].map((_, rowIndex) => (
                    <GridRow
                        key={rowIndex}
                        rowIndex={rowIndex}
                        columns={columns} 
                        cellWidth={cellWidth} 
                        rowLabel={rowLabels ? rowLabels[rowIndex] : null}
                        renderContentCell={renderBodyCell}
                    />
                ))}
            </div>
        )
    }

    return (
        <div style={{ display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {renderHeader()}
                {renderBodyRows()}
            </div>
        </div>
    );
};

export default Timeline;