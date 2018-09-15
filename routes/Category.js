const response = require("../tools/response");

module.exports = (models) => {

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