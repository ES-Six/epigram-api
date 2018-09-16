const models = require('../models');

const User = require(`./User`)(models);
const Category = require(`./Category`)(models);
const Photo = require(`./Photo`)(models);
const Comment = require(`./Comment`)(models);

let routes = [];

routes = routes.concat(User);
routes = routes.concat(Category);
routes = routes.concat(Photo);
routes = routes.concat(Comment);

module.exports = routes;