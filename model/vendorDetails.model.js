module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vDetail", {
        userid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendorId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address1: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        address2: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pinCode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        contactName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        designation: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        emailId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return VdetailSchema;
}