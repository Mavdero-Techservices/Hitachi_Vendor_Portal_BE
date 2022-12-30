module.exports = (sequelize, Sequelize) => {
  const StatDetailsSchema = sequelize.define("statDetails", {
    StatutoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    form_10f:{
      type: Sequelize.BLOB("long"),
    },
    pe_declaration: {
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
    Tax_residency: {
      type: Sequelize.BLOB("long"),
    },
  });
  return StatDetailsSchema;
};
