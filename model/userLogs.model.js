module.exports = (sequelize, Sequelize,DataTypes) => {
    const UserLogs = sequelize.define("userLogs", {
        userId: {
            type: Sequelize.STRING,
        },
        userIp: {
            type: Sequelize.STRING,
        }
    })
    return UserLogs;
}
