import React, {useEffect, useState} from 'react';
import ReactSpeedometer from "react-d3-speedometer";

import './oxygen.css';

export function Oxygen({oxygen, alarming, limits, updateInterval}) {
  const animationDuration = 1000
  const [limit, setLimit] = useState()
  const [value, setValue] = useState()

  useEffect(() => {
    const interval = Math.floor(Math.random() * Math.max([updateInterval-animationDuration, 0]))
    const timeout = setTimeout(() => { 
      setValue(oxygen);
     }, interval);

     return () => {
       clearTimeout(timeout);
     }
  }, [oxygen, updateInterval])

  useEffect(() => {
    if (limits)
      setLimit(limits)
  }, [limits])

  return (
    oxygen 
      ? <div className='oxygen-wrapper'>
          <ReactSpeedometer
            className='oxygen-meter'
            height={200}
            width={150}
            ringWidth={24}
            segments={7}
            segmentColors={['#e63535', '#e6ae35', '#e0e635', '#5bb839', '#e0e635', '#e6ae35', '#e63535']}
            maxSegmentLabels={5}
            minValue={limit?.oxygenLow ?? 0} 
            maxValue={limit?.oxygenHigh ?? 200} 
            value={value ?? 0} 
            needleTransitionDuration={animationDuration}
          />
        </div>
      : <></>
  )
}