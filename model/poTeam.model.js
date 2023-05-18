module.exports = (sequelize, Sequelize) => {
    const pOSchema = sequelize.define("pO", {
        Document_Type: {
            type: Sequelize.STRING,
        },
        No: {
            type: Sequelize.STRING,
        },
        Order_Date: {
            type: Sequelize.STRING,
        },
        Payment_Terms_Code: {
            type: Sequelize.STRING,
        },
        Buy_from_Vendor_Name: {
            type: Sequelize.STRING,
        },
        Customer_Name:{
            type: Sequelize.STRING,
        },
        Buy_from_Vendor_No:{
            type: Sequelize.STRING,
        },
        Ship_to_Name:{
            type: Sequelize.STRING,
        },
        Amount_to_Vendor:{
            type: Sequelize.STRING,
        },
        Billed_Amount:{
            type: Sequelize.STRING,
        },
        Unbilled_Amount:{
            type: Sequelize.STRING,
        },
        level1ApprovalStatus:{
            type: Sequelize.STRING,  
        },
        level2ApprovalStatus:{
            type: Sequelize.STRING,  
        },
        level3ApprovalStatus:{
            type: Sequelize.STRING,  
        },
        Posting_Date:{
            type: Sequelize.STRING,   
        },
        level1rejectpodoc:{
            type: Sequelize.STRING,
        },
        level2rejectpodoc:{
            type: Sequelize.STRING,
        },
        level3rejectpodoc:{
            type: Sequelize.STRING,
        }

    })
    return pOSchema;
}


