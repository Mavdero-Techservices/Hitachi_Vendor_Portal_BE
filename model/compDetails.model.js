module.exports = (sequelize, Sequelize) => {
    const compliancedetailSchema = sequelize.define("complianceDetail", {
        complianceId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        RPD_Doc: {
            type: Sequelize.STRING,
        },
        COC_Doc: {
            type: Sequelize.STRING,    
        },
        NDA_Doc: {
            type: Sequelize.STRING,
        },
    })
    return compliancedetailSchema;
}