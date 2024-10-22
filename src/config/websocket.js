const WebSocket = require('ws');

let sockets = [];

// Accept the HTTP server as a parameter
function initWebSocketServer(httpServer) {
  const wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', function (socket) {
    sockets.push(socket);

    socket.on('message', function (msg) {
      console.log('Received message:', msg);
    });

    socket.on('close', function () {
      sockets = sockets.filter(s => s !== socket);
    });
  });

  console.log('WebSocket server running on ws://localhost:3001');
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
