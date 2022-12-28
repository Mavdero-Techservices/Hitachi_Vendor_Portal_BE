module.exports = (sequelize, Sequelize) => {
    const CompdetailSchema = sequelize.define("compDetail", {
        compId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        RPD_Doc: {
            type: Sequelize.BLOB('long'),
        },
        COC_Doc: {
            type: Sequelize.BLOB('long'),         
        },
        NDA_Doc: {
            type: Sequelize.BLOB('long'),
        },
    })
    return CompdetailSchema;
}