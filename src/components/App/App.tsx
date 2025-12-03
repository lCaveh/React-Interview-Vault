import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '@components/Main';
import { Project } from '@components/Project';
import './App.css';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<Main />} />
          <Route path="/solutions/:solutionId" element={<Project />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export { App };
