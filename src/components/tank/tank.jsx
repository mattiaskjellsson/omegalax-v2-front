import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Phone, Favorite, ShowChart,PersonPin } from '@material-ui/icons';
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
    return id;
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
          <Tab><Phone /></Tab>
          <Tab><Favorite /></Tab>
          <Tab disabled={true}><ShowChart /></Tab>
          <Tab><PersonPin /></Tab>
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