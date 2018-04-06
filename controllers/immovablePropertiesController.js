var ImmovableProperties = require('../models/immovablePropertiesModel');
var Declaration = require('../models/patrimonialDeclarationModel');

/* POST ImmovableProperties */
exports.postImmovableProperties = function (req, res) {
    var immovableProperties = new ImmovableProperties({

        operationType: req.body.operationType,
        propertyType: req.body.propertyType,
        actionType: req.body.actionType,
        acquisitionType: req.body.acquisitionType,
        sellerName: req.body.sellerName,
        relationShipWithDeclarant: req.body.relationShipWithDeclarant,
        relationShipWithRelatives: req.body.relationShipWithRelatives,
        immavobablePrice: req.body.immavobablePrice,
        currency: req.body.currency,
        acquisitionDate: req.body.acquisitionDate,
        catastroNumber: req.body.catastroNumber,
        owner: req.body.owner,
        immavobableAddress: req.body.immavobableAddress,
        civilWork: req.body.civilWork,
        disposals: req.body.disposals,
        userId: req.body.userId,
        decId: req.body.decId

    });

    immovableProperties.save().
    then(function (result) {

        Declaration.update({_id: req.body.decId },
            {
                $push: { immovableProperty: result._id }
            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema immovableProperties", errors: err});

                res.json({rc: "00", result: dec});
            });
    }).catch(function (err) {

        res.send({rc: "99", msg: "Error al registrar el inmueble: " +req.body.propertyType , errors: err});

    });
};

/* GET ImmovableProperties related to a user, filtering by UserId */
exports.getImmovableProperties = function (req, res) {
    ImmovableProperties.find({ userId: req.params.userId }, function (err, data) {
        if(err) res.send({rc:"99", immovableProperties: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", immovableProperties: data});
    });
};

/* GET ImmovableProperties from existing user, filtering by Declaration ID */
exports.getImmovablePropertiesByDecId = function (req, res) {
    ImmovableProperties.find({ decId: req.params.decId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de inmuebles."});

        res.json({rc: "00", inmuebles: data});
    });
};

/* GET ImmovableProperties from existing user, filtering by ImmovableProperties ID */
exports.getImmovablePropertiesById = function (req, res) {
    ImmovableProperties.findOne({ _id: req.params.id }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el inmueble."});

        res.json({rc: "00", inmuebles: data});
    })
};


/* Update an existing ImmovableProperties, related to an existing user and filtering by UserID*/
exports.putImmovableProperties = function (req, res) {
    ImmovableProperties.update({userId: req.params.userId},
        {
            operationType: req.body.operationType,
            propertyType: req.body.propertyType,
            actionType: req.body.actionType,
            acquisitionType: req.body.acquisitionType,
            sellerName: req.body.sellerName,
            relationShipWithDeclarant: req.body.relationShipWithDeclarant,
            relationShipWithRelatives: req.body.relationShipWithRelatives,
            immavobablePrice: req.body.immavobablePrice,
            currency: req.body.currency,
            acquisitionDate: req.body.acquisitionDate,
            catastroNumber: req.body.catastroNumber,
            owner: req.body.owner,
            immavobableAddress: req.body.immavobableAddress,
            civilWork: req.body.civilWork,
            disposals: req.body.disposals,
            modifiedAt: Date.now()

        }, function (err, data) {
            if(err)
                res.send({rc: "99", errors: err, msg: "Error al modificar el ImmovableProperties."});

            res.json({rc: "00", result: data});
        });
};

/* DELETES ImmovableProperties related to user by userID*/
exports.deleteImmovableProperties = function (req, res) {
    ImmovableProperties.remove({userId: req.params.userId}, function (err) {
        if(err) res.send({rc:"99", msg: "Error al intentar borrar el ImmovableProperties.", error: err});

        res.json({rc:"00", msg: "ImmovableProperties, borrado correctamente."});

    });
};
