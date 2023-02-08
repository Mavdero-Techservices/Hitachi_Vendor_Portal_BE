module.exports = (sequelize, Sequelize) => {
    const FdetailSchema = sequelize.define("financialDetail", {
        financial_id: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
        },
        financial_data2: {
            type: Sequelize.STRING,
        }
    })
    return FdetailSchema;
}