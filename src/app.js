import './app.css';
import React, { useEffect, useState } from 'react'
import Tank from './components/tank';
import { v4 as uuid } from 'uuid';
import { putLimits, getAllLimits, getData } from './actions/api';

export function App() {
  const aTanks = new Array(14).fill(1).map((v, i) => v + i);
  const bTanks = new Array(13).fill(15).map((v, i) => v + i);
  const cTanks = new Array(13).fill(28).map((v, i) => v + i);
  const dTanks = new Array(10).fill(41).map((v, i) => v + i);

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
    fetchData() 
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
    // Don't use key on the tanks. They'll redraw on all too many things then...
    return <Tank 
      // key={uuid()} 
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
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">{
        bTanks.map((x, i) => {
          return i === 7 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x)}
              </div>)
            : i === 10 
              ? <div key={uuid()} className='spacer-tank-wrapper'><div key={uuid()} className='spacer-tank'></div>{tank(x)}</div>
              : tank(x)
        })
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">
        {
          cTanks.map((x, i) => {
            return i === 7 
              ? (<div className='wall-container' key={uuid()}>
                  <div key={uuid()} className="wall"></div>
                  {tank(x)}
                </div>)
              : i === 10 
                ? <div key={uuid()} className='spacer-tank-wrapper'><div key={uuid()} className='spacer-tank'></div>{tank(x)}</div>
                : tank(x)
          })
        }<div className='tank-row-after'></div>
      </div>
      <div className="tank-row">
        <div className="spacer-tank"></div>
        { dTanks.map((x, i) => {
          return i === 6 
            ? (<div className='wall-container' key={uuid()}>
                <div key={uuid()} className="wall"></div>
                {tank(x)}
              </div>)
            : tank(x)
        }) 
        }<div className='tank-row-after'></div>
      </div>
    </div>
  );
}
