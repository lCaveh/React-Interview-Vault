import { Provider } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RootState, getStoreWithState } from '@redux/store';

export * from '@testing-library/react';
export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
): any {
  const store = getStoreWithState(state);
  const utils = render(
    <BrowserRouter>
      <Provider store={store}>{element}</Provider>
    </BrowserRouter>
  );
  return { store, ...utils };
}
