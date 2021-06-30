import React from 'react';
import Thermometer from 'react-thermometer-component'
import './temperature.css';

export function Temperature({value}) {
    return (
      value 
        ? <div className='thermometer-wrapper'>
            <Thermometer
              theme="light"
              value={value}
              max="100"
              steps="3"
              format="°C"
              size="large"
              height="180"
            />
          </div>
        : <></>
    )
}