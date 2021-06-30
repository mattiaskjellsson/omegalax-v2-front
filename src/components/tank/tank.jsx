import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiSettings, FiThermometer, FiBarChart, FiBell, FiBellOff } from 'react-icons/fi';
import { BiTachometer, } from 'react-icons/bi';

import { Oxygen } from './oxygen/oxygen';
import { Settings } from './settings/settings';
import { Temperature } from './temperature/temperature';

import './tank-tabs.css';
import './tank.css';

export function Tank({id, values, limits, onSettingsSave}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tankName = (id) => {
    return id > 0 && id < 15 
      ? `a${id}`
      : id >= 15 && id < 30 
        ? `b${id-14}` 
        : `c${id}`;
  }

  const handleSettingsSave = (settings) => {
    onSettingsSave({poolId: id, ...settings})
  }

  const handleTabChange = (curr, prev, event) => {
    setSelectedTab(curr);
  }

  return (
    <div className='tank'>
      <div className='header'>
        <div className='name-wrapper'>
          <div className='name'>{tankName(id)}</div>
        </div>
        <div className='alarm-status-wrapper'>
          { limits?.isAlarmOn ? <FiBell /> : <FiBellOff />}
        </div>
      </div>
      <Tabs
        selectedIndex={selectedTab}
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
          <Tab disabled={true}>
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

        <TabPanel>
          <Oxygen oxygen={values?.oxygen ?? null} limits={limits}/>
        </TabPanel>
        <TabPanel>
          <Temperature value={values?.temperature ?? null } />
        </TabPanel>
        <TabPanel>
          Any content 3
        </TabPanel>
        <TabPanel>
          <Settings limits={limits} onSave={handleSettingsSave}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}