import './app.css';
import Tank from './components/tank';
import { v4 as uuid } from 'uuid';

export function App() {
  const aTanks = new Array(14).fill(1).map((v, i) => v + i);
  const bTanks = new Array(14).fill(15).map((v, i) => v + i);
  const cTanks = new Array(14).fill(30).map((v, i) => v + i);
  const dTanks = new Array(14).fill(45).map((v, i) => v + i);
  
  const tank = (id) => {
    return <Tank key={uuid()} id={id} values={null} limits={null} />
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
