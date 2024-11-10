import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico'
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico'
import styles from '../../../assets/style/Docente/CrearMaterialClase.module.css'
import Footer from "../../organisms/Footer";

import iconCancelar from '../../../assets/imgs/cancelar.png';
import iconMaterial from '../../../assets/imgs/material.png';
import iconEnlace from '../../../assets/imgs/enlace.png';
import iconSubir from '../../../assets/imgs/subirFile.png'



const CrearMaterial = ({ title, nameTeacher }) => {

    const [inputType, setInputType] = useState(null); 

    const handleShowInput = (type) => {
        setInputType(type);
    };

    return(
        <>
            <div className={styles.flex}>
                <div className={styles.SpaceSiderbar}>
                <SidebarGenerico />
                </div>

                <div className={styles.container}>
                    
                    <div className={styles.HeaderContainer}>
                        <Header view="CrearMaterial"  />
                    </div>

                    <div className={styles.OtherContainer}>

                        <div className={styles.SectionTitle}>
                            
                            <div className={styles.sectionOne}>
                                <img src={iconCancelar} alt="Primer icono" className={styles.iconImage} />
                                <img src={iconMaterial} alt="Segundo icono" className={styles.clickableIcon} />
                                Crear Material Didactico
                            </div>

                            <div className={styles.sectionTwo}>
                                <button className={styles.BotonCrear}>Publicar</button>
                            </div>

                        </div>
                        
                        <div className={styles.ContenidoCrear}>

                            <div className={styles.infoMaterial}>
                                <p><strong>Asignar a:</strong> Análisis de datos</p>
                                <p><strong>Por:</strong> Horacio Solis Cisneros</p>
                            </div>

                            <div className={styles.InputAndIcon}>
                                
                                    <input type="text" placeholder="Título" id="title" className={styles.titleInput}/>
                                
                                
                                
                                    <div className={styles.SectionIcon} onClick={() => handleShowInput("archivo")}>
                                        <span>Subir</span>
                                        <img src={iconSubir} alt="Icono Subir" className={styles.iconActionImage}/>
                                    </div>

                                    <div className={styles.SectionIcon} onClick={() => handleShowInput("enlace")}>
                                        <span>Enlace</span>
                                        <img src={iconEnlace} alt="Icono Enlace" className={styles.iconActionImage}/>
                                    </div>
                                
                            </div>

                            
                            <div className={styles.inputSection}>
                                <textarea placeholder="Descripción" id="description" className={styles.DescriptionTextArea}></textarea>
                            </div>

                            {/* Renderizar campo de enlace o área de carga de archivos */}
                            {inputType === "enlace" && (
                                <div className={styles.inputSectionLink}>
                                    <input type="text" placeholder="Inserte enlace aquí" className={styles.linkInput} />
                                </div>
                            )}

                            {inputType === "archivo" && (
                                <div className={styles.uploadArea}>
                                    <label className={styles.uploadLabel} htmlFor="fileUpload">
                                        <img src={iconSubir} alt="Subir archivo" className={styles.uploadIcon}/>
                                        <span>Click aquí para añadir archivos</span>
                                    </label>
                                    <input type="file" id="fileUpload" className={styles.fileInput} />
                                </div>
                            )}
                            
                        </div>
                
                        
                    </div>
                    <Footer />

                </div>
            </div>

        </>
    );
};

export default CrearMaterial;