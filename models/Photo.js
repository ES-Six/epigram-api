module.exports = (sequelize, DataTypes) => {
    const photo = sequelize.define('photo', {
        file_path: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
    }, {
        timestamps: false
    });
    photo.associate = (models) => {
      photo.hasOne(models.category, {foreignKey: 'category_id', sourceKey: 'id'});
    };
    return photo;
};