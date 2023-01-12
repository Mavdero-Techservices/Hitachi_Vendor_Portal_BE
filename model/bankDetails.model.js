module.exports = (sequelize, Sequelize) => {
    const BankdetailSchema = sequelize.define("bankDetail", {
        bankId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        bankAccountName: {
            type: Sequelize.STRING,
        },
        bankName: {
            type: Sequelize.STRING,
        },
        bankAccountNumber: {
            type: Sequelize.STRING,
        },
        ifscCode: {
            type: Sequelize.STRING,
        },
        MICRcode: {
            type: Sequelize.STRING,
        },
        branchAddress: {
            type: Sequelize.STRING,
        },
        bankdetailDoc: {
            type: Sequelize.BLOB('long'),          
        }
    })
    return BankdetailSchema;
}
