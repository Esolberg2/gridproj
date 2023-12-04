import './App.css';
import Slider from '@mui/material/Slider';
import { useState } from 'react'
import moment from 'moment';
import GridMatrix from './components/GridMatrix';


function App() {
  const [sliderValue, setSliderValue] = useState(100);
  const columnHeaders = calculateColumns("01:00", "11:53");

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

  return (
    <div className="App">
      <GridMatrix rows={10} columns={columnHeaders.length} cellWidth={sliderValue} columnLabels={columnHeaders} />
      <Slider
        aria-label="Small steps"
        value={sliderValue}
        onChange={handleChange}
        step={1}
        min={100}
        max={500}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default App;
