import './App.css';
import Slider from '@mui/material/Slider';
import { useState } from 'react'
import moment from 'moment';
import Timeline from './components/horizontalScrollGrid/Timeline';


function App() {
  const [sliderValue, setSliderValue] = useState(100);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const dummyData = {
    OR1: {
      label: "OR 1",
      events: []
    },
    OR2: {
      label: "OR 2",
      events: [
        {
          name: "Kate Lyndon",
          specialty: "Spinal",
          startTime: "09:00",
          endTime: "11:00",
          id: 1,
        }
      ]
    },
    OR3: {
      label: "OR 3",
      events: []
    },
    OR4: {
      label: "OR 4",
      events: [
        {
          name: "Brian Kowalski",
          specialty: "Otolaryngology",
          startTime: "01:00",
          endTime: "02:40",
          id: 2
        },
        {
          name: "Conrad Jennings",
          specialty: "Cardiology",
          startTime: "04:00",
          endTime: "05:30",
          id: 3,
        },
        {
          name: "Gale Gillroy",
          specialty: "Spinal",
          startTime: "06:00",
          endTime: "08:00",
          id: 4,
        }
      ]
    },
  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{height: "100px"}}>
        HEADER
      </div>
      <Timeline
        rows={10}
        columns={14}
        cellWidth={sliderValue}
        // columnLabels={columnHeaders}
        // rowLabels={rowLabels}
        timelineData={dummyData}
        startTime={"01:00"}
        endTime={"11:53"}
        minuteInterval={30}
        />
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
}

export default App;
