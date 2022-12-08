module.exports = (sequelize, Sequelize) => {
    const FdetailSchema = sequelize.define("fDetail", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        yearOfAuditedFinancial: {
            type: Sequelize.DATE, 
        },
        Revenue: {
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
    })
    return FdetailSchema;
}