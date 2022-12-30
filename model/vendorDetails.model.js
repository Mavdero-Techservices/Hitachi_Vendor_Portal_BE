module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vendorDetail", {
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
        companyName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return VdetailSchema;
}


