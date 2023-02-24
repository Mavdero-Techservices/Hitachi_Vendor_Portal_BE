module.exports = (sequelize, Sequelize) => {
    const VdetailSchema = sequelize.define("vendorDetail", {
        address1: {
            type: Sequelize.TEXT,
        },
        userId: {
            type: Sequelize.STRING,
          },
        address2: {
            type: Sequelize.TEXT,
        },
        country: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        pinCode: {
            type: Sequelize.STRING,
        },
        companyName: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.TEXT('long'),
        },
        vendorType: {
            type: Sequelize.STRING,
        },
        vendorManager: {
            type: Sequelize.STRING        
        },
        mkDenialCheque: {
            type: Sequelize.STRING
        }
    })
    return VdetailSchema;
}


