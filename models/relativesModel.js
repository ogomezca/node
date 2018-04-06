// Load required Packages
var mongoose = require('mongoose');

var RelativesModel = mongoose.Schema({
    names: {type: String, required: true },
    lastName: { type: String, required: true },
    secondLastName: { type: String, required: true },
    relationship: { type: String, required: true },
    curp: { type: String, required: true, max: 18 },
    economicDependent: { type: Boolean , required: true },
    isPublicServer: { type: Boolean, required: true },
    publicEntity:[{
        adscriptionName: {type: String, required: true },
        employment: { type: String, required: true },
        period: { type: String }
    }],
    livesWithDeclarant: { type: Boolean, required: true },
    relativeAddress: [{
        streetName: {type: String },
        extNum: { type: Number },
        intNum: { type: Number },
        suburb: { type: String },
        city: { type: String },
        cp: { type: Number },
        state: { type: String },
        Country: { type: String }
    }],
    userId: { type: String, required: true },
    decId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Relatives', RelativesModel);