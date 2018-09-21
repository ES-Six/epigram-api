const response = require("../tools/response");

module.exports = (models) => {

  /**
   * @api {get} /api/v1/categories Get all available categories of the platform
   * @apiName DeletePhotoComments
   * @apiGroup Category
   * @apiVersion 1.0.0
   *
   */
  const getCategories = async (request, h) => {
    const result = [];

    const categories = await models.category.findAll();

    for (let idx = 0; idx < categories.length; idx += 1) {
      result.push(categories[idx].dataValues);
    }

    return response.success_response(h, result, null, 200);
  };

  return [
    {
      method: "GET",
      path: "/categories",
      config: {
        auth: "default",
        handler: getCategories
      }
    }
  ];
};