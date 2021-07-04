import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import './settings.css';

export function Settings({limits, onSave}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const mySubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSave)(e)
    setIsLoading(true)
  }

  useEffect(() => {
    setIsLoading(true)
  }, [limits])

  return (
    <div>
    <div className='overlay' style={ isLoading ? {display: 'none'} : {}}></div>
    <form onSubmit={mySubmit}>
      <div className='f c mt-8'>
        <label className='input-label' htmlFor='oxygenLow'>Low oxygen limit</label>
        <input defaultValue={limits?.oxygenLow} {...register('oxygenLow', { required: true, min: 0, max: 999 })} type='number'/>
        {errors.oxygenLow && <div className='error-message'>This field is required</div>}
      </div>

      <div className='f c mt-8'>
        <label className='input-label' htmlFor='oxygenHigh'>High oxygen limit</label>
        <input defaultValue={limits?.oxygenHigh} {...register('oxygenHigh', { required: true, min: 0, max: 999 })} type='number' />
        {errors.oxygenHigh && <div className='error-message'>This field is required</div>}
      </div>

      <div className='f r m mt-8 mb-8'>
        <label className='input-label' htmlFor='isAlarmOn'>Alarm on</label>
        <input defaultChecked={limits?.isAlarmOn} {...register('isAlarmOn')} type='checkbox' />
      </div>

      <div className='f r mt-8'>
        <input className="button" type="submit" value="Save" />
      </div>
    </form>
    </div>
  );
}