// Load required packages
var mongoose = require('mongoose');

var InterestConflictSchema = new mongoose.Schema({
    isAgreeToPublish: { type: Boolean, default: false },
    operationType: { type: String, required: true },
    companyName: { type: String, required: true },
    anualFrecuency: { type: String },
    legalPerson: { type: String, required: true },
    responsable: { type: String, required: true },
    relationship: { type: String, required: true },
    ageOfRelationship: { type: String },
    participation: { type: String },
    colaborationType: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    economicParticipation:[{
        operationType: { type: String, required: true },
        companyName: { type: String, required: true },
        publicID: { type: String, required: true },
        societyType: { type: String, required: true },
        participationAge: { type: Number },
        conflictResponsable: { type: String },
        societyCreatedAt: { type: Date },
        societyCity: { type: String },
        societyState: { type: String },
        societyCountry: { type: String },
        sector: { type: String },
        participationType: { type: String },
        contractStartedAt: { type: String },
        aclarations: { type: String }
    }],
    aclarations: { type: String },
    userId: { type: String, required: true },
    decId : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Interest-Conflict', InterestConflictSchema);

