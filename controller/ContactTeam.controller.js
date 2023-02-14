
const db = require("../model");
const contactTeamSchema = db.contactTeam;
const VdetailSchema = db.vdetail;
const vendorCommunicationDetails = db.vendorCommunicationDetails;
const StatDetailSchema = db.statdetail;
const CompliancedetailSchema = db.complianceDetail;
const FdetailSchema = db.fdetail;
const BankdetailSchema = db.bankdetail;
var database = require('../config/db.config');
exports.saveContactTeam = (req, res) => {
    const contactId = 'contactId' + Math.floor(100000 + Math.random() * 900000);
    const userId = req.body.userId;
    const contactName1 = req.body.contactName1;
    const emailId1 = req.body.emailId1;
    const contactNumber1 = req.body.contactNumber1;
    const contactName2 = req.body.contactName2;
    const emailId2 = req.body.emailId2;
    const contactNumber2 = req.body.contactNumber2;
    const contactName3 = req.body.contactName3;
    const emailId3 = req.body.emailId3;
    const contactNumber3 = req.body.contactNumber3;
    const user = new contactTeamSchema({
        contactId: contactId,
        userId: userId,
        contactName1: contactName1,
        emailId1: emailId1,
        contactNumber1: contactNumber1,
        contactName2: contactName2,
        emailId2: emailId2,
        contactNumber2: contactNumber2,
        contactName3: contactName3,
        emailId3: emailId3,
        contactNumber3: contactNumber3,

    });
    user.save()
        .then(result => {
            return res.status(200).json({ status: "success", message: "Registered Successfully", result });
        })
}
exports.getAllCollection = async (req, res) => {
    var userId = req.params.userId;
    const basicInfoArray = [];
    const CommunicationDetailsArray = [];
    const StatDetailArray = [];
    const CompliancedetailArray = [];
    const FdetailArray = [];
    const bankdetailArray = [];
    const contactTeamArray = [];
    await VdetailSchema.findOne({
        where: { userId: userId },
    }).then(async basicInfo => {
        if (basicInfo === null) {
            basicInfoArray.length = 0;

        }
        else {
            basicInfoArray.push(basicInfo);
        }
        await vendorCommunicationDetails.findOne({
            where: { userId: userId },
        }).then(async CommunicationDetails => {
            if (CommunicationDetails === null) {
                CommunicationDetailsArray.length = 0;
            }
            else {
                CommunicationDetailsArray.push(CommunicationDetails);
            }
            await StatDetailSchema.findOne({
                where: { userId: userId },
            }).then(async StatDetail => {
                if (StatDetail === null) {
                    StatDetailArray.length = 0;
                }
                else {
                    StatDetailArray.push(StatDetail);
                }

                await CompliancedetailSchema.findOne({
                    where: { userId: userId },
                }).then(async Compliancedetail => {
                    if (Compliancedetail === null) {
                        CompliancedetailArray.length = 0;
                    }
                    else {
                        CompliancedetailArray.push(Compliancedetail);
                    }

                    await FdetailSchema.findOne({
                        where: { userId: userId },
                    }).then(async Fdetail => {
                        if (Fdetail === null) {
                            FdetailArray.length = 0;
                        }
                        else {
                            FdetailArray.push(Fdetail);
                        }

                        await BankdetailSchema.findOne({
                            where: { userId: userId },
                        }).then(async Bankdetail => {
                            if (Bankdetail === null) {
                                bankdetailArray.length = 0;
                            }
                            else {
                                bankdetailArray.push(Bankdetail);
                            }
                            await contactTeamSchema.findOne({
                                where: { userId: userId },
                            }).then(async contactTeam => {
                                if (contactTeam === null) {
                                    contactTeamArray.length = 0;
                                }
                                else {
                                    contactTeamArray.push(contactTeam);
                                }

                            })
                        })
                    })
                })
            })
        })
    })

    res.status(200).json({ status: "success", basicInfo: basicInfoArray, CommunicationDetails: CommunicationDetailsArray, Statutory: StatDetailArray, ComplianceDetail: CompliancedetailArray, FinancialDetail: FdetailArray, Bankdetail: bankdetailArray, contactDetail: contactTeamArray });
}
exports.getAllUserDetail = async (req, res) => {
    const basicInfoArray = [];
    const CommunicationDetailsArray = [];
    const StatDetailArray = [];
    const CompliancedetailArray = [];
    const FdetailArray = [];
    const bankdetailArray = [];
    await VdetailSchema.findAll().then(async basicInfo => {
        basicInfoArray.push(basicInfo);
        await vendorCommunicationDetails.findAll().then(async CommunicationDetails => {
            CommunicationDetailsArray.push(CommunicationDetails);
            await StatDetailSchema.findAll().then(async StatDetail => {
                StatDetailArray.push(StatDetail);
                await CompliancedetailSchema.findAll().then(async Compliancedetail => {
                    CompliancedetailArray.push(Compliancedetail);
                    await FdetailSchema.findAll().then(async Fdetail => {
                        FdetailArray.push(Fdetail);
                        await BankdetailSchema.findAll().then(async Bankdetail => {
                            bankdetailArray.push(Bankdetail);
                        })
                    })
                })
            })
        })
    })
    res.status(200).json({ status: "success", basicInfo: basicInfoArray, CommunicationDetails: CommunicationDetailsArray, Statutory: StatDetailArray, ComplianceDetail: CompliancedetailArray, FinancialDetail: FdetailArray, Bankdetail: bankdetailArray });
}

