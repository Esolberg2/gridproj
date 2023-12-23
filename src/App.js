import './App.css';
import Slider from '@mui/material/Slider';
import { useState } from 'react'
import moment from 'moment';
import TimelineComposed from './components/TimelineComposed';


function App() {
  const [sliderValue, setSliderValue] = useState(100);
  const columnHeaders = calculateColumns("01:00", "11:53");
  const rowLabels = Array.from(Array(columnHeaders.length + 1).keys())

  console.log(columnHeaders.length)
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

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

  // return (
  //   <div className="App" style={{ display: 'flex', flexDirection: 'column', width: '1000px', overscrollBehavior: 'contain' }}>
  //     <TimelineComposed rows={2} columns={14} cellWidth={sliderValue} columnLabels={columnHeaders} rowLabels={rowLabels}/>
  //     <Slider
  //       aria-label="Small steps"
  //       value={sliderValue}
  //       onChange={handleChange}
  //       step={1}
  //       min={100}
  //       max={500}
  //       valueLabelDisplay="auto"
  //       />
  //   </div>
  // );

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{height: "100px"}}>
        HEADER
      </div>
      <div className="TimelineContainer" style={{ overflowX: 'auto' }}>
        <TimelineComposed
          rows={2}
          columns={14}
          cellWidth={sliderValue}
          columnLabels={columnHeaders}
          rowLabels={rowLabels}
          />
      </div>
      <Slider
        aria-label="Small steps"
        value={sliderValue}
        onChange={handleChange}
        step={1}
        min={100}
        max={500}
        valueLabelDisplay="auto"
        style={{width: '500px'}}
      />
    </div>
  );
  
  // return (
  //   <div className="App" style={{ display: 'flex', flexDirection: 'column', width: '1000px', overflowX: 'hidden' }}>
  //     <div style={{ overflowX: 'auto', width: '100%', marginRight: '-17px' }}>
  //       <TimelineComposed rows={2} columns={14} cellWidth={sliderValue} columnLabels={columnHeaders} rowLabels={rowLabels}/>
  //     </div>
  //     <Slider
  //       aria-label="Small steps"
  //       value={sliderValue}
  //       onChange={handleChange}
  //       step={1}
  //       min={100}
  //       max={500}
  //       valueLabelDisplay="auto"
  //     />
  //   </div>
  // );
  
}

export default App;
