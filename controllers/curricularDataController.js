// Load required Model
var CurricularData = require('../models/curricularDataModel');

/* POST curricular Data */
exports.postCurricularData = function (req, res) {
    var curricularData = new CurricularData({
        scholarship: req.body.scholarship,
        userId: req.body.userId
    });

    curricularData.save(function (err) {
        if(err) res.send({rc:"99", msg: "Error al guardar el dato curricular.", errors: err});

        res.json({rc:"00", msg: "Dato curricular almacenado correctamente."});
    });
};

/* PUSH new curricular data to existing user, filtering by userId*/
exports.pushCurricularData = function (req, res){
    CurricularData.update({userId: req.body.userId},
        {
            $push : { scholarship: req.body.scholarship },
            modifiedAt: Date.now,
            modifierId: req.body.userId
        }, function (err, data){
            if(err) res.send({rc:"99", errors: err, msg: "Error al intentar agregar la información."});

            res.json({rc:"00", curricularData: data});
        });
};

/*  Remove existing curricular data related to user, filtering by userId  */
exports.pullCurricularData = function (req, res) {
    CurricularData.update({ userId: req.body.userId },
        {
            $pull: { scholarship: { _id: req.body.scholarshipId }}
        }, function (err, scholarship) {
            if(err)res.send({rc:"99", errors: err, msg: "Error al intentar borrar la información."});

            res.json({rc:"00", result: scholarship });

        });
};

/* GET Curricular data related to a user, filtering by UserId */
exports.getCurricularData = function (req, res) {
    CurricularData.find({ userId: req.params.userId }, function (err, data) {
        if(err) res.send({rc:"99", curricularData: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", curricularData: data});
    });
};

/* Update an existing curricular data, related to an existing user and filtering by UserID*/
exports.putCurricularData = function (req, res) {
    CurricularData.update({userId: req.params.userId},
        {
            $set: { scholarship : req.body.scholarship },
            modifierId: req.body.modifierId,
            modifiedAt: Date.now()
        }, function (err, data) {
        if(err)
            res.send({rc: "99", errors: err, msg: "Error al modificar los datos curriculares."});

        res.json({rc: "00", result: data});
    });
};

/* DELETES all curricular data related to user by userID, CAUTION... if you want to delete a record,insted of using this
*  method please use the pull method, but if you are pretty sure as fuck that you wants to delete all the fucking record
*  just do it :)
* */
exports.deleteCurricularData = function (req, res) {
    CurricularData.remove({userId: req.params.userId}, function (err) {
        if(err) res.send({rc:"99", msg: "Error al intentar de borrar un dato curricular.", error: err});

        res.json({rc:"00", msg: "Dato curricular, borrado correctamente."});

    });
};