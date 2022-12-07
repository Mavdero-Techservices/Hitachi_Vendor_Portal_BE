module.exports = (sequelize, Sequelize) => {
    const fileUploadSchema = sequelize.define("fileUpload", {
        Doc: {
            type: Sequelize.BLOB,
        },
    });
    return fileUploadSchema;
};
