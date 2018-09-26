const Hapi = require('hapi');

const server = Hapi.server({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8002,
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['cache-control', 'x-requested-with', 'x-api-key'],
    },
    validate: {
      failAction: async (request, h, err) => {
        throw err;
      },
    },
  },
  debug: { request: ['error'] },
});
const io = require('socket.io')(server.listener);
const routes = require('./routes');
const authMiddleware = require('./middleware/apiAuth');
const chat = require('./tools/chat');

server.realm.modifiers.route.prefix = '/api/v1';
server.auth.scheme('custom', authMiddleware);
server.auth.strategy('default', 'custom');
server.route(routes);
chat.init(io);

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    global.console.log(err);
    process.exit(1);
  }

  global.console.log('Server running at:', server.info.uri);
}

start();
