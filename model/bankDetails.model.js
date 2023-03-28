module.exports = (sequelize, Sequelize) => {
    const BankdetailSchema = sequelize.define("bankDetail", {
        bankId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        Account_Holder_Name: {
            type: Sequelize.STRING,
        },
        Bank_Name: {
            type: Sequelize.STRING,
        },
        Account_No: {
            type: Sequelize.STRING,
        },
        IFSC_Code: {
            type: Sequelize.STRING,
        },
        MICRcode: {
            type: Sequelize.STRING,
        },
        Bank_Address: {
            type: Sequelize.STRING,
        },
        bankdetailDoc: {
            type: Sequelize.STRING,        
        }
    })
    return BankdetailSchema;
}
