module.exports = (sequelize, Sequelize) => {
    const StatDetailsSchema = sequelize.define("statutory_details", {
        StatutoryId: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        GST_No: {
            type: Sequelize.STRING,
            unique: true
        },
        PAN_No: {
            type: Sequelize.STRING,
            unique: true
        },
        TAN_No: {
            type: Sequelize.STRING,
            unique: true
        },
        TIN_No: {
            type: Sequelize.STRING,
            unique: true
        },
        CIN_No: {
            type: Sequelize.STRING,
            unique: true
        },
        MSME_No: {
            type: Sequelize.STRING,
            unique: true
        },
        MSME_Type: {
            type: Sequelize.STRING,
            unique: true
        },
        PAN_Doc: {
            type: Sequelize.BLOB('long'),
        },
        GST_Doc: {
            type: Sequelize.BLOB('long'),
        },
        MSME_Doc: {
            type: Sequelize.BLOB('long'),
        },
        CI_Doc: {
            type: Sequelize.BLOB('long'),
        },
        RPD_Doc: {
            type: Sequelize.BLOB('long'),
        },
        COC_Doc: {
            type: Sequelize.BLOB('long'),
        },
        ND_Doc: {
            type: Sequelize.BLOB('long'),
        },
    });
    return StatDetailsSchema;
};
