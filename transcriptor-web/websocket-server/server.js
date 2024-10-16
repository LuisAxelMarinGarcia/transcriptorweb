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

  // Escuchar eventos de 'transcript' y retransmitir a otros clientes
  socket.on('transcript', (data) => {
    // Emitir la transcripción a todos los clientes excepto al remitente
    socket.broadcast.emit('transcript', data);
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
