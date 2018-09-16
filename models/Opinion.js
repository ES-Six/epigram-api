module.exports = (sequelize, DataTypes) => {
  const opinion = sequelize.define("opinion", {
    opinion: DataTypes.ENUM('LIKE', 'DISLIKE'),
    photo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  opinion.associate = (/* models */) => {

  };
  return opinion;
};