const Hapi = require('hapi');
const routes = require('./routes');
const authMiddleware = require('./middleware/apiAuth.js');

const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        throw err;
      },
    },
  },
  debug: { request: ['error'] },
});

server.realm.modifiers.route.prefix = '/api/v1';
server.auth.scheme('custom', authMiddleware);
server.auth.strategy('default', 'custom');
server.route(routes);

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
