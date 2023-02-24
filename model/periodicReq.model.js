module.exports = (sequelize, Sequelize, DataTypes) => {
  const PeriodicReqSchema = sequelize.define("periodicRequest", {
    userId: {
      type: Sequelize.STRING,
    },
    documentFileDoc: {
      type: Sequelize.STRING,
    },
    quaterly: {
      type: Sequelize.STRING,
    },
    halfyearly: {
      type: Sequelize.STRING,
    },
    yearly: {
      type: Sequelize.STRING,
    },
    vendorCode: {
      type: Sequelize.STRING,
    },
  });
  return PeriodicReqSchema;
};
