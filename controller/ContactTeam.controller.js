
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
    await VdetailSchema.findOne({
        where: { userId: userId },
    }).then(async basicInfo => {
        if (basicInfo === null) {
            basicInfoArray.push("All details filled");
        }
        else {
            basicInfoArray.push(basicInfo);
        }
        await vendorCommunicationDetails.findOne({
            where: { userId: userId },
        }).then(async CommunicationDetails => {
            if (CommunicationDetails === null) {
                CommunicationDetailsArray.push("All details filled");
            }
            else {
                CommunicationDetailsArray.push(CommunicationDetails);
            }
            await StatDetailSchema.findOne({
                where: { userId: userId },
            }).then(async StatDetail => {
                if (StatDetail === null) {
                    StatDetailArray.push("All details filled");
                }
                else {
                    StatDetailArray.push(StatDetail);
                }

                await CompliancedetailSchema.findOne({
                    where: { userId: userId },
                }).then(async Compliancedetail => {
                    if (Compliancedetail === null) {
                        CompliancedetailArray.push("All details filled");
                    }
                    else {
                        CompliancedetailArray.push(Compliancedetail);
                    }

                    await FdetailSchema.findOne({
                        where: { userId: userId },
                    }).then(async Fdetail => {
                        if (Fdetail === null) {
                            FdetailArray.push("All details filled");
                        }
                        else {
                            FdetailArray.push(Fdetail);
                        }

                        await BankdetailSchema.findOne({
                            where: { userId: userId },
                        }).then(async Bankdetail => {
                            if (Bankdetail === null) {
                                bankdetailArray.push("All details filled");
                            }
                            else {
                                bankdetailArray.push(Bankdetail);
                            }

                        })
                    })
                })
            })
        })
    })

    res.status(200).json({ status: "success", basicInfo: basicInfoArray, CommunicationDetails: CommunicationDetailsArray, Statutory: StatDetailArray, ComplianceDetail: CompliancedetailArray, FinancialDetail: FdetailArray, Bankdetail: bankdetailArray });
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

//update all 
exports.updateAllCollection = async (req, res) => {
    var userId = req.params.userId;
    const promises = [
        VdetailSchema.update({ ...req.body.basicInfo }, { where: { userId: userId } }),
        vendorCommunicationDetails.update({ ...req.body.CommunicationDetails }, { where: { userId: userId } }),
    ];
    try {
        const [basicInfo, CommunicationDetails] = await Promise.all(promises);
        console.log(basicInfo)
        res.status(200).json({
            status: "success",
            basicInfo,
            CommunicationDetails,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while updating the collections",
        });
    }
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