module.exports = (sequelize, Sequelize) => {
    const purchaseOrderSchema = sequelize.define("purchaseOrder", {
        userId: {
            type: Sequelize.STRING,
        },
        itemCodeDesc: {
            type: Sequelize.STRING,
        },
        qty: {
            type: Sequelize.DECIMAL,
        },
        totalAmount: {
            type: Sequelize.DOUBLE,
        },
        edDate: {
            type: Sequelize.DATEONLY,
        }
    })
    return purchaseOrderSchema;
}
