import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Viewer from './Viewer';
import MainView from './components/MainView';

//Maestro
import DocentePage from '../src/components/pages/Docente/DocentePage'; 
//Alumno
import StudentPage from '../src/components/pages/Estudiante/StudentPage';


import './components/MainView.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/viewer" element={<Viewer />} />
      <Route path="/MainView" element={<MainView />} />

      <Route path="/docente" element={<DocentePage />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  </BrowserRouter>
);
