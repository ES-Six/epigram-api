module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define("photo", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file_path: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  photo.associate = (models) => {
    photo.belongsTo(models.category, { foreignKey: "category_id", sourceKey: "id" });
  };
  return photo;
};