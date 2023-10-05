module.exports = (sequelize, Sequelize) => {
    const EditLogSchema = sequelize.define("EditLog", {

        userId:{
            type: Sequelize.STRING 
        },
        role:{
            type: Sequelize.STRING 
        },
        EditedFields: {
            type: Sequelize.JSON, 
        }
    });
    return EditLogSchema;
};
