module.exports = (sequelize, Sequelize,DataTypes) => {
    const EddSchema = sequelize.define("edd", {
      
        Document_Type: {
            type: Sequelize.STRING,
        },
        Document_No: {
            type: Sequelize.STRING,
        },
        Line_No: {
            type: Sequelize.STRING,
        },
        Type: {
            type: Sequelize.STRING,
        },
        No: {
            type: Sequelize.STRING,
        },
        Location_Code: {
            type: Sequelize.STRING,
        },
        Unit_of_Measure: {
            type: Sequelize.STRING,
        },
        Quantity: {
            type: Sequelize.STRING,
        },
        Amount: {
            type: Sequelize.STRING,
        },
        Maintenance_Code: {
            type: Sequelize.STRING,
        },
        Expected_Receipt_Date: {
            type: Sequelize.STRING,
        },
        EDD_Type: {
            type: Sequelize.STRING,
        },
        End_Date: {
            type: Sequelize.STRING,
        },
        Start_Date: {
            type: Sequelize.STRING,
        },
        Shortcut_Dimension_2_Code: {
            type: Sequelize.STRING,
        },
        Shortcut_Dimension_1_Code: {
            type: Sequelize.STRING,
        },
        Quantity_Invoiced: {
            type: Sequelize.STRING,
        },
        Quantity_Received: {
            type: Sequelize.STRING,
        },
        Qty_to_Receive: {
            type: Sequelize.STRING,
        },
        Qty_to_Invoice: {
            type: Sequelize.STRING,
        },
        Outstanding_Quantity: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        Description_2: {
            type: Sequelize.STRING,
        },
        ETag: {
            type: Sequelize.STRING,
        },
    })
    return EddSchema;
}
