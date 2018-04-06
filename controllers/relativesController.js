// Load required packages
var Relatives = require('../models/relativesModel');
var Declaration = require('../models/patrimonialDeclarationModel');


/* POST Relatives information */
exports.postRelatives = function (req, res) {
    var relatives = new Relatives({
        names: req.body.names,
        lastName: req.body.lastName,
        secondLastName: req.body.secondLastName,
        relationship: req.body.relationship,
        curp: req.body.curp,
        economicDependent: req.body.economicDependent,
        isPublicServer: req.body.isPublicServer,
        publicEntity: req.body.publicEntity,
        livesWithDeclarant: req.body.livesWithDeclarant,
        relativeAddress: req.body.relativeAddress,
        userId: req.body.userId,
        decId: req.body.decId
    });

    relatives.save()
        .then(function (result) {
            console.log(result);
            Declaration.update({_id: req.body.decId},
                {
                    $push: {relativesInfo: result._id}

                }, function (err, dec) {
                    if (err)
                        res.send({rc: "99", msg: "Error al registrar el ID: " + result._id + " en el schema Declaration", errors: err});

                    res.json({rc: "00", result: dec});
                });
        }).catch(function (err) {
            console.log(err);
            res.send({ rc: "99", msg: "Error al registrar los datos.", errors: err });
    });
};

/* GET Relatives Data filtering by User Id */
exports.getRelatives = function (req, res) {
    Relatives.find({userId: req.params.userId}, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc: "00", result: data});
    });
};

/* GET Relatives Data filtering by Declaration ID */
exports.getRelativesByDecId = function (req, res) {
    Relatives.find({decId: req.params.decId}, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc: "00", result: data});
    });
};

/* GET Relatives Data, filtering by id*/
exports.getRelativesById = function (req, res) {
    Relatives.find({_id: req.params.id}, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc: "00", result: data});
    });
};



/* UPDATE Relatives informatio from existing user filtering by _ID row */
exports.putRelatives = function (req, res) {
    // Use the Vehicle model to find the specific data by ID
    Relatives.update({_id: req.params.userId},
        {
            names: req.body.names,
            lastName: req.body.lastName,
            secondLastName: req.body.secondLastName,
            relationship: req.body.relationship,
            curp: req.body.curp,
            economicDependent: req.body.economicDependent,
            isPublicServer: req.body.isPublicServer,
            publicEntity: req.body.publicEntity,
            livesWithDeclarant: req.body.livesWithDeclarant,
            relativeAddress: req.body.relativeAddress,
            userId: req.body.userId,
            modifiedAt: Date.now()
        },
        function (err, data) {
            if (err)
                res.send({rc: "99", errors: err, msg: "Error al actualizar el registro."});

            res.json({rc: "00", result: data});
        });
};