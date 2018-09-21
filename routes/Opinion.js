const Joi = require('joi');
const Boom = require('boom');
const response = require('../tools/response');

module.exports = (models) => {
  /**
   * @api {put} /api/v1/photo/{id}/opinion set or update a LIKE / DISLIKE to a photo
   * @apiName SetUserOpinion
   * @apiGroup Opinion
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const putOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id,
      },
    });

    if (opinion === null) {
      models.opinion.create({
        opinion: request.payload.opinion,
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id,
      });
    } else {
      await opinion.updateAttributes({
        opinion: request.payload.opinion,
      });
    }

    return response.success_response(h, null, `Photo with id ${request.params.id} have been ${request.payload.opinion}`, 200);
  };

  /**
   * @api {get} /api/v1/photo/{id}/opinion get the current user opinion for a photo
   * @apiName GetUserOpinion
   * @apiGroup Opinion
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const getOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id,
      },
    });

    let opinionValue = 'NO_OPINION';
    if (opinion !== null) {
      opinionValue = opinion.dataValues.opinion;
    }

    return response.success_response(h, { opinion: opinionValue }, null, 200);
  };

  /**
   * @api {delete} /api/v1/photo/{id}/opinion delete the current user opinion for a photo
   * @apiName DeleteUserOpinion
   * @apiGroup Opinion
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   *
   * @apiHeader (Header fields required) {X-API-KEY} X-API-KEY The api token value [required]
   * @apiHeader (Header fields required) {Content-Type} Content-Type Must be application/json
   * @apiHeaderExample {header} X-API-KEY
   * X-API-KEY: your_token...
   * @apiHeaderExample {header} Content-Type
   * Content-Type: application/json
   *
   */
  const deleteOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id,
      },
    });

    await models.opinion.destroy({
      where: {
        id: opinion.dataValues.id,
      },
    });

    return response.success_response(h, null, 'Opinion deleted', 202);
  };


  return [
    {
      method: 'GET',
      path: '/photo/{id}/opinion',
      handler: getOpinion,
      options: {
        auth: 'default',
        validate: {
          params: {
            id: Joi.number().integer().required(),
          },
        },
      },
    },
    {
      method: 'PUT',
      path: '/photo/{id}/opinion',
      handler: putOpinion,
      options: {
        auth: 'default',
        validate: {
          params: {
            id: Joi.number().integer().required(),
          },
          payload: {
            opinion: Joi.string().valid(['LIKE', 'DISLIKE']).required(),
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/photo/{id}/opinion',
      handler: deleteOpinion,
      options: {
        auth: 'default',
        validate: {
          params: {
            id: Joi.number().integer().required(),
          },
        },
      },
    },
  ];
};
