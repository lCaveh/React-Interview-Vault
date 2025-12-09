import React, { ReactElement } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '@components/Main';
import { Project } from '@components/Project';
import './App.css';

const App = (): ReactElement => {
  return (
    <HashRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<Main />} />
          <Route path="/solutions/:solutionId" element={<Project />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export { App };
