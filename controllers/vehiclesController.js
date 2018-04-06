// Load required packages
var Vehicles = require('../models/vehiclesModel');
const Declaration = require('../models/patrimonialDeclarationModel');

/* POST Vehicles */
exports.postVehicle = function (req, res) {
    var vehicles = new Vehicles({
        operationType: req.body.operationType,
        brand: req.body.brand,
        type: req.body.type,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        registerPlace: req.body.registerPlace,
        State: req.body.State,
        acquisitionType: req.body.acquisitionType,
        businessName: req.body.businessName,
        relationship: req.body.relationship,
        acquisitionValue: req.body.acquisitionValue,
        currency: req.body.currency,
        acquisitionDate: req.body.acquisitionDate,
        owner: req.body.owner,
        disposalDate: req.body.disposalDate,
        collision: req.body.collision,
        userId: req.body.userId,
        decId : req.body.decId
    });

    vehicles.save().
    then(function (result) {
        console.log(result);
        Declaration.update({_id: req.body.decId },
            {
                $push: { vehicles: result._id }

            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema Declaration", errors: err});

                res.json({rc: "00", result: dec});
            });
    }).catch(function (err) {
        console.log(err);
        res.send({rc: "99", msg: "Error al registrar el vehículo.: " + req.body.brand + ", " + req.body.model, errors: err});

    });
};

/* GET Vehicles from existing user, filtering by UserId */
exports.getVehicles = function (req, res) {
    Vehicles.find({ userId: req.params.userId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de vehiculos."});

        res.json({rc: "00", vehicles: data});
    });
};

/* GET Vehicles from existing user, filtering by Declaration ID */
exports.getVehicleByDecId = function (req, res) {
  Vehicles.find({ decId: req.params.decId }, function (err, data) {
      if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de vehiculos."});

      res.json({rc: "00", vehicles: data});
  });
};

/* GET Vehicles from existing user, filtering by Vehicle ID */
exports.getVehicleById = function (req, res) {
  Vehicles.findOne({ _id: req.params.id }, function (err, data) {
      if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de vehiculos."});

      res.json({rc: "00", vehicles: data});
  })
};

/* UPDATE Vehicles from existing user filtering by _ID row */
exports.putVehicles = function (req, res) {
    // Use the Vehicle model to find the specific data by ID
    Vehicles.update({ _id: req.params.userId },
        {
            operationType: req.body.operationType,
            brand: req.body.brand,
            type: req.body.type,
            model: req.body.model,
            serialNumber: req.body.serialNumber,
            registerPlace: req.body.registerPlace,
            State: req.body.State,
            acquisitionType: req.body.acquisitionType,
            businessName: req.body.businessName,
            relationship: req.body.relationship,
            acquisitionValue: req.body.acquisitionValue,
            currency: req.body.currency,
            acquisitionDate: req.body.acquisitionDate,
            owner: req.body.owner,
            disposalDate: req.body.disposalDate,
            collision: req.body.collision,
            modifiedAt: Date.now()
        },
        function (err, vehicle) {
            if (err)
                res.send({ rc: "99", errors: err, msg: "Error al actualizar el registro."});

            res.json({rc: "00", result: vehicle});
        });
};