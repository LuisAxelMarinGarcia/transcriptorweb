// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de componentes y páginas

// Docente (Maestro)
import DocentePage from './components/pages/Docente/DocentePage'; 
import HomeDocente from './components/pages/Docente/HomePage';
import DocenteClasesArchivadas from './components/pages/Docente/ClasesArchivadasPage';
import HomeMateria from './components/pages/Docente/HomeClasePage';
import DocenteMaterialDidactico from './components/pages/Docente/MaterialDidacticoPage';
import CrearMaterial from './components/pages/Docente/CrearMaterialPage';
import TranscripcionesDocente from './components/pages/Docente/TranscripcionesClasePage';
import DocentePersonasMateria from './components/pages/Docente/PersonasMateriaPage';
import NotFoundRedirect from './components/NotFoundRedirect';
import VerTranscripcionDocente from './components/pages/Docente/VerTranscripcionPage';

// Estudiante
import StudentPage from './components/pages/Estudiante/StudentPage';
import HomeEstudiante from './components/pages/Estudiante/HomePage';
import EstudianteClasesArchivadas from './components/pages/Estudiante/EClasesArchivadas';
import EstudianteUnirmeUnaClase from './components/pages/Estudiante/UnirmeClase';
import EstudianteHomeMateria from './components/pages/Estudiante/HomeClaseInscrita';
import EMaterialDidacticoClase from './components/pages/Estudiante/EMaterialDidacticoPage';
import ETranscripcionesClase from './components/pages/Estudiante/ETranscripcionesClasePage';
import EPersonasClase from './components/pages/Estudiante/EPersonasClasePage';
import EstudianteVerTranscripcion from './components/pages/Estudiante/EVerTranscripcionPage';

// Login
import LoginAlumno from './components/pages/Estudiante/LoginPage';
import LoginDocente from './components/pages/Docente/LoginPage';

// Ruta Protegida
import PrivateRoute from './components/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      {/* Rutas Públicas */}
      <Route path="/login-estudiante" element={<LoginAlumno />} />
      <Route path="/login-docente" element={<LoginDocente />} />

      {/* Rutas Protegidas para Docentes */}
      <Route 
        path="/docente/:classId" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <DocentePage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/home-docente" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <HomeDocente />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-clases-archivadas" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <DocenteClasesArchivadas />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-home-materia" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <HomeMateria />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-material-didactico/:classId" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <DocenteMaterialDidactico />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-crear-material" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <CrearMaterial />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-personas-materia/:classId" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <DocentePersonasMateria />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/docente-ver-transcripcion" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <VerTranscripcionDocente />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/transcripciones-docente/:classId" 
        element={
          <PrivateRoute allowedRoles={['MAESTRO']}>
            <TranscripcionesDocente />
          </PrivateRoute>
        } 
      />
      

        {/* Rutas Protegidas para Estudiantes */}
        <Route 
          path="/student/:classId" 
          element={
            <PrivateRoute allowedRoles={['ESTUDIANTE']}>
              <StudentPage />
            </PrivateRoute>
          } 
        />
      <Route 
        path="/home-estudiante" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <HomeEstudiante />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-clases-archivadas" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <EstudianteClasesArchivadas />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-unirme-a-una-clase" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <EstudianteUnirmeUnaClase />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-ver-transcripcion" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <EstudianteVerTranscripcion />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-home-clase" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <HomeEstudiante />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-material-didactico-clase" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <EMaterialDidacticoClase />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-transcripciones-clase/:classId" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <ETranscripcionesClase />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/estudiante-personas-clase/:classId" 
        element={
          <PrivateRoute allowedRoles={['ESTUDIANTE']}>
            <EPersonasClase />
          </PrivateRoute>
        } 
      />

      {/* Rutas No Encontradas */}
      <Route path="*" element={<NotFoundRedirect />} />
      
    </Routes>
  </BrowserRouter>
);
