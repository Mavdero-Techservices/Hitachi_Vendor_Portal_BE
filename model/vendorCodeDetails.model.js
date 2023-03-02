module.exports = (sequelize, Sequelize) => {
    const vendorCodeDetailSchema = sequelize.define("vendorCodeDetail", {
        vendorCode: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
    })
    return vendorCodeDetailSchema;
}
