// Load required Packages
var mongoose = require('mongoose');

var InvestmentSchema = new mongoose.Schema({
    operationType: { type: String, required: true },
    investmentType: { type: String, required: true },
    accountNumber: { type: String , required: true},
    investmentCountry: { type: String },
    businessName: { type: String },
    balance: { type: Number },
    currency: { type: String },
    owner: { type: String },
    disposalName: { type: String },
    userId: { type: String, required: true },
    decId : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Investment', InvestmentSchema);