import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './app';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  jest.useFakeTimers();
  jest.clearAllTimers();
  const linkElement = screen.getByText('a1');
  expect(linkElement).toBeInTheDocument();
});
