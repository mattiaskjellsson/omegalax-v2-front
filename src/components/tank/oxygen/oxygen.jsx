import React, {useEffect, useState} from 'react';
import ReactSpeedometer from "react-d3-speedometer";

import './oxygen.css';

export function Oxygen({oxygen, limits}) {
  const [limit, setLimit] = useState(limits)

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
            segmentColors={['#e63535', '#e6ae35', '#e0e635', '#64e635', '#e0e635', '#e6ae35', '#e63535']}
            maxSegmentLabels={5}
            minValue={limit?.oxygenLow ?? 0} 
            maxValue={limit?.oxygenHigh ?? 100} 
            value={oxygen ?? 0} 
            needleTransitionDuration={1000}
          />
        </div>
      : <></>
  )
}