const WebSocket = require('ws');

let sockets = [];

function initWebSocketServer() {
  const server = new WebSocket.Server({ port: 5001 });

  server.on('connection', function (socket) {
    sockets.push(socket);

    socket.on('message', function (msg) {
      console.log('Received message:', msg);
    });

    socket.on('close', function () {
      sockets = sockets.filter(s => s !== socket);
    });
  });

  console.log('WebSocket server running on ws://localhost:5001');
}

function broadcastNotification(notificationData) {
  sockets.forEach(socket => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(notificationData));
    }
  });
}

module.exports = {
  initWebSocketServer,
  broadcastNotification
};
