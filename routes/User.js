const sha512 = require("js-sha512");
const Joi = require("joi");
const Boom = require("boom");
const response = require("../tools/response");

module.exports = (models) => {

  const login = async (request, h) => {
    const user = await models.user.findOne({
      where: {
        email: request.payload.email
      }
    });

    if (user === null) {
      throw Boom.notFound(`User with email '${request.payload.email}' does not exist`, null);
    }

    if (sha512(request.payload.password) === user.dataValues.password) {
      return response.success_response(h, { token: user.dataValues.api_token }, "login success", 200);
    }
    throw Boom.forbidden("bad password", "custom");
  };

  const registration = async (request, h) => {
    const user = await models.user.findOne({
      where: {
        email: request.payload.email
      }
    });

    if (user !== null) {
      throw Boom.conflict(`User with email '${request.payload.email}' already exist`);
    }

    await models.user.create({
      email: request.payload.email,
      password: sha512(request.payload.password),
      api_token: sha512(`${request.payload.email}${request.payload.password}${Date.now()}`)
    });

    return response.success_response(h, null, "User registered successfully", 201);
  };

  const readuser = async (request, h) => (
    response.success_response(h, request.auth.credentials.user, null, 200)
  );

  return [
    {
      method: "GET",
      path: "/user",
      config: {
        auth: "default",
        handler: readuser
      }
    },
    {
      method: "POST",
      path: "/user/login",
      handler: login,
      options: {
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
          }
        }
      }
    },
    {
      method: "POST",
      path: "/user/register",
      handler: registration,
      options: {
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(32).required()
          }
        }
      }
    }
  ];
};