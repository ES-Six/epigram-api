const Joi = require("joi");
const Boom = require("boom");
const response = require("../tools/response");

module.exports = (models) => {

  /**
   * @api {get} /api/v1/photo/{id}/comments get the commments for a photo
   * @apiName GetPhotoComments
   * @apiGroup Comment
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   *
   */
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

  /**
   * @api {post} /api/v1/photo/{id}/comment Post a comment to a photo
   * @apiName AddPhotoComments
   * @apiGroup Comment
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   *
   */
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

  /**
   * @api {delete} /api/v1/photo/{id}/comment/{id_comment} Delete a commments for a photo
   * @apiName DeletePhotoComments
   * @apiGroup Comment
   * @apiVersion 1.0.0
   *
   * @apiParam {id} id The id of the photo
   * @apiParam {id_comment} id_comment The id of the comment of the photo
   *
   */
  const delComment = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.id}' does not exist`, null);
    }

    await models.comment.destroy({
      where: {
        id: request.params.id_comment
      }
    });

    return response.success_response(h, null, "Comment deleted", 202);
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
    },
    {
      method: "DELETE",
      path: "/photo/{id}/comment/{id_comment}",
      handler: delComment,
      options: {
        auth: "default",
        validate: {
          params: {
            id: Joi.number().integer().required(),
            id_comment: Joi.number().integer().required()
          }
        }
      }
    }
  ];
};