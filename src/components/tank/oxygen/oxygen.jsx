import React, {useEffect, useState} from 'react';
import ReactSpeedometer from "react-d3-speedometer";

import './oxygen.css';

export function Oxygen({oxygen, alarming, limits, updateInterval}) {
  const animationDuration = 1000
  const [limit, setLimit] = useState()
  const [value, setValue] = useState()
  const [meterStyle, setMeterStyle] = useState()

  useEffect(() => {
    const timeout = Math.floor(Math.random() * Math.max([updateInterval-animationDuration, 0]))
    setTimeout(() => { 
      setValue(oxygen);
     }, timeout);
  }, [oxygen, updateInterval])

  useEffect(() => {
    if (limits)
      setLimit(limits)
  }, [limits])

  useEffect(() => {
    if (alarming !== null)
      setMeterStyle({
        backgroundColor: alarming ? '#e63535' : 'whitesmoke'
      })
  }, [alarming])

  return (
    oxygen 
      ? <div className='oxygen-wrapper' style={meterStyle}>
          <ReactSpeedometer
            className='oxygen-meter'
            height={200}
            width={150}
            ringWidth={24}
            segments={7}
            segmentColors={['#e63535', '#e6ae35', '#e0e635', '#64e635', '#e0e635', '#e6ae35', '#e63535']}
            maxSegmentLabels={5}
            minValue={limit?.oxygenLow ?? 0} 
            maxValue={limit?.oxygenHigh ?? 200} 
            value={value} 
            needleTransitionDuration={animationDuration}
          />
        </div>
      : <></>
  )
}