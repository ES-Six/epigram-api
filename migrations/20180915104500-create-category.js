module.exports = {
  up: (queryInterface, Sequelize) => (Promise.all([
    queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),
    queryInterface.bulkInsert('categories', [
      { name: 'CATEGORY_SPORT' },
      { name: 'CATEGORY_ANIMALS' },
      { name: 'CATEGORY_NATURE' },
      { name: 'CATEGORY_CARS' },
      { name: 'CATEGORY_POLITIC' },
      { name: 'CATEGORY_COMPUTER_SCIENCE' },
      { name: 'CATEGORY_HUMOUR' },
      { name: 'CATEGORY_SELFIES' },
    ]),
  ])),
  down: queryInterface => (queryInterface.dropTable('categories')),
};
