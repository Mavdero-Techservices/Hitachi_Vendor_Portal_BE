module.exports = (sequelize, Sequelize,DataTypes) => {
    const InvoiceSchema = sequelize.define("invoice", {
        poNumber: {
            type: Sequelize.STRING,
        },
        docDate: {
            type: Sequelize.STRING,
        },
        vendorInvoiceNo: {
            type: Sequelize.STRING,
        },
        srNo: {
            type: Sequelize.STRING,
        },
        glCode: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.STRING,
        },
        endDate: {
            type: Sequelize.STRING,
        },
        qty: {
            type: Sequelize.STRING,
        },
        qtyDelivered: {
            type: Sequelize.STRING,
        },
        rate: {
            type: Sequelize.STRING,
        },
        baseAmount: {
            type: Sequelize.STRING,
        },
        taxAmount: {
            type: Sequelize.STRING,
        },
        grossAmount: {
            type: Sequelize.STRING,
        },
        eWayBill: {
            type: Sequelize.STRING,
        },
        transportDocument: {
            type: Sequelize.STRING,
        },
        miscDocs: {
            type: Sequelize.STRING,
        },
        boe: {
            type: Sequelize.STRING,
        },
        awb: {
            type: Sequelize.STRING,
        },
        serviceAgreement: {
            type: Sequelize.STRING,
        },
        lic: {
            type: Sequelize.STRING,
        },
        licDeliveryProof: {
            type: Sequelize.STRING,
        },
        warrantyCertificate: {
            type: Sequelize.STRING,
        },
        irWcc: {
            type: Sequelize.STRING,
        },
        signOffFromCustomer: {
            type: Sequelize.STRING,
        },
        coc: {
            type: Sequelize.STRING,
        },
        esiPayementChallan: {
            type: Sequelize.STRING,
        },
        pfPayementChallan: {
            type: Sequelize.STRING,
        },
        employeeSummary: {
            type: Sequelize.STRING,
        },
        arWorking: {
            type: Sequelize.STRING,
        },
        deliveryProof: {
            type: Sequelize.STRING,
        },
        calculation: {
            type: Sequelize.STRING,
        },
        customExRate: {
            type: Sequelize.STRING,
        },
       
    })
    return InvoiceSchema;
}
