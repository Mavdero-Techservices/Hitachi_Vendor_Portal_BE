module.exports = (sequelize, Sequelize) => {
    const SignUpSchema = sequelize.define("signUp", {
        companyName: {
            type: Sequelize.STRING,
            unique: true
        },
        phoneNumber: {
            type: Sequelize.STRING,
            unique: true
        },
        contactPerson: {
            type: Sequelize.STRING
        },
        emailId: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        confirmPassword: {
            type: Sequelize.STRING
        },
        verifiedUser: {
            type: Sequelize.STRING
        },
        mailConfirmationCode: {
            type: Sequelize.STRING
        },
        phoneNoConfirmationCode: {
            type: Sequelize.STRING
        },
    });
    return SignUpSchema;
};
