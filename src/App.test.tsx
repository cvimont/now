import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Chat', () => {
  render(<App />);
  const chatElement = screen.getByText(/Now/i);
  expect(chatElement).toBeInTheDocument();
});
