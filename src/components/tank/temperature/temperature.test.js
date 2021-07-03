import React from 'react';
import { render, screen } from '@testing-library/react';
import { Temperature } from './temperature';
import '@testing-library/jest-dom';

describe('Test the thermometer', () => {
  beforeEach(() => {
  });
  
  afterEach(() => {
    render(<></>)
  });

  test('Temperature should be textually visible', () => {
    const expected = 2;
    render(<Temperature value={2}/>);
    const linkElement = screen.getByText(`${expected}°C`);
    expect(linkElement).toBeInTheDocument();
  });

  test('Temperature above 100', () => {
    const expected = 102;
    render(<Temperature value={expected}/>);
    const linkElement = screen.getByText(`${expected}°C`);
    expect(linkElement).toBeInTheDocument();
  });

  test('Temperature below 0', () => {
    const expected = -2;
    render(<Temperature value={expected}/>);
    const linkElement = screen.getByText(`${expected}°C`);
    expect(linkElement).toBeInTheDocument();
  });

})
