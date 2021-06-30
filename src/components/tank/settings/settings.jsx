import React from 'react';
import { useForm } from "react-hook-form";

import './settings.css';

export function Settings({limits, onSave}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const mySubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSave)(e)
  }

  return (
    <div>
    <form onSubmit={mySubmit}>
      <div className='f c mt-8'>
        <label className='input-label' htmlFor='oxygenLow'>Low oxygen limit</label>
        <input defaultValue={limits?.oxygenLow} {...register('oxygenLow', { required: true })} type='number'/>
        {errors.oxygenLow && <div className='error-message'>This field is required</div>}
      </div>

      <div className='f c mt-8'>
        <label className='input-label' htmlFor='oxygenHigh'>High oxygen limit</label>
        <input defaultValue={limits?.oxygenHigh} {...register('oxygenHigh', { required: true })} type='number' />
        {errors.oxygenHigh && <div className='error-message'>This field is required</div>}
      </div>

      <div className='f r mt-8'>
        <label className='input-label' htmlFor='isAlarmOn'>Alarm on</label>
        <input defaultChecked={limits?.isAlarmOn} {...register('isAlarmOn')} type='checkbox' />
      </div>

      <div className='f r mt-8'>
        <input type="submit" />
      </div>
    </form>
    </div>
  );
}