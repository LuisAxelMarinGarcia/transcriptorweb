// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crear una instancia de Express
const app = express();

// Crear un servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*', // Permitir todas las conexiones CORS (configura esto adecuadamente en producción)
  },
});

// Manejar conexiones de clientes
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar unirse a una clase
  socket.on('joinClass', (classId) => {
    console.log(`Cliente unido a la clase ${classId}`);
    socket.join(`class_${classId}`); // Unir al cliente a la sala de la clase
  });

  // Escuchar eventos de 'transcript' y retransmitir dentro de la sala
  socket.on('transcript', (data) => {
    const { classId, message } = data; // Asegúrate de que el cliente envíe el classId
    console.log(`Transcripción recibida para la clase ${classId}: ${message}`);
    io.to(`class_${classId}`).emit('transcript', message); // Emitir solo a la sala de la clase
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
