var Investment = require('../models/investmentsModel');
var Declaration = require('../models/patrimonialDeclarationModel');


/* POST Investment */
exports.postInvestment = function (req, res) {
    var investment = new Investment({
        operationType: req.body.operationType,
        investmentType: req.body.investmentType,
        accountNumber: req.body.accountNumber,
        investmentCountry: req.body.investmentCountry,
        businessName: req.body.businessName,
        balance: req.body.balance,
        currency: req.body.currency,
        owner: req.body.owner,
        disposalName: req.body.disposalName,
        userId: req.body.userId,
        decId: req.body.decId
    });

    investment.save().
    then(function (result) {

        Declaration.update({_id: req.body.decId },
            {
                $push: { investments: result._id }
            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema investment", errors: err});

                res.json({rc: "00", result: dec});
            });
    }).catch(function (err) {

        res.send({rc: "99", msg: "Error al registrar la inversion: " +  req.body.investmentType, errors: err});

    });
};

/* GET investment related to a user, filtering by UserId */
exports.getInvestment = function (req, res) {
    Investment.find({ userId: req.params.userId }, function (err, data) {
        if(err) res.send({rc:"99", debt: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", Debt: data});
    });
};

/* GET investment from existing user, filtering by Declaration ID */
exports.getInvestmentByDecId = function (req, res) {
    Investment.find({ decId: req.params.decId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de inversiones."});

        res.json({rc: "00", inversiones: data});
    });
};

/* GET investment from existing user, filtering by investment ID */
exports.getInvestmentById = function (req, res) {
    Investment.findOne({ _id: req.params.id }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener la inversion."});

        res.json({rc: "00", inversiones: data});
    })
};

/* Update an existing Investment, related to an existing user and filtering by UserID*/
exports.putInvestment = function (req, res) {
    Investment.update({userId: req.params.userId},
        {
            operationType: req.body.operationType,
            investmentType: req.body.investmentType,
            accountNumber: req.body.accountNumber,
            investmentCountry: req.body.investmentCountry,
            businessName: req.body.businessName,
            balance: req.body.balance,
            currency: req.body.currency,
            owner: req.body.owner,
            disposalName: req.body.disposalName,
            modifiedAt: Date.now()

        }, function (err, data) {
            if(err)
                res.send({rc: "99", errors: err, msg: "Error al modificar el Investment."});

            res.json({rc: "00", result: data});
        });
};

/* DELETES Investment related to user by userID*/
exports.deleteInvestment = function (req, res) {
    Investment.remove({userId: req.params.userId}, function (err) {
        if(err) res.send({rc:"99", msg: "Error al intentar borrar un debt.", error: err});

        res.json({rc:"00", msg: "Investment, borrado correctamente."});

    });
};