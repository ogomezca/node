var Debt = require('../models/debtModel');
var Declaration = require('../models/patrimonialDeclarationModel');


/* POST debt */
exports.postDebt = function (req, res) {
    var debt = new Debt({
        operationType: req.body.operationType,
        debtType: req.body.debtType,
        accountNumber: req.body.accountNumber,
        country: req.body.country,
        institution: req.body.institution,
        grantDate: req.body.grantDate,
        debtAmount: req.body.debtAmount,
        currency: req.body.currency,
        debtTerm: req.body.debtTerm,
        owner: req.body.owner,
        userId: req.body.userId,
        decId: req.body.decId
    });

    debt.save().
    then(function (result) {

        Declaration.update({_id: req.body.decId },
            {
                $push: { debts: result._id }
            }, function (err, dec) {
                if(err)
                    res.send({rc: "99", msg: "Error al registrar el ID: "+result._id +" en el schema Debt", errors: err});

                res.json({rc: "00", result: dec});
            });
    }).catch(function (err) {

        res.send({rc: "99", msg: "Error al registrar la deuda: " + req.body.debtType , errors: err});

    });
};

/* GET debt related to a user, filtering by UserId */
exports.getDebt = function (req, res) {
    Debt.find({ userId: req.params.userId }, function (err, data) {
        if(err) res.send({rc:"99", debt: '', errors: err, msg: "Error al intentar obtener la información."});

        res.json({rc:"00", Debt: data});
    });
};

/* GET Debts from existing user, filtering by Declaration ID */
exports.getDebtByDecId = function (req, res) {
    Debt.find({ decId: req.params.decId }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el listado de adeudos."});

        res.json({rc: "00", adeudo: data});
    });
};

/* GET Debts from existing user, filtering by Debt ID */
exports.getDebtById = function (req, res) {
    Debt.findOne({ _id: req.params.id }, function (err, data) {
        if (err) res.send({rc: "99", errors: err, msg: "Error al intentar obtener el adeudo."});

        res.json({rc: "00", adeudo: data});
    })
};

/* Update an existing Debt, related to an existing user and filtering by UserID*/
exports.putDebt = function (req, res) {
    Debt.update({userId: req.params.userId},
        {
            operationType: req.body.operationType,
            debtType: req.body.debtType,
            accountNumber: req.body.accountNumber,
            country: req.body.country,
            institution: req.body.institution,
            grantDate: req.body.grantDate,
            debtAmount: req.body.debtAmount,
            currency: req.body.currency,
            debtTerm: req.body.debtTerm,
            owner: req.body.owner,
            modifiedAt: Date.now()

        }, function (err, data) {
            if(err)
                res.send({rc: "99", errors: err, msg: "Error al modificar el Debt."});

            res.json({rc: "00", result: data});
        });
};

/* DELETES all curricular data related to user by userID, CAUTION... if you want to delete a record,insted of using this
*  method please use the pull method, but if you are pretty sure as fuck that you wants to delete all the fucking record
*  just do it :)
* */
exports.deleteDebt = function (req, res) {
    Debt.remove({userId: req.params.userId}, function (err) {
        if(err) res.send({rc:"99", msg: "Error al intentar borrar un debt.", error: err});

        res.json({rc:"00", msg: "Debt, borrado correctamente."});

    });
};