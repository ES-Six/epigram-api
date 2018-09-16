module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      photo_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  ),
  down: (queryInterface) => (queryInterface.dropTable("comments"))
};