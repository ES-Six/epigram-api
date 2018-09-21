module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    api_token: DataTypes.STRING,
  }, {
    timestamps: true,
  });
  user.associate = (models) => {
    user.hasMany(models.photo, { foreignKey: 'user_id', sourceKey: 'id' });
  };
  return user;
};
