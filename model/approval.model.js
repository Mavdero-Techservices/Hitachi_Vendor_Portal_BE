module.exports = (sequelize, Sequelize,DataTypes) => {
    const ApprovalSchema = sequelize.define("approval", {
        userId: {
            type: Sequelize.STRING,
        },
        level1Status: {
            type: Sequelize.STRING,
        },
        level1RejectComment: {
            type: Sequelize.STRING,
        },
        level1rejectFileDoc: {
            type: Sequelize.STRING,
        },
        level2Status: {
            type: Sequelize.STRING,
        },
        level2RejectComment: {
            type: Sequelize.STRING,
        },
        level2rejectFileDoc: {
            type: Sequelize.STRING,
        },
        level2Date: {
            type: Sequelize.DATEONLY,
        },
        level3Status: {
            type: Sequelize.STRING,
        },
        level3RejectComment: {
            type: Sequelize.STRING,
        },
        level3rejectFileDoc: {
            type: Sequelize.STRING,
        },
        level3Date: {
            type: Sequelize.DATE,
        }
    })
    return ApprovalSchema;
}
