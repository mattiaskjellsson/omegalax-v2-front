import React from 'react';
import { render, screen } from '@testing-library/react';
import { Settings } from './settings';
import '@testing-library/jest-dom';

describe('Test the Settings', () => {
  beforeEach(() => {
  });
  
  afterEach(() => {
    render(<></>)
  });

  test('Settings should have four elements', () => {
    const handleSettignsSave = (settings) => {
        return settings
      }
    const limits = {
        oxygenLow: 10,
        oxygenHigh: 100,
        isAlarmOn: true,
    }
    render(<Settings limits={limits} onSave={handleSettignsSave} />);
    const linkElement = screen.getByRole('form')
    expect(linkElement.children.length).toBe(4)
  });

})
