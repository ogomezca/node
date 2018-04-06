// Load required model
var WorkExperience = require ('../models/workExperienceModel');

/* POST work experience information to MongoDB */
exports.postWorkExperience = function (req, res) {
    var workExperience = new WorkExperience({
        info : req.body.info,
        userId: req.body.userId,
        decId: req.body.decId
    });

    workExperience.save(function (err) {
        if (err) res.send({rc: "99", msg: "Error al guardar la experiencia laboral.", errors: err});

        res.json({rc: "00", msg: "Se registro satisfactoriamente la experiencia laboral. "});
    });
};

/*PUSH work experience information to an existing user, filtering by userId*/
exports.pushWorkExperience = function (req, res){
    WorkExperience.update({userId: req.body.userId},
        {
            $push : { info: req.body.info },

            modifiedAt: Date.now,
            modifierId: req.body.userId
        }, function (err, data){
            if(err) res.send({rc:"99", workExperience: '', errors: err, msg: "Error al intentar obtener la información."});

            res.json({rc:"00", workExperience: data});
        });
};

/*  PULL (remove) existing workexperience related to user, filtering by userId */
exports.pullWorkExperience = function (req, res) {
    WorkExperience.update({ userId: req.body.userId },
        {
            $pull: { info: { _id: req.body.infoId }}

        }, function (err, workExperience) {
            if(err)res.send({rc:"99", errors: err, msg: "Error al intentar borrar la información."});

            res.json({rc:"00", result: workExperience });

        });
};

/* Gets all work experience by user ID */
exports.getWorkExperienceById = function (req, res) {
    WorkExperience.find({userId: req.params.userId}, function (err, data) {
        if(err) res.send({rc:"99", workExperience: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", workExperience: data});
    });
};

/* Update work Experience by id  */
exports.updateWorkExperience = function (req, res){
    WorkExperience.update({ _id: req.prams.id }, {
        $set: { info: req.body.info },
        modifiedAt: Date.now(),
        modifierId: req.body.modifierId
    }, function (err, data){
        if(err)
            res.send({rc: "99", errors: err, msg: "Error al modificar los datos de experiencia laboral."});

        res.json({rc: "00", result: data});
    });
};

/* Delete work Experience from user by id */
exports.deleteWorkExperience = function (req, res){
    WorkExperience.remove({ userId: req.params.userId }, function (err){
        if(err) res.send({rc:"99", msg: "Error al intentar borrar.", error: err});

        res.json({rc:"00", msg: "Dato de experiencia laboral, borrado correctamente."});
    });
};