import moment from 'moment';
import React from 'react';

const CaseTile = ({ caseObj, pixelsPerMinute, cellStartMoment}) => {

    const caseDuration = caseObj.duration;
    const caseWidth = caseDuration * pixelsPerMinute;

    const handleOnDragEnd = function (e) {
        e.dataTransfer.setData("clickEnd", e.pageX);
    }

    const handleOnDragStart = function (e) {
        e.dataTransfer.setData("clickStart", e.pageX);
        e.dataTransfer.setData("originalData", JSON.stringify(caseObj));
    }
    
    return (
        <div 
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
            className="CaseTile"
            draggable={true}
            style={{
                backgroundColor: caseObj.color || 'orange',
                pointerEvents: 'auto',
                position: 'absolute',
                width: caseWidth,
                marginLeft: moment(caseObj.startTime, "hh:mm").diff(moment(cellStartMoment), "minutes") * pixelsPerMinute,
            }}>
            <div>
                {caseObj.name}
            </div>
            <div>
                {caseObj.specialty}
            </div>
        </div>
      );
}

export default CaseTile;