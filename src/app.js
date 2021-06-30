import './app.css';
import React, { useEffect, useState } from 'react'
import Tank from './components/tank';
import { v4 as uuid } from 'uuid';
import { putLimits, getAllLimits, getData } from './actions/api';

export function App() {
  const aTanks = new Array(14).fill(1).map((v, i) => v + i);
  const bTanks = new Array(14).fill(15).map((v, i) => v + i);
  const cTanks = new Array(14).fill(30).map((v, i) => v + i);
  const dTanks = new Array(14).fill(45).map((v, i) => v + i);

  const [limits, setLimits] = useState()
  const [timer, setTimer] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    async function fetchLimits() {
      setLimits(await getAllLimits())
    }

    async function fetchData() {
      setData(await getData())
    }

    
    fetchLimits()
    setTimer(setInterval(() => {
      fetchData()
    }, 10000))

    return function cleanup() {
      clearInterval(timer)
    };
  }, [])
  

  const handleSettingsSave = async (settings) => {
    const r = await putLimits(settings)

    const newLimits = [...limits]
    const i = limits.findIndex(x => x.poolId === settings.poolId)

    if (i >= 0) {
      newLimits[i] = r
    } else {
      newLimits.push(r)
    }

    setLimits(newLimits)
  }

  const tank = (id) => {
    return <Tank 
      key={uuid()} 
      id={id} 
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
                {tank(x)}
              </div>)
            : tank(x)
        })
      }</div>
      <div className="tank-row">{
        bTanks.map((x, i) => {
          return i === 7 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x)}
              </div>)
            : tank(x)
        })
      }</div>
      <div className="tank-row">

      </div>
      <div className="tank-row">

      </div>
    </div>
  );
}
