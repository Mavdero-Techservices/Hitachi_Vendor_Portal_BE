module.exports = (sequelize, Sequelize) => {
    const compliancedetailSchema = sequelize.define("complianceDetail", {
        complianceId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        RPD_Doc: {
            type: Sequelize.BLOB('long'),
        },
        COC_Doc: {
            type: Sequelize.BLOB('long'),         
        },
        NDA_Doc: {
            type: Sequelize.BLOB('long'),
        },
    })
    return compliancedetailSchema;
}