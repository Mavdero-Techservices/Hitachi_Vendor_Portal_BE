module.exports = (sequelize, Sequelize) => {
    const SignUpSchema = sequelize.define("signUp", {
        companyName: {
            type: Sequelize.STRING(100),
        },
        phoneNumber: {
            type: Sequelize.STRING(50),
        },
        contactPerson: {
            type: Sequelize.STRING(30)
        },
        emailId: {
            type: Sequelize.STRING(50),
        },
        password: {
            type: Sequelize.STRING(100)
        },
        confirmPassword: {
            type: Sequelize.STRING(100)
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
            type: Sequelize.STRING(100) 
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
        },
        Ticket_ID:{
            type: Sequelize.STRING  
        },
        Country_Region_Code: {
            type: Sequelize.STRING(10),
        },
        twoFactorOTP: {
            type: Sequelize.STRING,
        },
    });
    return SignUpSchema;
};
