const sha512 = require('js-sha512');
const Joi = require('joi');
const Boom = require('boom');
const response = require('../tools/response');

module.exports = (models) => {
  /**
   * @api {post} /api/v1/user/login Login with email / password
   * @apiName UserLogin
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiParam {email} email The user email
   * @apiParam {password} password The user password
   *
   */
  const login = async (request, h) => {
    const user = await models.user.findOne({
      where: {
        email: request.payload.email,
      },
    });

    if (user === null) {
      throw Boom.notFound(`User with email '${request.payload.email}' does not exist`, null);
    }

    if (sha512(request.payload.password) === user.dataValues.password) {
      return response.success_response(h, { token: user.dataValues.api_token }, 'login success', 200);
    }
    throw Boom.forbidden('bad password', 'custom');
  };

  /**
   * @api {post} /api/v1/user/register Register a user
   * @apiName UserRegister
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiParam {email} email The user email
   * @apiParam {password} password The user password
   *
   */
  const registration = async (request, h) => {
    const user = await models.user.findOne({
      where: {
        email: request.payload.email,
      },
    });

    if (user !== null) {
      throw Boom.conflict(`User with email '${request.payload.email}' already exist`);
    }

    await models.user.create({
      username: request.payload.username,
      email: request.payload.email,
      password: sha512(request.payload.password),
      api_token: sha512(`${request.payload.email}${request.payload.password}${Date.now()}`),
    });

    return response.success_response(h, null, 'User registered successfully', 201);
  };

  /**
   * @api {get} /api/v1/user Get current user informations
   * @apiName ReadUser
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const readuser = async (request, h) => (
    response.success_response(h, request.auth.credentials.user, null, 200)
  );


  /**
   * @api {delete} /api/v1/user Delete the user account and every ressources associated with it
   * @apiName DeleteUser
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const deleteUser = async (request, h) => {
    const pendingOpinionAndCommentDeletions = [];

    const photoIds = await models.photo.findAll({
      where: {
        user_id: request.auth.credentials.user.id,
      },
      attributes: ['id'],
    });

    for (let i = 0; i < photoIds.length; i += 1) {
      pendingOpinionAndCommentDeletions.push(models.opinion.destroy({
        where: {
          photo_id: photoIds[i].dataValues.id,
        },
      }));
      pendingOpinionAndCommentDeletions.push(models.comment.destroy({
        where: {
          photo_id: photoIds[i].dataValues.id,
        },
      }));
    }

    await Promise.all(pendingOpinionAndCommentDeletions);

    await models.photo.destroy({
      where: {
        user_id: request.auth.credentials.user.id,
      },
    });

    await models.user.destroy({
      where: {
        id: request.auth.credentials.user.id,
      },
    });

    return response.success_response(h, null, 'Your account and all associated ressources has been deleted', 202);
  };

  /**
   * @api {get} /api/v1/user/photos Get photos of current user
   * @apiName GetuserPhotos
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const getPhotos = async (request, h) => {
    const result = [];

    const photos = await models.photo.findAll({
      where: {
        user_id: request.auth.credentials.user.id,
      },
      attributes: Object.keys(models.photo.attributes).concat([
        [models.sequelize.literal("(SELECT COUNT(*) FROM opinions WHERE opinions.photo_id = photo.id AND opinions.opinion = 'LIKE')"), 'total_likes'],
        [models.sequelize.literal("(SELECT COUNT(*) FROM opinions WHERE opinions.photo_id = photo.id AND opinions.opinion = 'DISLIKE')"), 'total_dislikes'],
      ]),
    });

    for (let idx = 0; idx < photos.length; idx += 1) {
      delete photos[idx].dataValues.file_path;
      photos[idx].dataValues.url = `/photo/${photos[idx].dataValues.id}`;

      result.push(photos[idx].dataValues);
    }

    return response.success_response(h, result, null, 200);
  };

  return [
    {
      method: 'GET',
      path: '/user',
      config: {
        auth: 'default',
        handler: readuser,
      },
    },
    {
      method: 'POST',
      path: '/user/login',
      handler: login,
      options: {
        validate: {
          payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/user/register',
      handler: registration,
      options: {
        validate: {
          payload: {
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(32).required(),
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/user',
      config: {
        auth: 'default',
        handler: deleteUser,
      },
    },
    {
      method: 'GET',
      path: '/user/photos',
      handler: getPhotos,
      options: {
        auth: 'default',
      },
    },
  ];
};
