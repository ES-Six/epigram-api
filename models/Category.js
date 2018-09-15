module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        name: DataTypes.STRING
    }, {
        timestamps: false
    });
    category.associate = (/* models */) => {

    };
    return category;
};