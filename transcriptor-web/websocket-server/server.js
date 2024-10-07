// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Crear una instancia de Express
const app = express();

// Crear un servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar eventos de 'transcript'
  socket.on('transcript', (data) => {
    // Emitir el texto transcrito a todos los clientes excepto al que lo envió
    socket.broadcast.emit('transcript', data);
  });

  // Cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
