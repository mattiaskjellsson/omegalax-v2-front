import React, { useEffect, useState }from 'react';
import Chart from "react-google-charts";
import {getHistory} from '../../actions/api';
import CircleLoader from "react-spinners/ClipLoader";
import './history.css';

export function History({poolId, display, close, poolName}) {
  const [oxygen, setOxygen] = useState()
  const [temperature, setTemperature] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const dateFromDay = (year, day, hour) => {
    const date = new Date(year, 0);
    date.setDate(day)
    date.setHours(hour)
    return date;
  }

  useEffect(() => {
    const header = [[
      { type: 'date', label: 'Day' },
      { type: 'number', label: 'Mean value' },
      { id: 'i0', type: 'number', label: 'min value', role: 'interval' },
      { id: 'i1', type: 'number', label: 'max value', role: 'interval' },
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

    get()
    .then(r => {
      if (r) {
        setOxygen(header.concat(
          r?.map(x => 
            [dateFromDay(new Date().getFullYear(), x._id.day, x._id.hour), 
              x.avgOxygen, 
              x.minOxygen, 
              x.maxOxygen] )
        ));
        setTemperature(header.concat(
          r?.map(x => 
            [dateFromDay(new Date().getFullYear(), x._id.day, x._id.hour), 
              x.avgTemperature, 
              x.minTemperature, 
              x.maxTemperature] )
        ));
      }
    })
    .catch(e => {
      console.error(e);
    }).finally(() => { 
      setIsLoading(false) 
    }); 

    return () => {}
  // eslint-disable-next-line
  }, [])

  return (
    <div className='overlay' style={{display: display}} onClick={close}>
        <div className='overlay-content' onClick={()=>{}}>
            <div className='overlay-header'>
              <span>Historical values {poolName}</span>
            </div>
            { 
              isLoading 
              ? <div className='loading-container'>
                <CircleLoader color={'#282c34'} size={150} />
              </div>
              : <><div className='chart-container'>
                <Chart
                  width={'100%'}
                  height={'100%'}
                  chartType="LineChart"
                  loader={<div className='loading-container'>
                    <CircleLoader color={'#282c34'} size={75} />
                  </div>}
                  data={oxygen}
                  options={{
                    title: 'Oxygen, min/avg/max',
                    curveType: 'function',
                    series: [{ color: '#4CD1D9' }],
                    intervals: { style: 'bars' },
                    legend: 'none',
                  }}
                  rootProps={{ 'data-testid': '3' }}
                />
              </div>
              <div className='chart-container'>
              <Chart
                width={'100%'}
                height={'100%'}
                chartType="LineChart"
                loader={<div className='loading-container'>
                  <CircleLoader color={'#282c34'} size={75} />
                </div>}
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
              </>
            }
        </div>
    </div> 
  )
}