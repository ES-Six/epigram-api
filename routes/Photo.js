const Joi = require("joi");
const Boom = require("boom");
const response = require("../tools/response");

module.exports = (models) => {

  const getPhotos = async (request, h) => {
    const result = [];

    const category = await models.category.findOne({
      where: {
        id: request.params.category_id
      }
    });

    if (category === null) {
      throw Boom.notFound(`Category with id '${request.params.category_id}' does not exist`, null);
    }

    const photos = await models.photo.findAll({
      where: {
        category_id: request.params.category_id
      }
    });

    for (let idx = 0; idx < photos.length; idx += 1) {
      result.push(photos[idx].dataValues);
    }

    return response.success_response(h, result, null, 200);
  };

  const addPhoto = async (request, h) => {
    const result = [];

    const category = await models.category.findOne({
      where: {
        id: request.params.category_id
      }
    });

    if (category === null) {
      throw Boom.notFound(`Category with id '${request.params.category_id}' does not exist`, null);
    }

    const photo = await models.photo.create({
      title: request.payload.title,
      description: request.payload.description,
      file_path: null,
      category_id: request.params.category_id,
      user_id: request.auth.credentials.user.id
    });

    return response.success_response(h, result, null, 201);
  };

  return [
    {
      method: "GET",
      path: "/category/{category_id}/photos",
      handler: getPhotos,
      options: {
        auth: "default",
        validate: {
          params: {
            category_id: Joi.number().integer().required()
          }
        }
      }
    },
    {
      method: "POST",
      path: "/category/{category_id}/photo",
      handler: addPhoto,
      options: {
        auth: "default",
        payload: {
          output: "stream",
          parse: true,
          allow: "multipart/form-data",
          maxBytes: 10 * 1024 * 1024 // max 10 Mo
        },
        validate: {
          params: {
            category_id: Joi.number().integer().required()
          },
          payload: {
            title: Joi.string().max(255).required(),
            description: Joi.string().required(),
            file: Joi.object({
              hapi: Joi.object({
                headers: Joi.object({
                  'content-type': Joi.string().valid(['image/jpeg']).required()
                }).unknown()
              }).unknown()
            }).unknown()
          }
        }
      }
    }
  ];
};