import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello world', () => {
  render(<App />);
  const hellolement = screen.getByText(/Hello world/i);
  expect(hellolement).toBeInTheDocument();
});
