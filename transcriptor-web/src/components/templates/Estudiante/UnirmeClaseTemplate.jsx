import React, { useState } from 'react';

import Header from '../../organisms/Estudiante/HeaderGenericoEstudiante '
import SidebarGenerico from '../../organisms/Estudiante/SidebarGenericoEstudiante'
import styles from '../../../assets/style/Estudiante/TemplateUnirmeClase.module.css'
import UnirmeClase from "../../organisms/Estudiante/UnirmeClase";
import Footer from "../../organisms/Footer";

const HomeTemplate = () => {
  return (
    <>
      <div className={styles.flex}>
        <div className={styles.SpaceSiderbar}>
          <SidebarGenerico />
        </div>
        
        <div className={styles.container}>
          <div className={styles.HeaderContainer}>
            <Header view="Unirme-a-una-clase" />
          </div>
          
          <div className={styles.OtherContainer}>
            <UnirmeClase />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomeTemplate;
