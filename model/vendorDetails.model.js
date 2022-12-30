module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vendorDetail", {
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
            allowNull: false
        },
        companyName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return VdetailSchema;
}


