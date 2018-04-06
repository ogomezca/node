// Load required packages
var mongoose = require('mongoose');

var DebtSchema = new mongoose.Schema({
    operationType: { type: String, required: true },
    debtType: { type: String, required: true },
    accountNumber: { type: String , required: true },
    country: { type: String, required: true },
    institution: { type:String },
    grantDate: { type: Date },
    debtAmount: { type: Number },
    currency: { type: String },
    debtTerm: { type: String },
    owner: { type: String },
    userId: { type: String, required: true },
    decId : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Debt', DebtSchema);