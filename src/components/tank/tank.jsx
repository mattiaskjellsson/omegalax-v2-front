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

export function Tank({id, name, updateInterval, values, limits, onSettingsSave}) {
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

  return (
    <div className='tank'>
      <div className='header'>
        <div className='name-wrapper'>
          <div className='name'>{name}</div>
        </div>
        <div className='alarm-status-wrapper'>
          { 
            values?.alarming 
            ? <BsBellFill /> 
            : limits?.isAlarmOn 
              ? <FiBell /> 
              : <FiBellOff />
          }
        </div>
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
        <TabPanel 
          style={
            {
              backgroundColor: values?.alarming 
                ? '#e63535' 
                : '#f5f5f5'
            }
          }
        >
          <Oxygen
            oxygen={values?.oxygen ?? null} 
            alarming={values?.alarming ? true : false ?? false }
            limits={limits}
            updateInterval={updateInterval}
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