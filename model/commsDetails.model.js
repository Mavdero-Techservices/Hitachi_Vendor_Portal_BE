module.exports = (sequelize, Sequelize) => {
    const CommsdetailSchema = sequelize.define("commsDetail",{
        commsId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        fs_ContactName: {
            type: Sequelize.STRING,
        },
        fs_Designation: {
            type: Sequelize.STRING,
        },
        fs_PhoneNo: {
            type: Sequelize.STRING,
        },
        fs_Email: {
            type: Sequelize.STRING,
        },
        ops_ContactName: {
            type: Sequelize.STRING,
        },
        ops_Designation: {
            type: Sequelize.STRING,
        },
        ops_PhoneNo: {
            type: Sequelize.STRING,
        },
        ops_Email: {
            type: Sequelize.STRING,
        },
        mngs_ContactName: {
            type: Sequelize.STRING,
        },
        mngs_Designation: {
            type: Sequelize.STRING,
        },
        mngs_PhoneNo: {
            type: Sequelize.STRING,
        },
        mngs_Email: {
            type: Sequelize.STRING,
        },
        others_ContactName: {
            type: Sequelize.STRING,
        },
        others_Designation: {
            type: Sequelize.STRING,
        },
        others_PhoneNo: {
            type: Sequelize.STRING,
        },
        others_Email: {
            type: Sequelize.STRING,
        },
        //login and password must be sent to this mail
        //required
        mastervendor_email: {
            type: Sequelize.STRING,
        }
    })
    return CommsdetailSchema;
}

