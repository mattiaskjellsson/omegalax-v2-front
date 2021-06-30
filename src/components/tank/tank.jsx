import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiSettings, FiThermometer, FiBarChart } from 'react-icons/fi';
import { BiTachometer, } from 'react-icons/bi';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import './tank.css';
import './tank-tabs.css';

export function Tank({id, values, limits}) {
  const [alarmIconStyle, setAlarmIconStyle] = useState({ color: '#c0d793', opacity: 0.3 });
  
  useEffect(() => {
    const c = limits?.isAlarmOn 
      ? { color: '#c0d793;', opacity: 1.0 } 
      : { color: '#c0d793;', opacity: 0.3 }
    setAlarmIconStyle(c)
  }, [limits])

  const tankName = (id) => {
    return id > 0 && id < 15 
      ? `a${id}`
      : id >= 15 && id < 30 
        ? `b${id-14}` 
        : `c${id}`;
  }

  return (
    <div className='tank'>
      <div className='header'>
        <div className='name-wrapper'>
          <div className='name'>{tankName(id)}</div>
        </div>
        <div className='alarm-status-wrapper'>
          <NotificationsActiveIcon style={alarmIconStyle} />
        </div>
      </div>
      <Tabs>
        <TabList>
          <Tab><BiTachometer size={28} /></Tab>
          <Tab><FiThermometer size={28} /></Tab>
          <Tab disabled={true}><FiBarChart size={28} /></Tab>
          <Tab><FiSettings size={28} /></Tab>
        </TabList>

        <TabPanel>
          Any content 1
        </TabPanel>
        <TabPanel>
          Any content 2
        </TabPanel>
        <TabPanel>
          Any content 3
        </TabPanel>
        <TabPanel>
          Any content 4
        </TabPanel>
      </Tabs>
    </div>
  );
}