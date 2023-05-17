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
        invoiceFile: {
            type: Sequelize.STRING,
        },
        document1: {
            type: Sequelize.STRING,
        },
        document2: {
            type: Sequelize.STRING,
        },
        document3: {
            type: Sequelize.STRING,
        },
        document4: {
            type: Sequelize.STRING,
        },
        document5: {
            type: Sequelize.STRING,
        },
        document6: {
            type: Sequelize.STRING,
        }
    })
    return InvoiceSchema;
}
