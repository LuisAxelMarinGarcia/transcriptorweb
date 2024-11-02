import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



//Maestro
import DocentePage from '../src/components/pages/Docente/DocentePage'; 
import HomeDocente from '../src/components/pages/Docente/HomePage';
import DocenteClasesArchivadas from '../src/components/pages/Docente/ClasesArchivadasPage';
import HomeMateria from '../src/components/pages/Docente/HomeClasePage';



//Alumno
import StudentPage from '../src/components/pages/Estudiante/StudentPage';
import HomeEstudiante from '../src/components/pages/Estudiante/HomePage';
import EstudianteClasesArchivadas from '../src/components/pages/Estudiante/EClasesArchivadas';
import EstudianteUnirmeUnaClase from '../src/components/pages/Estudiante/UnirmeClase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path="/docente" element={<DocentePage />} />
      <Route path="/home-docente" element={<HomeDocente />} />
      <Route path="/docente-clases-archivadas" element={<DocenteClasesArchivadas />} />
      <Route path="/docente-home-materia" element={<HomeMateria />} />

      <Route path="/student" element={<StudentPage />} />
      <Route path="/home-estudiante" element={<HomeEstudiante />} />
      <Route path="/estudiante-clases-archivadas" element={<EstudianteClasesArchivadas/>} />
      <Route path="/estudiante-unirme-a-una-clase" element={<EstudianteUnirmeUnaClase/>} />
    </Routes>
  </BrowserRouter>
);
