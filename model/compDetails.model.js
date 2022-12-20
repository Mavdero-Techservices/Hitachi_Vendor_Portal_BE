module.exports = (sequelize, Sequelize) => {
    const CompdetailSchema = sequelize.define("compDetail", {
        compId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        RPD_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false 
        },
        COC_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false          
        },
        NDA_Doc: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
    })
    return CompdetailSchema;
}