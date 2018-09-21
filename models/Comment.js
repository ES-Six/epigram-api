module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    text: DataTypes.STRING,
    photo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  comment.associate = (/* models */) => {

  };
  return comment;
};
