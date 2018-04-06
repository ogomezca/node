// Load required Model
var InterestConflict = require('../models/interestConflictModel');
var Declaration = require('../models/patrimonialDeclarationModel');

/* POST interestConflict */
exports.postInterestConflict = function (req, res) {
    var interestConflict = new InterestConflict({

        operationType: req.body.operationType,
        companyName: req.body.companyName,
        anualFrecuency: req.body.anualFrecuency,
        legalPerson: req.body.legalPerson,
        responsable: req.body.responsable,
        relationship: req.body.relationship,
        ageOfRelationship: req.body.ageOfRelationship,
        participation: req.body.participation,
        colaborationType: req.body.colaborationType,
        city: req.body.city,
        state: req.body.state,
        country: req.body.Country,
        economicParticipation: req.body.economicParticipation,
        aclarations: req.body.aclarations,
        userId: req.body.userId,
        decId: req.body.decId

    });

    interestConflict.save().
    then(function (result) {

        Declaration.update({_id: req.body.decId },
            {
                $push: { interestConflict: result._id }
            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema interestConflict", errors: err});

                res.json({rc: "00", result: dec});
            });
    }).catch(function (err) {

        res.send({rc: "99", msg: "Error al registrar el posible conflicto de interes: " +  req.body.responsable + ", " + req.body.relationship, errors: err});

    });
};

/* GET InterestConflict related to a user, filtering by UserId */
exports.getInterestConflict = function (req, res) {
    InterestConflict.find({ userId: req.params.userId }, function (err, data) {
        if(err) res.send({rc:"99", interestConflict: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", interestConflict: data});
    });
};

/* GET InterestConflict from existing user, filtering by Declaration ID */
exports.getInterestConflictByDecId = function (req, res) {
    InterestConflict.find({ decId: req.params.decId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de posibles conflicto de interes."});

        res.json({rc: "00", conflictoInteres: data});
    });
};

/* GET InterestConflict from existing user, filtering by InterestConflict ID */
exports.getInterestConflictById = function (req, res) {
    InterestConflict.findOne({ _id: req.params.id }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener de posible conflicto de interes."});

        res.json({rc: "00", conflictoInteres: data});
    })
};

/* Update an existing InterestConflict, related to an existing user and filtering by UserID*/
exports.putInterestConflict = function (req, res) {
    InterestConflict.update({userId: req.params.userId},
        {
            operationType: req.body.operationType,
            companyName: req.body.companyName,
            anualFrecuency: req.body.anualFrecuency,
            legalPerson: req.body.legalPerson,
            responsable: req.body.responsable,
            relationship: req.body.relationship,
            ageOfRelationship: req.body.ageOfRelationship,
            participation: req.body.participation,
            colaborationType: req.body.colaborationType,
            city: req.body.city,
            state: req.body.state,
            country: req.body.Country,
            aclarations: req.body.aclarations,
            economicParticipation: req.body.economicParticipation,
            modifiedAt: Date.now()

        }, function (err, data) {
            if(err)
                res.send({rc: "99", errors: err, msg: "Error al modificar los datos curriculares."});

            res.json({rc: "00", result: data});
        });
};

/* DELETES all InterestConflict related to user by userID, CAUTION... if you want to delete a record,insted of using this
*  method please use the pull method, but if you are pretty sure as fuck that you wants to delete all the fucking record
*  just do it :)
* */
exports.deleteInterestConflict = function (req, res) {
    InterestConflict.remove({userId: req.params.userId}, function (err) {
        if(err) res.send({rc:"99", msg: "Error al intentar borrar el InterestConflict.", error: err});

        res.json({rc:"00", msg: "InterestConflict, borrado correctamente."});

    });
};