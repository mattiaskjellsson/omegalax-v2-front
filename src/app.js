import './app.css';
import React, { useEffect, useState } from 'react'
import Tank from './components/tank';
import { putLimits, getAllLimits, getData } from './actions/api';

export function App() {
  const aTanks = new Array(5).fill(61).map((v, i) => v + i);
  const bTanks = new Array(5).fill(66).map((v, i) => v + i);
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
    return `L${id}`
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
      <div className="tank-row">
        <div className="error-container">{ error?.message }</div>
      </div>
      <div className="tank-row">
        { aTanks.map((x, i) => tank(x, i)) }
        <div className='tank-row-after'></div>
      </div>
      <div className="tank-row">
        { bTanks.map((x, i) => tank(x, i)) }
        <div className='tank-row-after'></div>
      </div>
    </div>
  );
}
