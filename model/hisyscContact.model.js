module.exports = (sequelize, Sequelize) => {
    const HisysContactSchema = sequelize.define("hisysContact", {
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        contactNumber: {
            type: Sequelize.STRING,
            unique: true
        },
        name2: {
            type: Sequelize.STRING,
            unique: true
        },
        email2: {
            type: Sequelize.STRING,
            unique: true
        },
        contactNumber2: {
            type: Sequelize.STRING,
            unique: true
        },
        name3: {
            type: Sequelize.STRING,
            unique: true
        },
        email3: {
            type: Sequelize.STRING,
            unique: true
        },
        contactNumber3: {
            type: Sequelize.STRING,
            unique: true
        },
    });
    return HisysContactSchema;
};