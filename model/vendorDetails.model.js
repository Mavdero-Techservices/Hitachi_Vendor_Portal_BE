module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vendorDetail", {
        Address: {
            type: Sequelize.TEXT,
        },
        userId: {
            type: Sequelize.STRING,
          },
        Address_2: {
            type: Sequelize.TEXT,
        },
        Country_Region_Code: {
            type: Sequelize.STRING(10),
        },
        state: {
            type: Sequelize.STRING(100),
        },
        City: {
            type: Sequelize.STRING(30),
        },
        Post_Code: {
            type: Sequelize.STRING(20),
        },
        companyName: {
            type: Sequelize.STRING(100),
        },
        image: {
            type: Sequelize.TEXT('long'),
        },
        Vendor_Type: {
            type: Sequelize.STRING,
        },
        Vendor_Account_Manager: {
            type: Sequelize.STRING(50)        
        },
        mkDenialCheque: {
            type: Sequelize.STRING
        },
        approverFile: {
            type: Sequelize.STRING,
        },
        submitStatus: {
            type: Sequelize.STRING
        },
        submitDate: {
            type: Sequelize.DATEONLY
        },
        Ticket_ID:{
            type: Sequelize.STRING  
        },
        userStatus: {
            type: Sequelize.STRING,
        },
        stateCode:{
            type: Sequelize.STRING(10) 
        },
        masterId: {
            type: Sequelize.STRING,
        },
    })
    return VdetailSchema;
}


