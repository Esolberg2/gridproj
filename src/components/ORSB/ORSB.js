import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import ContentRow from './ContentRow';
import HeaderRow from './HeaderRow';

const ORSB = ({ timelineData, startTime, endTime, minuteInterval, labelWidth, cellWidth, currentTimeOffsetMinutes}) => {
    
    const [gridStateData, setGridStateData] = useState(timelineData);

    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    labelWidth = labelWidth ? labelWidth : 100;
    
    const columnData = calculateColumnStartTimes(startTime, endTime);
    const pixelsPerMinute = (cellWidth + 2) / minuteInterval;
    const currentTimePixelOffset = (pixelsPerMinute * currentTimeOffsetMinutes) + labelWidth;

    function calculateColumnStartTimes(startTime, endTime) {
 
            let columnData = [];
            let start = moment(startTime, "hh:mm");            
            let end = moment(endTime, "hh:mm");
        
            // set start to nearest half hour prior.
            moment(start).subtract(start.minute() % minuteInterval, "minutes").format("DD.MM.YYYY, h:mm:ss a");
        
            while (start.isBefore(end)) {
                columnData.push(
                    {
                        startTime: moment(start),
                        endTime: moment(start.add(minuteInterval, 'minutes')),
                    }
                )
            }
            return columnData;
        }

      const rescheduleCase = function (targetRoom) {

        const wrappedRescheduleCase = function (e) {

            const clickStart = e.dataTransfer.getData("clickStart");
            const clickEnd = e.pageX;
            const caseObj = JSON.parse(e.dataTransfer.getData("originalData"));
            const dropMinuteOffset = (clickEnd - clickStart) / pixelsPerMinute;

            const startMoment = moment(caseObj.startTime, "hh:mm");
            startMoment.add(dropMinuteOffset, "minutes").format("hh:mm");
            caseObj.startTime = startMoment.format("hh:mm");

            const sourceRoom = caseObj.room;
            caseObj.room = targetRoom;

            setGridStateData((prevState) => {
                const updatedSourceRoom = prevState[sourceRoom].events.filter(eventObj => eventObj.id !== caseObj.id);
                const updatedTargetRoom = [...prevState[targetRoom].events.filter(eventObj => eventObj.id !== caseObj.id), caseObj];
                return {
                    ...prevState,
                    [sourceRoom]: { ...prevState[sourceRoom], events: updatedSourceRoom },
                    [targetRoom]: { ...prevState[targetRoom], events: updatedTargetRoom },
                };
            });
        }

        return wrappedRescheduleCase;
    }

    const rowContainerRef = useRef(null);

    // dynamically set the position ofthe "now" line
    useEffect(() => {
        if (rowContainerRef.current) {
            const containerHeight = rowContainerRef.current.offsetHeight;
            const offSetTop = rowContainerRef.current.offsetTop;
            const nowLine = document.getElementById('NowLine');

            if (nowLine) {
                nowLine.style.top = `${offSetTop}px`;
                nowLine.style.height = `${containerHeight}px`;
            }
        }
      }, []); 

    return (
        <>
        <div className="HorizontalScrollGridContainer" style={{ overflowX: 'auto' }} >
            <div style={{ display: 'flex'}}>
                <div className="RowContainer" style={{display: 'flex', flexDirection: 'column'}} ref={rowContainerRef} >
                    <HeaderRow columnData={columnData} cellWidth={cellWidth} />
                    {
                        Object.entries(gridStateData).map(([rowKey, rowData]) => {
                            return <ContentRow dropHandler={rescheduleCase(rowKey)} pixelsPerMinute={pixelsPerMinute} key={rowKey} rowData={rowData} columnData={columnData} cellWidth={cellWidth} labelWidth={labelWidth} />
                        })
                    }
                    <div id="NowLine" className='NowLine' style={{ zIndex: 999, position: 'absolute', left: `${currentTimePixelOffset}px`, width: '2px', backgroundColor: 'blue' }} ></div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ORSB;