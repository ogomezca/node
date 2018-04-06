// Load required packages
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var WorkExperience = require('./workExperienceModel');
var Relatives = require('./relativesModel');
var ImmamovableProperty = require('./immovablePropertiesModel');
var Remuneration = require('./remunerationModel');
var Vehicles = require('./vehiclesModel');
var Investment = require('./investmentsModel');
var Debt = require('./debtModel');
var InterestConflict = require('./interestConflictModel');

var PatrimonialSchema = Schema({
    folio: { type: String, required: true, unique: true },
    declarationType: {type: String, requied: true },
    period: { type: String, required: true, max:4 },
    publicVersionTransfer: { type: Boolean, required: true },
    publicVersionPublish: { type: Boolean, required: true },
    workExperience: [{ type: Schema.Types.ObjectId, ref: 'WorkExperience' }],
    relativesInfo: [{ type: Schema.Types.ObjectId, ref: 'Relatives' }],
    employmentData: [{
        principalFunctions: { type: String }
    }],
    immovableProperty: [{ type: Schema.Types.ObjectId, ref: 'ImmamovableProperty'}],
    remuneration: [{ type: Schema.Types.ObjectId, ref: 'Remuneration'}],
    vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicles'}],
    investments:[ { type: Schema.Types.ObjectId, ref: 'Investment' }],
    debts: [{ type: Schema.Types.ObjectId, ref: 'Debt'}],
    interestConflict: [{ type: Schema.Types.ObjectId, ref: 'InterestConflict'}],
    aclarations: { type: String },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }

});

module.exports =  mongoose.model('Patrimonial-Declaration', PatrimonialSchema);