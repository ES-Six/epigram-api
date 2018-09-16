const Joi = require("joi");
const Boom = require("boom");
const response = require("../tools/response");

module.exports = (models) => {

  const postOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id
      }
    });

    if (opinion === null) {
      models.opinion.create({
        opinion: request.payload.opinion,
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id
      });
    } else {
      await opinion.updateAttributes({
        opinion: request.payload.opinion
      });
    }

    return response.success_response(h, null, `Photo with id ${request.params.id} have been ${request.payload.opinion}`, 200);
  };

  const getOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id
      }
    });

    let opinionValue = 'NO_OPINION';
    if (opinion !== null) {
      opinionValue = opinion.dataValues.opinion;
    }

    return response.success_response(h, {opinion: opinionValue}, null, 200);
  };

  const deleteOpinion = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const opinion = await models.opinion.findOne({
      where: {
        photo_id: request.params.id,
        user_id: request.auth.credentials.user.id
      }
    });

    await models.opinion.destroy({
      where: {
        id: opinion.dataValues.id
      }
    });

    return response.success_response(h, null, 'Opinion deleted', 202);
  };


  return [
    {
      method: "GET",
      path: "/photo/{id}/opinion",
      handler: getOpinion,
      options: {
        auth: "default",
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      }
    },
    {
      method: "PUT",
      path: "/photo/{id}/opinion",
      handler: postOpinion,
      options: {
        auth: "default",
        validate: {
          params: {
            id: Joi.number().integer().required()
          },
          payload: {
            opinion: Joi.string().valid(['LIKE', 'DISLIKE']).required()
          }
        }
      }
    },
    {
      method: "DELETE",
      path: "/photo/{id}/opinion",
      handler: deleteOpinion,
      options: {
        auth: "default",
        validate: {
          params: {
            id: Joi.number().integer().required()
          }
        }
      }
    }
  ];
};