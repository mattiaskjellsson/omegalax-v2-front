import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { v4 as uuid } from 'uuid';

export function Oxygen({oxygen, limits}) {
  return (
    oxygen 
      ? <ReactSpeedometer
          height={200}
          fluidWidth={true}
          forceRender={true}
          ringWidth={36}
          segments={7}
          maxSegmentLabels={5}
          key={uuid()}
          minValue={limits?.oxygenLow ?? 0} 
          maxValue={limits?.oxygenHigh ?? 100} 
          value={oxygen ?? 0} 
        />
      : <></>
  )
}