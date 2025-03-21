import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router';
import itemsReducer from '../features/items/itemsSlice';
import HomePage from '../pages/HomePage';

test('renders search input', () => {
  const testStore = configureStore({
    reducer: {
      items: itemsReducer,
    },
    preloadedState: {
      items: {
        items: [],
        status: 'idle',
        error: null,
      },
    },
  });

  render(
    <Provider store={testStore}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );

  const inputElement = screen.getByLabelText(/search posts/i);
  expect(inputElement).toBeInTheDocument();
});