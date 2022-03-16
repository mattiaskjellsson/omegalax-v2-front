import Tank from './../tank';
import { putLimits, getAllLimits, getData } from './../../actions/api';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
export function Landing() {
  const aTanks = new Array(14).fill(1).map((v, i) => v + i);
  const bTanks = new Array(13).fill(15).map((v, i) => v + i);
  const cTanks = new Array(13).fill(28).map((v, i) => v + i);
  const dTanks = new Array(10).fill(41).map((v, i) => v + i);

  const updateInterval = 20000;

  const [limits, setLimits] = useState()
  const [timer, setTimer] = useState()
  const [data, setData] = useState()
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchLimits() {
      try {
        const limits = await getAllLimits()
        setError({ message: null })
        return limits
      } catch (e) {
        setError({ message: `${e.message}` })
        return []
      }
    }

    async function fetchData() {
      try {
        const data = await getData()
        setError({ message: null })
        return data
      } catch (e) {
        setError({ message: `${e.message}` })
        return[]
      }
    }

    async function start() {
      try {
        setIsLoading(true)

        const data = await fetchData()
        const limits = await fetchLimits()

        setData(data)
        setLimits(limits)

        setTimer(setInterval(async () => {
          const data = await fetchData()
          setData(data)
        }, updateInterval))

      } catch (e) {
        setData([])
        setLimits([])
      } finally {
        setIsLoading(false)
      }
    }

    start()

    return function cleanup() {
      clearInterval(timer)
    };
  // eslint-disable-next-line
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
      <div className="error-container">
        <div className="error-message">{error.message}</div>
      </div>
      <div className="tank-row">{
        aTanks.map((x, i) => {
          return i === 8 
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
          return i === 8 
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
            return i === 8 
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
          return i === 7 
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