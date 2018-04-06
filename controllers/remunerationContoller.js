// Load required packages
var Remuneration = require('../models/remunerationModel');
var Declaration = require('../models/patrimonialDeclarationModel');

/* POST Remunearion Quantity */
exports.postRemuneration = function (req, res) {
    var remuneration = new Remuneration({
        mensualRemuneration: req.body.mensualRemuneration,
        industrialActivity: req.body.industrialActivity,
        financialActivity: req.body.financialActivity,
        professionalServices: req.body.professionalServices,
        others: req.body.others,
        subtotalII: req.body.subtotalII,
        totalRemuneration: req.body.totalRemuneration,
        monthlyIncome: req.body.monthlyIncome,
        relativesMonthlyIncome: req.body.relativesMonthlyIncome,
        totalMonthlyIncome: req.body.totalMonthlyIncome,
        isPublicServer: req.body.isPublicServer,
        period: req.body.period,
        userId: req.body.userId,
        decId: req.body.decId
    });

    remuneration.save().
    then(function (result) {
        console.log(result);
        Declaration.update({_id: req.body.decId },
            {
                $push: { remuneration: result._id }

            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema Declaration", errors: err});

                res.json({rc: "00", result: dec});
            });
        }).catch(function (err) {
        console.log(err);
        res.send({ rc: "99", msg: "Error al registrar los ingresos anuales del declarante.", errors: err });
    });
};

/* GET Remuneration Data filtering by User Id */
exports.getRemuneration = function (req, res) {
    Remuneration.find({ userId: req.params.userId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc: "00", result: data});
    });
};

/* GET Remuneration Data filerring by Declaration ID */
exports.getRemunerationByDecId = function (req, res) {
  Remuneration.find({ decId: req.params.decId }, function (err, data) {
      if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

      res.json({rc: "00", result: data});
  });
};

/* GET Remuneration Data filtering by Remuneration ID */
exports.getRemunerationById = function (req, res) {
    Remuneration.find({ _id: req.params.id }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc: "00", result: data});
    });
};

/* UPDATE Vehicles from existing user filtering by _ID row */
exports.putRemuneration = function (req, res) {
    // Use the Vehicle model to find the specific data by ID
    Remuneration.update({ _id: req.params.userId },
        {
            mensualRemuneration: req.body.mensualRemuneration,
            industrialActivity: req.body.industrialActivity,
            financialActivity: req.body.financialActivity,
            professionalServices: req.body.professionalServices,
            others: req.body.others,
            subtotalII: req.body.subtotalII,
            totalRemuneration: req.body.totalRemuneration,
            monthlyIncome: req.body.monthlyIncome,
            relativesMonthlyIncome: req.body.relativesMonthlyIncome,
            totalMonthlyIncome: req.body.totalMonthlyIncome,
            isPublicServer: req.body.isPublicServer,
            period: req.body.period,
            userId: req.body.userId,
            modifiedAt: Date.now()
        },
        function (err, data) {
            if (err)
                res.send({ rc: "99", errors: err, msg: "Error al actualizar el registro."});

            res.json({rc: "00", result: data});
        });
};