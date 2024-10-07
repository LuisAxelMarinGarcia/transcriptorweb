import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Viewer from './Viewer';
import MainView from './components/MainView';
import './components/MainView.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/viewer" element={<Viewer />} />
      <Route path="/MainView" element={<MainView />} />
    </Routes>
  </BrowserRouter>
);
