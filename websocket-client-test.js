const WebSocket = require('ws');

const socket = new WebSocket('wss://preprod.lepaindujour.io'); // Remplacez 8080 par votre port

socket.on('open', () => {
  console.log('Connecté au serveur WebSocket');
  socket.send('Hello Server!');
});

socket.on('message', (message) => {
  console.log(`Message du serveur: ${message}`);
});
