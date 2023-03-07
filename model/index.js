const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.singUp = require("./signUp.model")(sequelize, Sequelize);
db.tutorial = require("./tutorial.model")(sequelize, Sequelize);
db.fileUpload = require("./fileUploads.model")(sequelize, Sequelize);
db.vdetail = require("./vendorDetails.model")(sequelize, Sequelize);
db.fdetail = require("./financialDetails.model")(sequelize, Sequelize);
db.bankdetail = require("./bankDetails.model")(sequelize, Sequelize);
db.statdetail = require("./statDetails.model")(sequelize, Sequelize);
db.imageUpload = require("./imageUpload.model")(sequelize, Sequelize);
db.vendorCommunicationDetails = require("./communicationDetail.model")(sequelize, Sequelize);
db.complianceDetail = require("./compDetails.model")(sequelize, Sequelize);
db.contactTeam = require("./contactTeam.model")(sequelize, Sequelize);
db.MasterVendorSubUser = require("./MasterVendorSubUser.model")(sequelize, Sequelize);
db.MasterVendorUserAccess = require("./MasterVendorUserAccess.model")(sequelize, Sequelize);
db.approvalStatus = require("./approval.model")(sequelize, Sequelize);
db.periodicRequest = require("./periodicReq.model")(sequelize, Sequelize);
db.vendorFile = require("./vendorFile.model")(sequelize, Sequelize);
db.accountStatementApproval = require("./accountStatementApproval.model")(sequelize, Sequelize);
db.purchaseOrder = require("./purchaseOrder.model")(sequelize, Sequelize);
db.vendorCodeDetail = require("./vendorCodeDetails.model")(sequelize, Sequelize);
db.vendorId = require("./vendorId.model")(sequelize, Sequelize);


db.periodicRequest.hasMany(db.vendorId, {
    foreignKey: 'periodic_id',
    as: 'vendorId',
})

db.vendorId.belongsTo(db.periodicRequest, {
    foreignKey: 'periodic_id',
    as: 'periodicRequest'
})


module.exports = db;
