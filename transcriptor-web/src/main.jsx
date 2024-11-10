import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



//Maestro
import DocentePage from '../src/components/pages/Docente/DocentePage'; 
import HomeDocente from '../src/components/pages/Docente/HomePage';
import DocenteClasesArchivadas from '../src/components/pages/Docente/ClasesArchivadasPage';
import HomeMateria from '../src/components/pages/Docente/HomeClasePage';
import DocenteMaterialDidactico from '../src/components/pages/Docente/MaterialDidacticoPage';
import CrearMaterial from '../src/components/pages/Docente/CrearMaterialPage';



//Alumno
import StudentPage from '../src/components/pages/Estudiante/StudentPage';
import HomeEstudiante from '../src/components/pages/Estudiante/HomePage';
import EstudianteClasesArchivadas from '../src/components/pages/Estudiante/EClasesArchivadas';
import EstudianteUnirmeUnaClase from '../src/components/pages/Estudiante/UnirmeClase';
import EstudianteHomeMateria from '../src/components/pages/Estudiante/HomeClaseInscrita';
import EMaterialDidacticoClase from '../src/components/pages/Estudiante/EMaterialDidacticoPage';
import ETranscripcionesClase from '../src/components/pages/Estudiante/ETranscripcionesClasePage';
import EPersonasClase from '../src/components/pages/Estudiante/EPersonasClasePage';
import TranscripcionesDocente from '../src/components/pages/Docente/TranscripcionesClasePage';
import DocentePersonasMateria from '../src/components/pages/Docente/PersonasMateriaPage';
import VerTranscripcionDocente from '../src/components/pages/Docente/VerTranscripcionPage';

import EstudianteVerTranscripcion from '../src/components/pages/Estudiante/EVerTranscripcionPage';

import LoginAlumno from '../src/components/pages/Estudiante/LoginPage';

import LoginDocente from '../src/components/pages/Docente/LoginPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path="/docente" element={<DocentePage />} />
      <Route path="/home-docente" element={<HomeDocente />} />
      <Route path="/docente-clases-archivadas" element={<DocenteClasesArchivadas />} />
      <Route path="/docente-home-materia" element={<HomeMateria />} />
      <Route path="/docente-material-didactico" element={<DocenteMaterialDidactico />} />
      <Route path="/docente-personas-materia" element={<DocentePersonasMateria />} />
      <Route path="/docente-ver-transcripcion" element={<VerTranscripcionDocente />} />
      <Route path="/docente-crear-material" element={<CrearMaterial />} />

      <Route path="/student" element={<StudentPage />} />
      <Route path="/home-estudiante" element={<HomeEstudiante />} />
      <Route path="/estudiante-clases-archivadas" element={<EstudianteClasesArchivadas/>} />
      <Route path="/estudiante-unirme-a-una-clase" element={<EstudianteUnirmeUnaClase/>} />
      <Route path="/estudiante-ver-transcripcion" element={<EstudianteVerTranscripcion/>} />


      <Route path="/estudiante-home-clase" element={<EstudianteHomeMateria/>} />
      <Route path="/estudiante-MaterialDidactico-clase" element={<EMaterialDidacticoClase/>} />
      <Route path="/estudiante-Transcripciones-clase" element={<ETranscripcionesClase/>} />
      <Route path="/estudiante-Personas-clase" element={<EPersonasClase/>} />
      <Route path="/transcripciones-docente" element={<TranscripcionesDocente/>} />


      <Route path="/login-estudiante" element={<LoginAlumno/>} />
      <Route path="/login-docente" element={<LoginDocente/>} />

    </Routes>
  </BrowserRouter>
);
