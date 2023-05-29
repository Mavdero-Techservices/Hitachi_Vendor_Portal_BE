module.exports = (sequelize, Sequelize,DataTypes) => {
    const InvoiceSchema = sequelize.define("invoice", {
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
        vendorName: {
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

        level1ApprovalStatus: {
            type: Sequelize.STRING,
        },
        level1Date: {
            type: Sequelize.DATE,
        },
        level2ApprovalStatus: {
            type: Sequelize.STRING,
        },
        level2Date: {
            type: Sequelize.DATE,
        },
        level3ApprovalStatus: {
            type: Sequelize.STRING,
        },
        level3Date: {
            type: Sequelize.DATE,
        },
        Posting_Date: {
            type: Sequelize.STRING,
        },
        level1rejectInvoicedoc: {
            type: Sequelize.STRING,
        },
        level2rejectInvoicedoc: {
            type: Sequelize.STRING,
        },
        level3rejectInvoicedoc: {
            type: Sequelize.STRING,
        }
       
    })
    return InvoiceSchema;
}
