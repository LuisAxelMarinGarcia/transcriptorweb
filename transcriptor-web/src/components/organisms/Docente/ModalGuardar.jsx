// src/components/organisms/Docente/ModalGuardarTranscripcion.jsx

import React, { useState } from 'react';
import styles from '../../../assets/style/Docente/ModalGuardarTranscripcion.module.css';
import AvisoIcon from '../../../assets/imgs/atencion.png';
import { jsPDF } from 'jspdf'; // Importamos jsPDF

const ModalGuardarTranscripcion = ({ show, onClose, transcript, classId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el título no esté vacío
    if (!title.trim()) {
      alert('Por favor, ingresa un título para la transcripción.');
      return;
    }

    // Generar la fecha actual en el formato dd-mm-yy
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2); // últimos 2 dígitos del año
    const dateStr = `${day}-${month}-${year}`;

    // Generar el PDF con jsPDF
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(16);
    doc.text(`Transcripción de la clase: ${title}`, 10, 20);

    if (description.trim()) {
      doc.setFontSize(12);
      doc.text(`Descripción: ${description}`, 10, 30);
    }

    doc.setFontSize(12);
    doc.text('Transcripción:', 10, 40);

    // Ajustar el texto a la anchura del PDF
    const textLines = doc.splitTextToSize(transcript, 180);
    doc.text(textLines, 10, 50);

    // Convertir el PDF a Blob
    const pdfBlob = doc.output('blob');

    // Crear FormData con todos los campos que el backend requiere
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', dateStr);
    formData.append('url', '');          // URL vacío según lo indicado
    formData.append('type', 'MATERIAL'); // Tipo MATERIAL, según el ejemplo
    formData.append('classId', classId); // Cambiado a 'classId'
    formData.append('file', pdfBlob, `Transcripcion_${title}.pdf`);

    // Consolas de depuración para verificar los datos enviados
    console.log('--- Datos a Enviar al Backend ---');
    for (let pair of formData.entries()) {
      if (pair[0] === 'file') {
        console.log(`${pair[0]}:`, pair[1].name);
      } else {
        console.log(`${pair[0]}:`, pair[1]);
      }
    }
    console.log('----------------------------------');

    try {
      // Obtener el token de localStorage
      const token = localStorage.getItem('token');

      // Agregar el encabezado de autorización si el token existe
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/transcription', { // Usar la ruta relativa para aprovechar el proxy de Vite
        method: 'POST',
        headers, // Agregar encabezados condicionalmente
        body: formData,
      });

      console.log('--- Response ---', response);

      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
        console.log('Respuesta del Servidor:', responseData);
      } else {
        const text = await response.text();
        console.log('Respuesta del Servidor (texto):', text);
        throw new Error('Respuesta del servidor no es JSON');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Error al guardar la transcripción');
      }

      console.log('Transcripción guardada:', responseData);
      alert('Transcripción guardada exitosamente.');
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error:', error);
      alert(`Hubo un error al guardar la transcripción: ${error.message}`);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modalFondo}>
      <div className={styles.modalContent}>
        <h1 className={styles.titleBaja}>
          <i className="fas fa-book"></i> ¿Estás seguro de que deseas finalizar y guardar la transcripción?
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.infoActions}>
            <h2 className={styles.textDescription}>Descripción</h2>
            <p className={styles.textInfo}>Estás a punto de finalizar y guardar esta transcripción del en vivo.</p>

            <div className={styles.CamposGuardar}>
              <input
                type="text"
                name="transcriptTitle"
                placeholder="Título de la transcripción"
                className={styles.inputText}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                name="transcriptDescription"
                placeholder="Descripción (Opcional)"
                className={styles.inputText}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <h2 className={styles.textAviso}>
              Aviso
              <img src={AvisoIcon} alt="Icono Aviso" className={styles.iconAviso} />
            </h2>
            <p className={styles.textInfo}>Una vez guardada, podrás acceder a ella más tarde.</p>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.createButton}>
              Guardar
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGuardarTranscripcion;
