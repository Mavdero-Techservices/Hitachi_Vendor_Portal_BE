module.exports = (sequelize, Sequelize) => {
    const StatDetailsSchema = sequelize.define("statDetails", {
        StatutoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        GST_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        PAN_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        TAN_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        TIN_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        CIN_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        MSME_No: {
            type: Sequelize.STRING,
            allowNull: false
        },
        MSME_Type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        PAN_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        GST_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        MSME_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        CI_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
    });
    return StatDetailsSchema;
};
