module.exports = (sequelize, Sequelize) => {
    const BankdetailSchema = sequelize.define("bankDetail", {
        bankId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        Account_Holder_Name: {
            type: Sequelize.STRING(100),
        },
        Bank_Name: {
            type: Sequelize.STRING(30),
        },
        Account_No: {
            type: Sequelize.STRING(20),
        },
        IFSC_Code: {
            type: Sequelize.STRING(20),
        },
        MICRcode: {
            type: Sequelize.STRING(30),
        },
        Bank_Address: {
            type: Sequelize.STRING(50),
        },
        bankdetailDoc: {
            type: Sequelize.STRING,        
        }
    })
    return BankdetailSchema;
}
