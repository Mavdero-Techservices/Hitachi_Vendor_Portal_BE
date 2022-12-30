module.exports = (sequelize, Sequelize) => {
    const FdetailSchema = sequelize.define("fDetail", {
        financial_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        yearOfAuditedFinancial: {
            type: Sequelize.DATE, 
        },
        Revenue: {
            type: Sequelize.STRING,    
        },
        Profit: {
            type: Sequelize.STRING,
        },
        netWorth: {
            type: Sequelize.STRING,           
        },
        currentAssets: {
            type: Sequelize.STRING,        
        },
        directorDetails: {
            type: Sequelize.STRING,
        },
        financial_data: {
            type: Sequelize.BLOB('long'),
        },
        financial_data2: {
            type: Sequelize.BLOB('long'),
        }
    })
    return FdetailSchema;
}