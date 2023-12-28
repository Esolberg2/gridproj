import React from 'react';
import Cell from '../cell/Cell';
import TimelineCell from '../cell/TimelineCell';
import HorizontalScrollGrid from './HorizontalScrollGrid';
import moment from 'moment';
import { useState } from 'react'


const Timeline = ({ rows, cellWidth, timelineData, startTime, endTime, minuteInterval}) => {
    
    const [gridStateData, setGridStateData] = useState(timelineData);

    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    
    // Timeline specific logic to compose with HorizontalScrollGrid
    const columnStartTimes = calculateColumnStartTimes(startTime, endTime);

    function calculateColumnStartTimes(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(':');
        const [endHour,   endMinute]   = endTime.split(':');
        let timeHeaders = [];
    
        let start = moment();
        start.set({hour:startHour,minute:startMinute,second:0,millisecond:0});
        
        let end = moment();
        end.set({hour:endHour,minute:endMinute,second:0,millisecond:0});
    
        // set start to nearest half hour prior.
        moment(start).subtract(start.minute() % minuteInterval, "minutes").format("DD.MM.YYYY, h:mm:ss a");
    
        while (start.isBefore(end)) {
          timeHeaders.push(moment(start))
          start.add(minuteInterval, 'minutes')
        }
        return timeHeaders;
      }

      

    const renderColHeaderCell = function(rowIndex, colIndex, headerLabels) {
        return (
            <Cell style={{width: cellWidth, alignItems: 'flex-start'}} key={colIndex} index={colIndex}>
                <div style={{paddingLeft: '10px'}}>
                    {headerLabels[colIndex].format('HH:mm')}
                </div>
            </Cell>
        )
    }

    const renderLabelCell = function(rowIndex, rowData, rowLabel) {
        return (
            <Cell className="RowLabel" style={{width: 100, backgroundColor: 'white', position: 'sticky', left: '0', zIndex: 999}} key={rowIndex} index={rowIndex}>
                {rowLabel}
            </Cell>
        )
    }

    const selectEventsForCell = function(rowData, cellStart, cellEnd) {
        return rowData.events?.filter(eventObj => {
            if (eventObj.startTime) {
                const [startHour, startMinute] = eventObj.startTime.split(':');
                let eventStart = moment().set({hour:startHour,minute:startMinute,second:0,millisecond:0});
                const isSameOrAfterCellStart = eventStart.isSameOrAfter(cellStart);
                const isBeforeCellEnd = eventStart.isBefore(cellEnd);
                return isSameOrAfterCellStart && isBeforeCellEnd
            }
            return false
        })
    }

    const renderContentCell = function(rowIndex, colIndex, rowData) {
        return (
            <TimelineCell
                key={colIndex}
                colIndex={colIndex}
                data={selectEventsForCell(rowData, columnStartTimes[colIndex], moment(columnStartTimes[colIndex]).add(minuteInterval, "minutes"))}
                startTime={columnStartTimes[colIndex]}
                endTime={moment(columnStartTimes[colIndex]).add(minuteInterval, "minutes")}
                pixelsPerMinute={((cellWidth+2)/minuteInterval)}
                style={{ width: cellWidth }}
                />
        )
    }

    const updateRow = function () {
        setGridStateData(current => {
            return {
                ...current,
                OR2: {
                    ...current["OR2"],
                    // label: "foo"
                    // ...current["OR2"].events,
                    ...current["OR2"].events[0],
                    ...current["OR2"].events[0].name = "foo",
                    ...current["OR2"].events[0].startTime = "02:30",
                    ...current["OR2"].events[0].endTime = "04:30"
                }
            }
        })
    }

    return (
        <>
        <HorizontalScrollGrid
            rows={rows}
            columns={columnStartTimes.length}
            columnLabels={columnStartTimes}
            showRowLabels={true}
            renderContentCell={renderContentCell}
            renderColHeaderCell={renderColHeaderCell}
            gridData={gridStateData}
            renderLabelCell={renderLabelCell}
            />
        <button style={{width: 50}} onClick={()=>{updateRow()}}>
            test
        </button>
        </>
    );
};

export default Timeline;