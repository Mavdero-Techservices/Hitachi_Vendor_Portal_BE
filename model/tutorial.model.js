module.exports = (sequelize, Sequelize) => {
    const tutorialSchema = sequelize.define("tutorial", {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        emailId: {
            type: Sequelize.STRING
        },
    });
    return tutorialSchema;
};
