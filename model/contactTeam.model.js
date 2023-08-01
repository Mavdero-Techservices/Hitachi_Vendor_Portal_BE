module.exports = (sequelize, Sequelize) => {
    const contactTeamSchema = sequelize.define("contactTeam", {
        contactId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        contactName1: {
            type: Sequelize.STRING(30),
        },
        emailId1: {
            type: Sequelize.STRING(50),
        },
        contactNumber1: {
            type: Sequelize.STRING(50),
        },
        contactName2: {
            type: Sequelize.STRING(30),
        },
        emailId2: {
            type: Sequelize.STRING(50),
        },
        contactNumber2: {
            type: Sequelize.STRING(50),
        },
        contactName3: {
            type: Sequelize.STRING(30),
        },
        emailId3: {
            type: Sequelize.STRING(50),
        },
        contactNumber3: {
            type: Sequelize.STRING(50),
        },
        Ticket_ID:{
            type: Sequelize.STRING  
        }

    })
    return contactTeamSchema;
}