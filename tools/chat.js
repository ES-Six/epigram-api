const io = require('socket.io')(8001);

const usersChanelConnection = [];

const init = () => {
  io.on('connection', (socket) => {
    global.console.log('Client connected');
    socket.on('onChanelSubscribe', (chanelId) => {
      let userFound = false;
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          userFound = true;
          usersChanelConnection[i].chanel = chanelId;
          break;
        }
      }
      if (!userFound) {
        usersChanelConnection.push({
          socket,
          chanel: chanelId,
        });
      }
      global.console.log('User suscripted to chanel');
    });
    socket.on('onUserSentMessage', (message) => {
      let userChanel = null;
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          userChanel = usersChanelConnection[i].chanel;
          break;
        }
      }

      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].chanel === userChanel) {
          socket.emit({
            message,
          });
        }
      }
      global.console.log('New message');
    });
    socket.on('disconnect', () => {
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          global.console.log('Client removed from list');
          delete usersChanelConnection[i];
        }
      }
      global.console.log('Client disconnected');
    });
  });
  global.console.log('Websocket server started on port 8001');
};

module.exports = {
  init,
};
