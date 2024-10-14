import React from 'react';
import StudentTemplate from '../../templates/StudentTemplate';
import StudentView from '../../organisms/StudentView';

const StudentPage = () => {
  return (
    <StudentTemplate>
      <StudentView 
      
         title="7B - Minería de datos" 
  teacherName="Horacio Irán Solís Cisneros" 
  studentCount={22} 
  transcriptionText="Texto de transcripción en tiempo real aquí..."

      /> 
    </StudentTemplate>
  );
};

export default StudentPage;