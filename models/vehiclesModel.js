// Load required packages
var mongoose = require('mongoose')

var VehicleSchema = new mongoose.Schema({
    operationType: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    model: { type: String, required: true },
    serialNumber: { type: String, required: true },
    registerPlace: { type: String },
    State: { type: String },
    acquisitionType: { type: String },
    businessName: { type: String },
    relationship: { type: String },
    acquisitionValue: { type: Number , default: 0 },
    currency: { type: String },
    acquisitionDate: { type: Date },
    owner: { type: String },
    disposalDate: { type: String },
    collision: [{
        collisionType: { type: String },
        insuranceName: { type: String },
        collisionDate: { type: Date },
        operationValue:{ type: Number }
    }],
    userId: { type: String, required: true },
    decId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Vehicles', VehicleSchema);