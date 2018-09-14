const Boom = require('boom');
const models = require('../models');

const scheme = () => ({
    api: {settings: {}},
    authenticate: async (request, h) => {
        const token = request.headers['x-api-key'];

        if (!token) {
            throw Boom.forbidden("You must provide X-API-KEY");
        }

        const user = await models.user.findOne({
            where: {
                api_token: token
            }
        });

        if (user === null) {
            throw Boom.forbidden("Invalid token provided");
        }

        delete user.dataValues.password;
        delete user.dataValues.api_token;

        return h.authenticated({credentials: {user: user.dataValues}});
    }
});

module.exports = scheme;