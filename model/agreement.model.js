module.exports = (sequelize, Sequelize) => {
    const AgreementSchema = sequelize.define("agreement", {
        userId: {
            type: Sequelize.STRING,
        },
        agreementDoc: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING, 
        }
    })
    return AgreementSchema;
}
