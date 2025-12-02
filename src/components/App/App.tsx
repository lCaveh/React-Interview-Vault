import React, { ReactElement } from 'react';
import { Main } from '@components/Main';
import './App.css';

const App = (): ReactElement => {
  return (
    <div className="app-container">
      <Main />
    </div>
  );
};

export { App };
