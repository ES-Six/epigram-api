const usersChanelConnection = [];
let messageId = 1;

const init = (io) => {
  io.on('connection', (socket) => {
    global.console.log('Client connected');
    socket.on('chanelSubscribe', (chanelId) => {
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

    socket.on('sendMessage', (message) => {
      let userChanel = null;
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          userChanel = usersChanelConnection[i].chanel;
          break;
        }
      }

      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].chanel === userChanel) {
          socket.emit('newMessage', {
            message,
            id: messageId,
          });
        }
      }
      messageId += 1;
    });

    socket.on('disconnect', () => {
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          global.console.log('Client removed from list');
          usersChanelConnection.splice(i, 1);
        }
      }
      global.console.log('Client disconnected');
    });
  });
  global.console.log('Websocket server started');
};

module.exports = {
  init,
};
