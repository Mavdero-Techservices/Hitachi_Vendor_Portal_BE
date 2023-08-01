module.exports = (sequelize, Sequelize) => {
    const vendorCommunicationDetailsSchema = sequelize.define("vendorCommunicationDetail", {
        financeSpoccontactName: {
            type: Sequelize.STRING(30),
        },
        financeSpocdesignation: {
            type: Sequelize.STRING(30),
        },
        financeSpocphoneNo: {
            type: Sequelize.STRING(50),
        },
        financeSpocemail: {
            type: Sequelize.STRING(50),
        },
        operationSpoccontactName: {
            type: Sequelize.STRING(30),
        },
        operationSpocdesignation: {
            type: Sequelize.STRING(30),
        },
        operationSpocphoneNo: {
            type: Sequelize.STRING(50),
        },
        operationSpocemail: {
            type: Sequelize.STRING(50),
        },
        collectionSpoccontactName: {
            type: Sequelize.STRING(30),
        },
        collectionSpocdesignation: {
            type: Sequelize.STRING(30),
        },
        collectionSpocphoneNo: {
            type: Sequelize.STRING(50),
        },
        collectionSpocemail: {
            type: Sequelize.STRING(50),
        },
        managementSpoccontactName: {
            type: Sequelize.STRING(30),
        },
        managementSpocdesignation: {
            type: Sequelize.STRING(30),
        },
        managementSpocphoneNo: {
            type: Sequelize.STRING(50),
        },
        managementSpocemail: {
            type: Sequelize.STRING(50),
        },
        contactName: {
            type: Sequelize.STRING(30),
        },
        designation: {
            type: Sequelize.STRING(30),
        },
        phoneNo: {
            type: Sequelize.STRING(50),
        },
        email: {
            type: Sequelize.STRING(50),
        },
        userId: {
            type: Sequelize.STRING,
        },
        mastervendor_email:{
            type: Sequelize.STRING(50),
        }
    })
    return vendorCommunicationDetailsSchema;
}


