import React, { useEffect, useState }from 'react';
import Chart from "react-google-charts";
import {getHistory} from './../../../actions/api';

export function History({poolId}) {
  const [oxygen, setOxygen] = useState()
  const [temperature, setTemperature] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const dateFromDay = (year, day) => {
    const date = new Date(year, 0);
    return new Date(date.setDate(day));
  }

  useEffect(() => {
    const header = [[
      { type: 'date', label: 'x' },
      { type: 'number', label: 'values' },
      { id: 'i0', type: 'number', role: 'interval' },
      { id: 'i1', type: 'number', role: 'interval' },
    ]];

    async function get() {
      setIsLoading(true)
      try {
        const d = await getHistory(poolId)
        return d;
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false)
      }
    }
    
    get().then(r => {
      setOxygen(header.concat(r.map(x => [dateFromDay(new Date().getFullYear(), x._id.day), x.avgOxygen, x.minOxygen, x.maxOxygen] )));
      setTemperature(header.concat(r.map(x => [dateFromDay(new Date().getFullYear(), x._id.day), x.avgTemperature, x.minTemperature, x.maxTemperature] )));
    }); 
  }, [])

  return ( isLoading ? <div>Loading...</div> :
    <div>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={oxygen}
        options={{
          title: 'Oxygen, min/avg/max',
          curveType: 'function',
          series: [{ color: '#D9544C' }],
          intervals: { style: 'bars' },
          legend: 'none',
        }}
        rootProps={{ 'data-testid': '3' }}
      />
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={temperature}
        options={{
          title: 'Temperature, min/max',
          curveType: 'function',
          series: [{ color: '#D9544C' }],
          intervals: { style: 'bars' },
          legend: 'none',
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    </div>
  )
}