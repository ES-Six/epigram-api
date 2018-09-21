module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('opinions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      opinion: {
        type: Sequelize.ENUM('LIKE', 'DISLIKE'),
        allowNull: false,
      },
      photo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  ),
  down: queryInterface => (queryInterface.dropTable('opinions')),
};
