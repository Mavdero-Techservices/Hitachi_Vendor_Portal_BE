module.exports = (sequelize, Sequelize) => {
    const SignUpSchema = sequelize.define("signUp", {
        companyName: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING,
        },
        contactPerson: {
            type: Sequelize.STRING
        },
        emailId: {
            type: Sequelize.STRING,
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
        vendorId: {
            type: Sequelize.STRING
        },
        userName:{
            type: Sequelize.STRING 
        },
        userId:{
            type: Sequelize.STRING 
        },
        role:{
            type: Sequelize.STRING 
        },
        finalStatus:{
            type: Sequelize.STRING 
        },
        userType: {
            type: Sequelize.STRING
        },
        subUserId: {
            type: Sequelize.STRING
        }
    });
    return SignUpSchema;
};
