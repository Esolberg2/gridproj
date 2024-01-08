import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import ContentRow from './ContentRow';
import HeaderRow from './HeaderRow';

const ORSB = ({ timelineData, startTime, endTime, minuteInterval, labelWidth, cellWidth, currentTimeOffsetMinutes}) => {
    // set defaults
    cellWidth = cellWidth ? cellWidth : 100;
    labelWidth = labelWidth ? labelWidth : 100;
    
    const columnData = calculateColumnStartTimes(startTime, endTime);
    const pixelsPerMinute = (cellWidth + 2) / minuteInterval;

    const [gridStateData, setGridStateData] = useState(timelineData);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentTimePixelOffset, setCurrentTimePixelOffset] = useState((pixelsPerMinute * currentTimeOffsetMinutes) + labelWidth);


    // // set defaults
    // cellWidth = cellWidth ? cellWidth : 100;
    // labelWidth = labelWidth ? labelWidth : 100;
    
    // const columnData = calculateColumnStartTimes(startTime, endTime);
    // const pixelsPerMinute = (cellWidth + 2) / minuteInterval;
    // const currentTimePixelOffset = (pixelsPerMinute * currentTimeOffsetMinutes) + labelWidth;

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

    const handleScroll = () => {
        if (gridContainerRef.current) {
        //   console.log('Horizontal Scroll Position:', gridContainerRef.current.scrollLeft);
          setScrollPosition((prevState) => {
            return gridContainerRef.current.scrollLeft
          })
        }
        console.log(scrollPosition)
      };

    const gridContainerRef = useRef(null);
    // const rowContainerRef = useRef(null)

    // dynamically set the position ofthe "now" line
    useEffect(() => {
        if (gridContainerRef.current) {
            const containerHeight = gridContainerRef.current.offsetHeight;
            const offSetTop = gridContainerRef.current.offsetTop;
            const nowLine = document.getElementById('NowLine');

            if (nowLine) {
                nowLine.style.top = `${offSetTop}px`;
                nowLine.style.height = `${containerHeight}px`;
            }
        }
      }, []); 


    //// TO DO: need mt make the automated scrolling factor in the dynamic cell width, which impacts the pixels per minute
    // changing the cell width currently breaks the set interval
    useEffect(() => {
        // const pixelsPerSecont = pixelsPerMinute / 60;
        const secondsPerPixel = 60 / pixelsPerMinute
        const intervalId = setInterval(() => {
            console.log(secondsPerPixel)
            console.log(pixelsPerMinute)
            // Increment the scrollLeft property by 1 pixel
            if (gridContainerRef.current) {
                gridContainerRef.current.scrollLeft += 1;
                setCurrentTimePixelOffset((prevState) => prevState += 1)
            }
        }, secondsPerPixel * 1000); // calculate the smallest amount of time that covers 1 pixel
    
        return () => {
          clearInterval(intervalId);
        };
      }, [pixelsPerMinute]); // Run this effect only once when the component mounts
      
      return (
        <>
          <div ref={gridContainerRef} className="HorizontalScrollGridContainer" style={{ overflowX: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
                <div className="RowContainer" style={{ display: 'flex', flexDirection: 'column'}} >
                <HeaderRow columnData={columnData} cellWidth={cellWidth} />
                    {
                        Object.entries(gridStateData).map(([rowKey, rowData]) => (
                            <ContentRow
                                dropHandler={rescheduleCase(rowKey)}
                                pixelsPerMinute={pixelsPerMinute}
                                key={rowKey}
                                rowData={rowData}
                                columnData={columnData}
                                cellWidth={cellWidth}
                                labelWidth={labelWidth}
                                />
                        ))
                    }
              </div>
              <div id="NowLine2" className='NowLine2 RowLabel' style={{position: 'absolute', top: '10%', left: `${currentTimePixelOffset}px`, height: '100%', width: 2, backgroundColor: 'blue' }}>
                <div id="label" className='RowLabel' style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, backgroundColor: 'blue', color: 'white', position: 'absolute', bottom: '90%', transform: 'translate(-50%)' }}>Now</div>
              </div>
            </div>
          </div>
        </>
      );
};

export default ORSB;