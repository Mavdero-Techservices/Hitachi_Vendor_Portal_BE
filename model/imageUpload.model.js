module.exports = (sequelize, Sequelize) => {
    const imageSchema = sequelize.define("image", {
        image: {
            type: Sequelize.BLOB,
        },
    });
    return imageSchema;
};
