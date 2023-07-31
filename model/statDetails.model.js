module.exports = (sequelize, Sequelize) => {
  const StatDetailsSchema = sequelize.define("statutoryDetail", {
    StatutoryId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
    },
    GST_Vendor_Type: {
      type: Sequelize.STRING,
    },
    GST_Registration_No: {
      type: Sequelize.STRING(15),
    },
    GST_Doc: {
      type: Sequelize.STRING,
    },
    P_A_N_No: {
      type: Sequelize.STRING(20),
    },
    PAN_Doc: {
      type: Sequelize.STRING,
    },
    CIN_No: {
      type: Sequelize.STRING(21),
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
      type: Sequelize.STRING,
    },
    PE_Declaration_Doc: {
      type: Sequelize.STRING,
    },
    MSMED: {
      type: Sequelize.STRING,
    },
    MSMED_Number: {
      type: Sequelize.STRING(50),
    },
    MSME_Doc: {
      type: Sequelize.STRING,
    },
    MSMED_Vendor_Type: {
      type: Sequelize.STRING,
    },
    TAN_No: {
      type: Sequelize.STRING(10),
    },
    TAN_Doc: {
      type: Sequelize.STRING,
    },
    Tax_residency_Doc: {
      type: Sequelize.STRING,
    },
    Tax_residency_No:{
      type: Sequelize.STRING,
    },
    fileDisclosure:{
      type: Sequelize.STRING,
    },
  });
  return StatDetailsSchema;
};
