var mongoose = require('mongoose');

var WorkExperience = new mongoose.Schema({
    info: [{
        sector: {type: String, required: true },
        sway: { type: String, required: true },
        field: { type: String, required: true },
        institutionName: { type: String , required: true, trim: true },
        adscription: { type: String, required: true,trim: true },
        employment: { type: String, required: true, trim: true},
        startDate: { type: Date },
        finalDate: { type: Date }
    }],
    createdAt: {type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    userId: { type: String },
    modifierId: { type: String },
    decId: { type: String }
});

module.exports =  mongoose.model('Work-Experience', WorkExperience);