import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from '@components/App';
import { store } from '@redux/store';

describe('App Component', () => {
  it('should render app container', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
  });

  it('should render main component inside', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const title = screen.getByText('React Interview Vault');
    expect(title).toBeInTheDocument();
  });

  it('should have correct app container structure', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const appContainer = container.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer?.children.length).toBeGreaterThan(0);
  });

  it('should render heading with correct text', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const heading = screen.getByRole('heading', { name: /React Interview Vault/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render search functionality', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render cards', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const cardsGrid = screen.getByTestId('cards-grid');
    expect(cardsGrid).toBeInTheDocument();
  });
});
