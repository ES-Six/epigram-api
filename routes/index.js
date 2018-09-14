const models = require('../models');

const User = require(`./User`)(models);

let routes = [];

routes = routes.concat(User);

module.exports = routes;