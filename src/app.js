import './app.css';
import React, { useEffect, useState } from 'react'
import Tank from './components/tank';
import { putLimits, getAllLimits, getData } from './actions/api';
import { v4 as uuid } from 'uuid';

export function App() {
  const aTanks = new Array(14).fill(1).map((v, i) => v + i);
  const bTanks = new Array(13).fill(15).map((v, i) => v + i);
  const cTanks = new Array(13).fill(28).map((v, i) => v + i);
  const dTanks = new Array(10).fill(41).map((v, i) => v + i);

  const updateInterval = 10000;

  const [limits, setLimits] = useState()
  const [timer, setTimer] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState({})

  useEffect(() => {
    async function fetchLimits() {
      try {
        const limits = await getAllLimits()
        setLimits(limits)
        setError({ message: null })
      } catch (e) {
        setError({ message: `${e.message}` })
        setLimits([])
      }
    }

    async function fetchData() {
      try {
        const data = await getData()
        setError({ message: null })
        setData(data)
      } catch (e) {
        setError({ message: `${e.message}` })
        setData([])
      }
    }

    fetchLimits()
    fetchData() 
    setTimer(setInterval(() => {
      fetchData()
    }, updateInterval))

    return function cleanup() {
      clearInterval(timer)
    };
  }, [])

  const handleSettingsSave = async (settings) => {
    try {
      const r = await putLimits(settings)
      const newLimits = [...limits]
      const i = limits.findIndex(x => x.poolId === settings.poolId)
  
      if (i >= 0) {
        newLimits[i] = r
      } else {
        newLimits.push(r)
      }
  
      setLimits(newLimits)
    } catch (e) {
      console.error(e)
    }
  }

  const tankName = (id) => {
    return id > 0 && id < 15 
      ? `a${id}`
      : id >= 15 && id < 28 
        ? `b${id-14}` 
        : id >= 28 && id < 41
          ? `c${id-27}`
          : `d${id-39}`
  }

  const tank = (id, key) => {
    return <Tank 
      key={key} 
      id={id}
      updateInterval={updateInterval}
      name={tankName(id)}
      values={data?.find(x => x.poolId === id) ?? null} 
      limits={limits?.find(x => x.poolId === id) ?? null} 
      onSettingsSave={handleSettingsSave}
    />
  }

  return (
    <div className="app">
      <div className="tank-row">{
        aTanks.map((x, i) => {
          return i === 7 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x, i)}
              </div>)
            : tank(x, i)
        })
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">{
        bTanks.map((x, i) => {
          return i === 7 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x, i)}
              </div>)
            : i === 10 
              ? <div key={uuid()} className='spacer-tank-wrapper'>
                  <div key={uuid()} className='spacer-tank'></div>
                  {tank(x, i)}
                </div>
              : tank(x, i)
        })
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">
        {
          cTanks.map((x, i) => {
            return i === 7 
              ? (<div className='wall-container' key={uuid()}>
                  <div key={uuid()} className="wall"></div>
                  {tank(x, i)}
                </div>)
              : i === 10 
                ? <div key={uuid()} className='spacer-tank-wrapper'>
                    <div key={uuid()} className='spacer-tank'></div>
                    {tank(x, i)}
                  </div>
                : tank(x, i)
          })
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">
        <div className="spacer-tank"></div>
        { dTanks.map((x, i) => {
          return i === 6 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x, i)}
              </div>)
            : tank(x, i)
        }) 
        }<div className='tank-row-after'></div>
      </div>
    </div>
  );
}
