// Load required Packages
var mongoose = require('mongoose');

var RemunerationSchema = mongoose.Schema({
        mensualRemuneration: {type: Number, required:true, default:0 },
    industrialActivity:[{
        socialReason: { type: String },
        business: { type: String },
        quantity: { type: Number, default: 0 }
    }],
    financialActivity: { type: Number, default: 0 },
    professionalServices: [{
        serviceType: { type: String },
        contractor: { type: String },
        quantity: { type: Number }
    }],
    others: [{
        type: {type: String},
        quantity: { type: Number }
    }],
    subtotalII: { type: Number, default:0 }, // Subtotal II is the sum of industrialActivity+financialActivity+professionalServices+Others
    totalRemuneration: { type: Number, default: 0}, //Total Remuneration is the sum of mensualRemuneration + subtotalII
    monthlyIncome: { type: Number, default: 0 },
    relativesMonthlyIncome: [{
        relativeType: { type: String },
        quantity: { type: Number, default: 0}
    }],
    totalMonthlyIncome: { type: Number, default: 0 },// This quantity is related to the sum between monthly income and relatives monthly income
    isPublicServer: { type: Boolean },
    period: { type: Date },
    userId: { type: String, required: true },
    decId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Remuneration', RemunerationSchema);