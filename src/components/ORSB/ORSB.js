import React, { useEffect, useState, useCallback, useRef } from 'react';
// import Cell from '../cell/Cell';
// import TimelineCell from '../cell/TimelineCell';
// import HorizontalScrollGrid from './HorizontalScrollGrid';
import moment from 'moment';
import _ from 'lodash';
import ContentRow from './ContentRow';
import HeaderRow from './HeaderRow';



const ORSB = ({ timelineData, startTime, endTime, minuteInterval, labelWidth, cellWidth, currentTimeOffsetMinutes}) => {
    
    const [gridStateData, setGridStateData] = useState(timelineData);


    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    labelWidth = labelWidth ? labelWidth : 100;
    
    // Timeline specific logic to compose with HorizontalScrollGrid
    const columnData = calculateColumnStartTimes(startTime, endTime);
    const pixelsPerMinute = (cellWidth + 2) / minuteInterval
    
    const currentTimePixelOffset = (pixelsPerMinute * currentTimeOffsetMinutes) + labelWidth

    function calculateColumnStartTimes(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(':');
        const [endHour,   endMinute]   = endTime.split(':');
        let columnData = [];
    
        let start = moment();
        start.set({hour:startHour,minute:startMinute,second:0,millisecond:0});
        
        let end = moment();
        end.set({hour:endHour,minute:endMinute,second:0,millisecond:0});
    
        // set start to nearest half hour prior.
        moment(start).subtract(start.minute() % minuteInterval, "minutes").format("DD.MM.YYYY, h:mm:ss a");
    
        while (start.isBefore(end)) {
            columnData.push(
                {
                    startTime: moment(start),
                    endTime: moment(start.add(minuteInterval, 'minutes'))
                }
            )
        }
        return columnData;
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

    const updateState = useCallback((targetObject, changes) => {
        setGridStateData((prevState) => {
          const newState = _.cloneDeep(targetObject || prevState); // Use targetObject if provided, else use prevState
    
          // Apply changes
          _.map(changes, ({ path, value }) => {
            _.set(newState, path, value);
          });
    
          return newState;
        });
      }, []);


      const rescheduleCase = function (targetRoom) {

        const wrappedRescheduleCase = function (caseObj) {
          
            // caseObj.startTime = newTime
            const sourceRoom = caseObj.room;

            console.log(caseObj)
            caseObj.room = targetRoom
            setGridStateData((prevState) => {
                const updatedSourceRoom = prevState[sourceRoom].events.filter(eventObj => eventObj.id !== caseObj.id)
                const updatedTargetRoom = [...prevState[targetRoom].events.filter(eventObj => eventObj.id !== caseObj.id), caseObj]
        
                console.log(prevState[targetRoom].events)
                console.log(updatedTargetRoom)
                console.log("")
                console.log(prevState[sourceRoom].events)
                console.log(updatedSourceRoom)
                return {
                    ...prevState,
                    [sourceRoom]: { ...prevState[sourceRoom], events: updatedSourceRoom },
                    [targetRoom]: { ...prevState[targetRoom], events: updatedTargetRoom },
                };
            })
        }
        
        return wrappedRescheduleCase
    }

    const reschedTest = rescheduleCase("OR2")

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const offSetTop = containerRef.current.offsetTop;
            const verticalLine = document.getElementById('verticalLine');

            if (verticalLine) {
                verticalLine.style.top = `${offSetTop}px`;
                verticalLine.style.height = `${containerHeight}px`;
            }
        }
      }, []); 

    return (
        <>
        <div className="HorizontalScrollGridContainer" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex'}}>
                <div className="container" style={{display: 'flex', flexDirection: 'column'}} ref={containerRef}>
                    <HeaderRow columnData={columnData} cellWidth={cellWidth}/>
                    {
                        Object.entries(gridStateData).map(([rowKey, rowData]) => {
                            return <ContentRow dropHandler={rescheduleCase(rowKey)} pixelsPerMinute={pixelsPerMinute} key={rowKey} rowKey={rowKey} rowData={rowData} columnData={columnData} cellWidth={cellWidth} labelWidth={labelWidth}/>
                        })
                    }
                    <div id="verticalLine" className='overlayLine' style={{ zIndex: 999, position: 'absolute', left: `${currentTimePixelOffset}px`, width: '2px', backgroundColor: 'blue' }}></div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ORSB;