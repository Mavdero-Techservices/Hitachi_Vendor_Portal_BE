module.exports = (sequelize, Sequelize) => {
    const accountStatementApprovalSchema = sequelize.define("accountStatementApproval", {
        userId: {
            type: Sequelize.STRING,
        },
        vendorCode: {
            type: Sequelize.STRING,
        },
        vendorId: {
            type: Sequelize.INTEGER,
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
    return accountStatementApprovalSchema;
}
