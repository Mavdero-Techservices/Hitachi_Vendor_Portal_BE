module.exports = (sequelize, Sequelize) => {
    const vendorApprovalSchema = sequelize.define("vendorApproval", {
        userId: {
            type: Sequelize.STRING,
        },
        vendorCode: {
            type: Sequelize.STRING,
        },
        vendorId: {
            type: Sequelize.STRING,
        },
        poNo: {
            type: Sequelize.STRING,
        },
        itemName: {
            type: Sequelize.STRING,
        },
        rejectComment: {
            type: Sequelize.STRING,
        },
        rejectFileDoc: {
            type: Sequelize.STRING,
        },
        vendorStatus: {
            type: Sequelize.STRING,
        },
    })
    return vendorApprovalSchema;
}
