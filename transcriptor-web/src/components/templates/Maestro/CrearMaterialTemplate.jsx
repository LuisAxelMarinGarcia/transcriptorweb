import React, { useState } from 'react';
import Header from '../../organisms/Docente/TeacherHeaderGenerico';
import SidebarGenerico from '../../organisms/Docente/SidebarGenerico';
import styles from '../../../assets/style/Docente/CrearMaterialClase.module.css';
import Footer from "../../organisms/Footer";

import iconCancelar from '../../../assets/imgs/cancelar.png';
import iconMaterial from '../../../assets/imgs/material.png';
import iconEnlace from '../../../assets/imgs/enlace.png';
import iconSubir from '../../../assets/imgs/subir.png';
import iconSubirFile from '../../../assets/imgs/subirFile.png';

const CrearMaterial = ({ studentCount, codeClass, classId, className, teacherName, classGroup }) => {
  const [title, setTitle] = useState(''); // Estado para el título personalizado
  const [inputType, setInputType] = useState(null);
  const [file, setFile] = useState(null);  // Para almacenar el archivo
  const [link, setLink] = useState('');   // Para almacenar el enlace
  const [description, setDescription] = useState('');  // Descripción
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [fileUploaded, setFileUploaded] = useState(false);  // Para saber si el archivo se subió

  const handleShowInput = (type) => {
    setInputType(type);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];  // Capturar el archivo seleccionado
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileUploaded(true);  // Cambiar el estado cuando un archivo es seleccionado
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);  // Capturar el enlace ingresado
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);  // Capturar la descripción
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Capturar el título ingresado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Por favor, ingresa un título para el material.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      //console.log('No se encontró token. Asegúrate de que el usuario esté autenticado.');
      alert('No autorizado. Por favor, inicie sesión.');
      return;
    }

    // Crear FormData y verificar que tiene los datos
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', new Date().toLocaleString());
    formData.append('classId', classId);
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('type', 'MATERIAL');
    formData.append('status', 'DISPONIBLE');

    // Verifica si inputType está correctamente asignado
    if (inputType === 'enlace') {
      //console.log('Enlace:', link);  // Verifica que el enlace esté presente
      formData.append('url', link);
    } else if (inputType === 'archivo' && file) {
      //console.log('Archivo:', file);
      formData.append('url', '');
      formData.append('file', file);  // Agrega el archivo al FormData
    }

    /*console.log('Formulario listo para enviar con los siguientes datos:');
    console.log('Título:', title);
    console.log('Descripción:', description);
    console.log('Clase ID:', classId);
    console.log('Usuario ID:', localStorage.getItem('userId'));
    console.log('file', file);*/

    setLoading(true);  // Activar la carga

    try {
      // Utilizar fetch con la URL correcta y encabezados
      const response = await fetch('/transcription', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          //'Content-Type': 'multipart/form-data',  // Especificar el tipo de contenido para enviar archivos
        },
        body: formData,
      });

      //console.log('Respuesta de la API:', response);  // Verificar la respuesta

      /*if (!response.ok) {
        console.error('Error en la respuesta de la API:', response.statusText);
        throw new Error('Error en la solicitud');
      }*/

      const data = await response.json();
      setLoading(false);  // Desactivar la carga
      //console.log('imprimiendo data', data);

      if (data.success) {
        alert('Material creado correctamente');
        setFileUploaded(false);  // Resetear el estado de archivo subido
        setFile(null);  // Limpiar el archivo
        setDescription('');  // Limpiar descripción
        setLink('');  // Limpiar enlace
        setTitle('');  // Limpiar título
      } else {
        alert('Error al crear el material');
      }
    } catch (err) {
      setLoading(false);  // Desactivar la carga
      alert('Error de conexión');
      console.error('Error en la solicitud:', err);
    }
  };

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.SpaceSiderbar}>
          <SidebarGenerico />
        </div>

        <div className={styles.container}>
          <div className={styles.HeaderContainer}>
            <Header view="CrearMaterial" />
          </div>

          <div className={styles.OtherContainer}>
            <div className={styles.SectionTitle}>
              <div className={styles.sectionOne}>
                <img src={iconCancelar} alt="Primer icono" className={styles.iconImage} />
                <img src={iconMaterial} alt="Segundo icono" className={styles.clickableIcon} />
                <p className={styles.titleCrearMaterial}>Crear Material Didáctico</p>
              </div>

              <div className={styles.sectionTwo}>
                <button className={styles.BotonCrear} onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Cargando...' : 'Publicar'}
                </button>
              </div>
            </div>
            <div className={styles.ContainerFormCrear}>

           
            <div className={styles.ContenidoCrear}>
              <div className={styles.infoMaterial}>
                <p><strong>Asignar a:</strong> {className}</p>  {/* Nombre de la clase */}
                <p><strong>Por:</strong> {teacherName}</p> {/* Nombre del profesor */}
              </div>

              <div className={styles.InputAndIcon}>
                <input
                  type="text"
                  placeholder="Título"
                  id="title"
                  className={styles.titleInput}
                  value={title}
                  onChange={handleTitleChange} // Permitir edición del título
                />
                <div className={styles.IconsContainer}>


                
                  <div className={styles.SectionIcon} onClick={() => handleShowInput("archivo")}>
                    <span>Subir</span>
                    <img src={iconSubir} alt="Icono Subir" className={styles.iconActionImage} />
                  </div>

                  <div className={styles.SectionIcon} onClick={() => handleShowInput("enlace")}>
                    <span>Enlace</span>
                    <img src={iconEnlace} alt="Icono Enlace" className={styles.iconActionImage} />
                  </div>
                </div>
              </div>

              <div className={styles.inputSection}>
                <textarea
                  placeholder="Descripción"
                  id="description"
                  className={styles.DescriptionTextArea}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>

              {inputType === "enlace" && (
                <div className={styles.inputSectionLink}>
                  <input
                    type="text"
                    placeholder="Inserte enlace aquí"
                    className={styles.linkInput}
                    value={link}
                    onChange={handleLinkChange}
                  />
                </div>
              )}

              {inputType === "archivo" && (
                <div className={styles.uploadArea} onClick={() => document.getElementById('fileUpload').click()}>
                  <img src={iconSubirFile} alt="Subir archivo" className={styles.uploadIcon} />
                  <span>Click aquí para añadir archivos</span>
                  <input
                    type="file"
                    id="fileUpload"
                    className={styles.fileInput}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {fileUploaded && file && (
                <div className={styles.fileInfo}>
                  <p>Archivo seleccionado: {file.name}</p>
                </div>
              )}
            </div>
            </div>
          </div>
          <Footer />
        </div>
        
      </div>
      
    </>
  );
};

export default CrearMaterial;
