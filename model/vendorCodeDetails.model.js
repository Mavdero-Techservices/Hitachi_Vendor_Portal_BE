module.exports = (sequelize, Sequelize) => {
    const vendorCodeDetailSchema = sequelize.define("vendorCodeDetail", {
        vendorCode: {
            type: Sequelize.STRING,
        },
        City: {
            type: Sequelize.STRING,
        },
    })
    return vendorCodeDetailSchema;
}
