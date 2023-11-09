import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn();
});

// Clear and set up the mock before each test
beforeEach(() => {
  global.fetch.mockClear().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ url: 'https://random.dog/woof.jpg' }),
  });
});


test('Fetch New Dogs', () => {
  render(<App />);
  const buttonElement = screen.getByText(/fetch new dogs/i);
  expect(buttonElement).toBeInTheDocument();
});
test('Fetch New Dogs button fetches new dogs when clicked', async () => {
  render(<App />);
  const fetchButton = screen.getByRole('button', { name: /fetch new dogs/i });

  fireEvent.click(fetchButton);

  await waitFor(() => expect(fetch).toHaveBeenCalled());
});

test('successfully fetches dog media and updates state', async () => {
  render(<App />);
  const fetchButton = screen.getByRole('button', { name: /fetch new dogs/i });

  fireEvent.click(fetchButton);

  await waitFor(() => {
    const mediaElements = screen.queryAllByTestId('dog-media');
    expect(mediaElements.length).toBeGreaterThanOrEqual(8);
  }, { timeout: 5000 }); //need longer time to converge
});

