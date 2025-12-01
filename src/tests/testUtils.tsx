import { Provider } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';
import { RootState, getStoreWithState } from '@redux/store';

export * from '@testing-library/react';
export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
): any {
  const store = getStoreWithState(state);
  const utils = render(<Provider store={store}>{element}</Provider>);
  return { store, ...utils };
}
