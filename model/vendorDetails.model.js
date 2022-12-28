module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vDetail", {
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        vendorId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        company_logo: {
            type: Sequelize.BLOB('long'),
        },
        companyName: {
            type: Sequelize.STRING,
        },
        address1: {
            type: Sequelize.TEXT,
        },
        address2: {
            type: Sequelize.TEXT,        
        },
        country: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        pinCode: {
            type: Sequelize.INTEGER,
        },
    })
    return VdetailSchema;
}