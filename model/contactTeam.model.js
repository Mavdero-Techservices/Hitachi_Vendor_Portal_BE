module.exports = (sequelize, Sequelize) => {
    const contactTeamSchema = sequelize.define("contactTeam", {
        contactId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        contactName1: {
            type: Sequelize.STRING,
        },
        emailId1: {
            type: Sequelize.STRING,
        },
        contactNumber1: {
            type: Sequelize.STRING,
        },
        contactName2: {
            type: Sequelize.STRING,
        },
        emailId2: {
            type: Sequelize.STRING,
        },
        contactNumber2: {
            type: Sequelize.STRING,
        },
        contactName3: {
            type: Sequelize.STRING,
        },
        emailId3: {
            type: Sequelize.STRING,
        },
        contactNumber3: {
            type: Sequelize.STRING,
        },
        Ticket_ID:{
            type: Sequelize.STRING  
        }

    })
    return contactTeamSchema;
}