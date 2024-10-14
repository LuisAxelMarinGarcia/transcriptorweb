import React from 'react';
import Header from '../organisms/HeaderEnVivoDocente';
import Footer from '../organisms/Footer';

const StudentTemplate = ({ children }) => {
  return (
    <div>
      <Header />
      <main className>
        {children} 
      </main>
      <Footer />
    </div>
  );
};

export default StudentTemplate;
