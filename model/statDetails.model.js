module.exports = (sequelize, Sequelize) => {
  const StatDetailsSchema = sequelize.define("statutoryDetail", {
    StatutoryId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
    },
    GST_type: {
      type: Sequelize.STRING,
    },
    GST_No: {
      type: Sequelize.STRING,
    },
    GST_Doc: {
      type: Sequelize.BLOB("long"),   
    },
    PAN_No: {
      type: Sequelize.STRING,
    },
    PAN_Doc: {
      type: Sequelize.BLOB("long"),
    },
    CIN_No: {
      type: Sequelize.STRING,
    },
    form_10f:
    {
      type: Sequelize.STRING,
    },
    PE_DeclarationNo:
    {
      type: Sequelize.STRING,
    },
    form_10f_Doc:{
      type: Sequelize.BLOB("long"),
    },
    PE_Declaration_Doc: {
      type: Sequelize.BLOB("long"),
    },
    MSME_status: {
      type: Sequelize.STRING,
    },
    MSME_No: {
      type: Sequelize.STRING,
    },
    MSME_Doc: {
      type: Sequelize.BLOB("long"),
    },
    MSME_Type: {
      type: Sequelize.STRING,
    },
    TAN_No: {
      type: Sequelize.STRING,
    },
    TAN_Doc: {
      type: Sequelize.BLOB("long"),
    },
    Tax_residency_Doc: {
      type: Sequelize.BLOB("long"),
    },
    Tax_residency_No:{
      type: Sequelize.STRING,
    },
    fileDisclosure:{
      type: Sequelize.BLOB("long"),
    },
  });
  return StatDetailsSchema;
};
