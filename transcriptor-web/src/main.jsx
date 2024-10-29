import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



//Maestro
import DocentePage from '../src/components/pages/Docente/DocentePage'; 
import HomeDocente from '../src/components/pages/Docente/HomePage';
import DocenteClasesArchivadas from '../src/components/pages/Docente/ClasesArchivadasPage';

//Alumno
import StudentPage from '../src/components/pages/Estudiante/StudentPage';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path="/docente" element={<DocentePage />} />
      <Route path="/home-docente" element={<HomeDocente />} />
      <Route path="/docente-clases-archivadas" element={<DocenteClasesArchivadas />} />

      <Route path="/student" element={<StudentPage />} />
    </Routes>
  </BrowserRouter>
);
