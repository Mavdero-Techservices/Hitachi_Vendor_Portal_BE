module.exports = (sequelize, Sequelize) => {
    const BankdetailSchema = sequelize.define("bankDetail", {
        bankId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        bankAccountName: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        bankAccountNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ifscCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bankName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        MICRcode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bankAddress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bankDoc: {
            type: Sequelize.BLOB('long'),
            allowNull: false          
        }
    })
    return BankdetailSchema;
}