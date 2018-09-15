module.exports = {
  up: (queryInterface, Sequelize) => (Promise.all([
    queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),
    queryInterface.bulkInsert("categories", [
      { name: "Sport" },
      { name: "Animaux" },
      { name: "Nature" },
      { name: "Automobile" },
      { name: "Politique" },
      { name: "Informatique" },
      { name: "Humour" },
      { name: "Selfies" }
    ])
  ])),
  down: (queryInterface) => (queryInterface.dropTable("categories"))
};