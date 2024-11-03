import React from 'react';
import Card from '../Estudiante/CardTypeContent'; // Importa el componente Card
import styles from '../../../assets/style/Estudiante/ClassListTypeContentE.module.css'; 
import teacherImage from "../../../assets/imgs/Avatar Teacher.png"; // Importa la imagen


// Autor constante
const defaultAuthor = {
  name: 'Horacio Irán Solís Cisneros',
  image: teacherImage,
};

function ClassList({ typeFilter }) {
  const classData = [
    {
      title: 'Transcripción de clase 1',
      description: 'Transcripción detallada de la clase sobre tecnología.',
      date: '02/11/2024',
      type: 'transcription',
      link: '',
      fileType: '',
    },
    {
      title: 'Transcripción de clase 2',
      description: 'Transcripción detallada de la clase sobre tecnología.',
      date: '02/11/2024',
      type: 'transcription',
      link: '',
      fileType: '',
    },
    {
      title: 'Transcripción de clase 2',
      description: 'Transcripción de la clase de historia y análisis crítico.',
      date: '30/10/2024',
      type: 'transcription',
      link: '',
      fileType: '',
    },
    {
      title: 'Material de tipo enlace 1',
      description: 'Enlace a un recurso en línea sobre programación.',
      date: '01/11/2024',
      type: 'link',
      link: 'https://www.example.com/programming-resource',
      fileType: '',
    },
    {
      title: 'Material de tipo enlace 2',
      description: 'Enlace a un video educativo sobre ciencia de datos.',
      date: '21/10/2024',
      type: 'link',
      link: 'https://www.example.com/data-science-video',
      fileType: '',
    },
    {
      title: 'Material de tipo archivo 1',
      description: 'PDF con la guía de Python.',
      date: '25/10/2024',
      type: 'file',
      link: '',
      fileType: 'pdf',
    },
    {
      title: 'Material de tipo archivo 2',
      description: 'Presentación de diapositivas sobre IA.',
      date: '20/10/2024',
      type: 'file',
      link: '',
      fileType: 'pdf',
    },
  ];

  const filteredData = classData
  .filter(item => typeFilter === 'all' || item.type === typeFilter)
  .sort((a, b) => {
    // Convierte las fechas de formato DD/MM/YYYY a objetos Date
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB - dateA; // Para ordenar de más reciente a más antiguo
  });

  return (
    <div className={styles.classList}>
      {filteredData.map((cardItem, index) => (
        <Card
          key={index}
          title={cardItem.title}
          description={cardItem.description}
          date={cardItem.date}
          type={cardItem.type}
          link={cardItem.link}
          fileType={cardItem.fileType}
          author={defaultAuthor}
        />
      ))}
    </div>
  );
}

export default ClassList;