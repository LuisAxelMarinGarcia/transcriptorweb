import React from 'react';
import Header from '../../organisms/HeaderEnVivoDocente';
import Footer from '../../organisms/Footer';

import styles from '../../../assets/style/Estudiante/StudentViewTemplate.module.css';

const StudentTemplate = ({ children }) => {
  return (
    <>
      <div className={styles.flex}>
        <div className={styles.HeaderContainer}>
            <Header />
        </div>
        
        <main className={styles.Main}>
          {children} 
        </main>
        <Footer />
      </div>
    
    </>
  );
};

export default StudentTemplate;
