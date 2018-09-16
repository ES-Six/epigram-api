const Joi = require("joi");
const Boom = require("boom");
const response = require("../tools/response");

module.exports = (models) => {

  const getComments = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    const comments = await models.comment.findAll({
      where: {
        photo_id: request.params.id
      }
    });

    const result = [];
    for (let idx = 0; idx < comments.length; idx += 1) {
      result.push(comments[idx].dataValues);
    }

    return response.success_response(h, result, null, 200);
  };

  const addComment = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    await models.comment.create({
      text: request.payload.text,
      photo_id: request.params.id,
      user_id: request.auth.credentials.user.id
    });

    return response.success_response(h, null, "Comment added", 200);
  };

  return [
    {
      method: "GET",
      path: "/photo/{id}/comments",
      handler: getComments,
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
      method: "POST",
      path: "/photo/{id}/comment",
      handler: addComment,
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