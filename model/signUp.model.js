module.exports = (sequelize, Sequelize) => {
    const SignUpSchema = sequelize.define("signUp", {
        firstName: {
            type: Sequelize.STRING,
            unique: true
        },
        lastName: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING
        },
        contactNumber: {
            type: Sequelize.INTEGER
        }
    });

    return SignUpSchema;
};
