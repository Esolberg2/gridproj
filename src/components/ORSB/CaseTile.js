import moment from 'moment';
import React, { useMemo } from 'react';

const CaseTile = ({ caseObj, pixelsPerMinute }) => {
    const caseDuration = useMemo(() => {
        const [startHour, startMinute] = caseObj.startTime.split(':');
        const [endHour, endMinute] = caseObj.endTime.split(':');
        const caseStartMoment = moment().set({ hour: startHour, minute: startMinute, second: 0, millisecond: 0 });
        const caseEndMoment = moment().set({ hour: endHour, minute: endMinute, second: 0, millisecond: 0 });
        const caseDuration = caseEndMoment.diff(caseStartMoment, 'minutes');
        return caseDuration
      }, [caseObj]);
    
    const caseWidth = caseDuration * pixelsPerMinute;

    const handleOnDrag = function (e) {
        e.dataTransfer.setData("originalData", JSON.stringify(caseObj))
    }
    
    return (
        <div 
            onDragStart={handleOnDrag}
            className="CaseTile"
            onClick={()=>console.log("click")}
            draggable={true}
            style={{
            backgroundColor: 'orange',
            pointerEvents: 'auto',
            position: 'absolute',
            width: caseWidth
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