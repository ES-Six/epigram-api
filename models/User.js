module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        api_token: DataTypes.STRING
    }, {
        timestamps: true
    });
    user.associate = (/* models */) => {
        // Put associations here
    };
    return user;
};