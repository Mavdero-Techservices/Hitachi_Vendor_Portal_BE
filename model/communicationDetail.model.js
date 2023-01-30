module.exports = (sequelize, Sequelize) => {
    const vendorCommunicationDetailsSchema = sequelize.define("vendorCommunicationDetail", {
        financeSpoccontactName: {
            type: Sequelize.STRING,
        },
        financeSpocdesignation: {
            type: Sequelize.STRING,
        },
        financeSpocphoneNo: {
            type: Sequelize.STRING,
        },
        financeSpocemail: {
            type: Sequelize.STRING,
        },
        operationSpoccontactName: {
            type: Sequelize.STRING,
        },
        operationSpocdesignation: {
            type: Sequelize.STRING,
        },
        operationSpocphoneNo: {
            type: Sequelize.STRING,
        },
        operationSpocemail: {
            type: Sequelize.STRING,
        },
        collectionSpoccontactName: {
            type: Sequelize.STRING,
        },
        collectionSpocdesignation: {
            type: Sequelize.STRING,
        },
        collectionSpocphoneNo: {
            type: Sequelize.STRING,
        },
        collectionSpocemail: {
            type: Sequelize.STRING,
        },
        managementSpoccontactName: {
            type: Sequelize.STRING,
        },
        managementSpocdesignation: {
            type: Sequelize.STRING,
        },
        managementSpocphoneNo: {
            type: Sequelize.STRING,
        },
        managementSpocemail: {
            type: Sequelize.STRING,
        },
        contactName: {
            type: Sequelize.STRING,
        },
        designation: {
            type: Sequelize.STRING,
        },
        phoneNo: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
    })
    return vendorCommunicationDetailsSchema;
}