// update all
// exports.updateAllCollection = async (req, res) => {
//     var userId = req.params.userId;
//     const promises = [
//         VdetailSchema.update({ ...req.body.basicInfo }, { where: { userId: userId } }),
//         vendorCommunicationDetails.update({ ...req.body.CommunicationDetails }, { where: { userId: userId } }),
//         contactTeamSchema.update({ ...req.body.contactTeamSchema  }, { where: { userId: userId } }),
//         BankdetailSchema.update({ ...req.body.BankdetailSchema }, {where: {userId: userId} }), 
//         StatDetailSchema.update({ ...req.body.StatDetailSchema }, {where: { userId: userId} }),
//         CompliancedetailSchema.update({ ...req.body.CompliancedetailSchema }, { where: { userId: userId } }),
//         FdetailSchema.update({ ...req.body.FdetailSchema }, { where: { userId: userId} })
//     ];
//     try {
//         const [basicInfo, CommunicationDetails, contactTeam, bankdetail, statutoryDetail, complianceDetail, Fdetail] = await Promise.all(promises);
//         console.log(statutoryDetail)
//         console.log(req.body.StatDetailSchema)
//         console.log(req.body.FdetailSchema)
//         res.status(200).json({
//             status: "success",
//             basicInfo,
//             CommunicationDetails,
//             contactTeam,
//             bankdetail,
//             statutoryDetail,
//             complianceDetail,
//             Fdetail
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: "error",
//             message: "An error occurred while updating the collections",
//         });
//     }
// };

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
const upload = multer({ storage });
exports.updateAllCollection = async (req, res) => {
  var userId = req.params.userId;  
  // Use the upload middleware for the file fields in the request    
  upload.array(['bankdetailDoc', 'GST_Doc', 'PAN_Doc', 'form_10f_Doc', 'PE_Declaration_Doc', 'TAN_Doc', 'Tax_residency_Doc', 'fileDisclosure', 'RPD_Doc', 'COC_Doc', 'NDA_Doc', 'financial_data', 'financial_data2' ], 13)(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while uploading the files",
      });
    }
    let bankdetailDoc = req.files[0] ? req.files[0].path : null;
    let GST_Doc = req.files[1] ? req.files[1].path : null;
    let PAN_Doc = req.files[2] ? req.files[2].path : null;
    let form_10f_Doc = req.files[3] ? req.files[3].path : null;
    let PE_Declaration_Doc = req.files[4] ? req.files[4].path : null;
    let TAN_Doc = req.files[5] ? req.files[5].path : null;
    let Tax_residency_Doc = req.files[6] ? req.files[6].path : null;
    let fileDisclosure = req.files[7] ? req.files[7].path : null;
    let RPD_Doc = req.files[8] ? req.files[8].path : null;
    let COC_Doc = req.files[9] ? req.files[9].path : null;
    let NDA_Doc = req.files[10] ? req.files[10].path : null;
    let financial_data = req.files[11] ? req.files[11].path : null;
    let financial_data2 = req.files[12] ? req.files[12].path : null;

    const promises = [
      VdetailSchema.update({ ...req.body.basicInfo }, { where: { userId: userId } }),
      vendorCommunicationDetails.update({ ...req.body.CommunicationDetails }, { where: { userId: userId } }),
      contactTeamSchema.update({ ...req.body.contactTeamSchema }, { where: { userId: userId } }),
      BankdetailSchema.update({ ...req.body.BankdetailSchema, bankdetailDoc }, { where: { userId: userId } }),
      StatDetailSchema.update({
        ...req.body.StatDetailSchema,GST_Doc,PAN_Doc,form_10f_Doc,PE_Declaration_Doc,TAN_Doc,Tax_residency_Doc,fileDisclosure,
      }, { where: { userId: userId } }),
      CompliancedetailSchema.update({ 
        ...req.body.CompliancedetailSchema,
        RPD_Doc,
        COC_Doc,
        NDA_Doc,
     }, { where: { userId: userId } }),
      FdetailSchema.update({ 
        ...req.body.FdetailSchema,
        financial_data,
        financial_data2, 
    }, { where: { userId: userId } })
    ];
    try {
      const [basicInfo, CommunicationDetails, contactTeam, bankdetail, statutoryDetail, complianceDetail, Fdetail] = await Promise.all(promises);
      res.status(200).json({
        status: "success",
        basicInfo,
        CommunicationDetails,
        contactTeam,
        bankdetail,
        statutoryDetail,
        complianceDetail,
        Fdetail
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "An error occurred while updating the collections",
      });
    }
  });
};
  
  
exports.getvendorDetail = async (req, res) => {
    var userId = req.params.userId;
    VdetailSchema.findOne({
        where: { userId: userId },
    }).then(basicInfo => {
        if (basicInfo) {
            res.status(200).json({ status: "success", message: "basicInfo", country: basicInfo.country });
        }
    }).catch(err => {
        return res.status(200).json({ status: 'error', data: { message: 'Error Response', err } });
    });
}

exports.updateContactTeam = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    // check if there are any empty fields
    for (const key in updates) {
        if (!updates[key]) {
            updates[key] = null;
        }
    }
    const updateResult = await contactTeamSchema.update(req.body, {
        where: { userId }
    });
    if (updateResult[0]) {
        res.status(200).json({
            status: "success",
            message: "Contact Team details updated successfully",
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Contact Team details not found"
        });
    }
};