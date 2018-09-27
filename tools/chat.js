const models = require('../models');

const usersChanelConnection = [];

const init = (io) => {
  io.on('connection', (socket) => {
    global.console.log('Client connected');
    socket.on('chanelSubscribe', (data) => {
      models.user.findOne({
        where: {
          api_token: data.token,
        },
      }).then((user) => {
        if (user === null) {
          socket.emit('cannotConnectToChanel', 'bad token');
          return;
        }
        let userFound = false;
        for (let i = 0; i < usersChanelConnection.length; i += 1) {
          if (usersChanelConnection[i].socket === socket) {
            userFound = true;
            usersChanelConnection[i].chanel = data.chanelId;
            break;
          }
        }
        if (!userFound) {
          usersChanelConnection.push({
            socket,
            chanel: data.chanelId,
            username: user.dataValues.username,
          });
          socket.emit('connectedToChanel', 'success');
        }
        global.console.log('User suscripted to chanel');
      });
    });

    socket.on('sendMessage', (message) => {
      let userChanel = null;
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          userChanel = usersChanelConnection[i].chanel;
          break;
        }
      }

      if (userChanel === null) {
        return;
      }

      let user = null;
      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].socket === socket) {
          user = usersChanelConnection[i];
          break;
        }
      }

      for (let i = 0; i < usersChanelConnection.length; i += 1) {
        if (usersChanelConnection[i].chanel === userChanel
          && usersChanelConnection[i].socket !== socket) {
          usersChanelConnection[i].socket.emit('newMessage', {
            message,
            username: user.username,
          });
        }
      }
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
