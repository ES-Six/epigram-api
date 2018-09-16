const Joi = require("joi");
const Boom = require("boom");
const fs = require('fs');
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
      user_id: request.auth.credentials.user.id,
      mime_type: request.payload.file.hapi.headers['content-type']
    });

    await photo.updateAttributes({
      file_path: `file_vault/${photo.dataValues.id}.jpg`
    });

    // Read uploaded file stream and put it to a buffer
    let chunk;
    const bufferss = [];
    while (chunk !== null) {
      chunk = request.payload.file.read();
      if (chunk === null)
        break;
      bufferss.push(chunk);
    }
    const buffer = Buffer.concat(bufferss);

    // Save buffer to disk
    fs.writeFileSync(`file_vault/${photo.dataValues.id}.jpg`, buffer);

    return response.success_response(h, result, null, 201);
  };

  const readPhoto = async (request, h) => {
    const photo = await models.photo.findOne({
      where: {
        id: request.params.id
      }
    });

    if (photo === null) {
      throw Boom.notFound(`Photo with id '${request.params.category_id}' does not exist`, null);
    }

    let file = null;
    try {
      file = fs.readFileSync(photo.dataValues.file_path);
    } catch (exception) {
      if (exception.code === 'ENOENT')
        throw Boom.resourceGone(`Photo with id ${photo.dataValues.id} exist but corresponding file could not be found`);
      else {
        global.console.err(exception);
        throw Boom.internal(`Photo with id ${photo.dataValues.id} exist but file could not be read`);
      }
    }

    return h.response(file).type(photo.mime_type).code(200);
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
      method: "GET",
      path: "/photo/{id}",
      handler: readPhoto,
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