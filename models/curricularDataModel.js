// Load required packages
var mongoose = require('mongoose');

var CurricularData =  new mongoose.Schema({
    scholarship :[{
        levelType: { type: String, required: true},
        schoolName: { type:String, required: true },
        schoolCountry: { type: String },
        status: { type: String, required: true },
        schoolCycle: { type: String, required: true },
        degree: { type: String, required: true },
        schoolState: { type: String },
        schoolCity: { type: String },
        careerArea: { type: String },
        idNumber: { type: String }
    }],
    createdAt: {type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    userId: { type: String },
    modifierId: { type: String }
});

// Export the mongoose model
module.exports = mongoose.model('Curricular-Data', CurricularData);