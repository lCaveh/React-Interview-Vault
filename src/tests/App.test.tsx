import { App } from '@components/App';
import React from 'react';
import { renderWithContext, screen } from './testUtils';
describe('App', () => {
  test('should render component', () => {
    renderWithContext(<App />);
    const app = screen.getByTestId('app');
    expect(app).toBeInTheDocument();
  });
});
