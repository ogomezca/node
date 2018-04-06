// Load required Packages
var mongoose = require('mongoose');

var ImmavobableProperty = mongoose.Schema({
    operationType: { type: String, required: true },
    propertyType: { type: String },
    actionType: String,
    isUndivided: Boolean,
    surface: [{
        terrainSize: { type: Number },
        constructionSize: { type: Number }
    }],
    acquisitionType: { type: String, required: true },
    sellerName: { type: String, required: true },
    relationShipWithDeclarant: { type: String, required: true },
    relationShipWithRelatives: [{
        relativeName: { type: String },
        relativeRelationShip: { type: String }
    }],
    immavobablePrice: { type: Number },
    currency: { type: String, required: true },
    acquisitionDate: { type: Date, required: true },
    catastroNumber: { type: String, required: true },
    owner: { type: String, required: true },
    immavobableAddress: [{
        streetName: { type: String },
        extNum: { type: String },
        intNum: { type: String } ,
        suburb: { type: String },
        city: { type: String },
        cp: { type: String },
        country: { type: String }
    }],
    civilWork: [{
        investment: { type: String },
        workDate: { type: Date },
        period: { type: String }
    }],
    disposals: [{
        operationType: { type: String },
        disposalPrice: { type: String },
        disposalDate: { type: Date }
    }],
    userId: { type: String, required: true },
    decId : { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Immamovable-Properties', ImmavobableProperty);