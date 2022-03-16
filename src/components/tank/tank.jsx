import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiSettings, FiThermometer, FiBarChart, FiBell, FiBellOff } from 'react-icons/fi';
import { BsBellFill } from 'react-icons/bs';

import { BiTachometer, } from 'react-icons/bi';

import { Oxygen } from './oxygen/oxygen';
import { Settings } from './settings/settings';
import { Temperature } from './temperature/temperature';
import { History } from '../history/history';

import './tank-tabs.css';
import './tank.css';

export function Tank({id, name, values, limits, onSettingsSave}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [lastTabIndex, setLastTabIndex] = useState(0)
  const [isOpen, setOverlay] = useState(false);

  const handleSettingsSave = (settings) => {
    onSettingsSave({poolId: id, ...settings})
  }

  const handleTabChange = (index, lastIndex) => {
    setTabIndex(index)
    setLastTabIndex(lastIndex)
    if (index === 2) {
      setOverlay(true)  
    }
  }

  const closeOverlay = () => {
    setTabIndex(lastTabIndex)
    setOverlay(false)   
  }

  const alarmDisplay = <div className='alarm-status-wrapper'>
    {values?.alarming
      ? <BsBellFill />
      : limits?.isAlarmOn
        ? <FiBell />
        : <FiBellOff />}
  </div>;
  const nameDisplay = <div className='name-wrapper'>
    <div className='name'>{name}</div>
  </div>;
  
  return (
    <div className='tank'>
      <div className='header'>
        {nameDisplay}
        {alarmDisplay}
      </div>
      <Tabs
        selectedIndex={tabIndex} 
        onSelect={handleTabChange}
      >
        <TabList>
          <Tab>
            <div className='tab-wrapper'>
              <BiTachometer size={28} />
              <div className='tab-name'>Oxygen</div>
            </div>
          </Tab>
          <Tab>
            <div className='tab-wrapper'>
              <FiThermometer size={28} />
              <div className='tab-name'>Temp.</div>
            </div>
          </Tab>
          <Tab>
            <div className='tab-wrapper'>
              <FiBarChart size={28} />
              <div className='tab-name'>History</div>
            </div>
          </Tab>
          <Tab>
            <div className='tab-wrapper'>
              <FiSettings size={28} />
              <div className='tab-name'>Settings</div>
            </div>
          </Tab>
        </TabList>
        <TabPanel style={{ backgroundColor: values?.alarming ? '#f5cece' : 'whitesmoke' }}>
          <Oxygen 
            oxygen={values?.oxygen ?? null}
            limits={limits}
          />
        </TabPanel>
        <TabPanel>
          <Temperature value={values?.temperature ?? null } />
        </TabPanel>
        <TabPanel>
          <History 
            poolId={id} 
            display={isOpen} 
            close={closeOverlay} 
            poolName={name}
          />
        </TabPanel>
        <TabPanel>
          <Settings limits={limits} onSave={handleSettingsSave}/>
        </TabPanel>
      </Tabs>      
    </div>
  );
}