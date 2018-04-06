// Load required packages
var Declaration = require('../models/patrimonialDeclarationModel');

/* POST Patrimonial Declaration information */
exports.postDeclaration = function (req, res) {
    var date = new Date();
    folioCode = date.getUTCFullYear()+date.getUTCMonth()+date.getUTCDay()+'/'+ uid(8);
    var declaration = new Declaration({
        folio: folioCode,
        declarationType: req.body.declarationType,
        period: req.body.period,
        publicVersionTransfer: req.body.publicVersionTransfer,
        publicVersionPublish: req.body.publicVersionPublish,
        workExperience: req.body.workExperience,
        relativesInfo: req.body.relativesInfo,
        employmentData: req.body.employmentData,
        immovableProperty: req.body.immovableProperty,
        remuneration: req.body.remuneration,
        vehicles: req.body.vehicles,
        investments: req.body.investments,
        debts: req.body.debts,
        interestConflict: req.body.interestConflict,
        aclarations: req.body.aclarations,
        userId: req.body.userId
    });

    declaration.save(function (err, data ) {
        if (err)
            res.send({ rc: "99", msg: "Error al registrar la declarción patrimonial.", errors: err });

        res.json({rc: "00", msg: "Se registro satisfactoriamente la información. ", folio: folioCode, data: data });
    });
};

/* GET Declarations Data filtering by Declaration Id */
exports.getDeclaration = function (req, res) {
    Declaration.findOne({ _id: req.params.decId, isDeleted: false })
        .populate('WorkExperience')
        .populate('Relatives')
        .populate('ImmamovableProperty')
        .populate('Remuneration')
        .populate('Vehicles')
        .populate('Investment')
        .populate('Debt')
        .populate('InterestConflict')
        .exec( function (err, dec ) {
            if (err)
            res.send({rc: "99",msg: "Declaración no encontrada",errors: err});
            else if(dec==null)
                res.send({rc: "99",msg: "El folio de la declaración es inexistente"});
            else
                res.send({rc: "00",report: dec, msg: "Declaración encontrada."});
        });
};

/* DELETE Declaration, this only changes the isDelated state to true */
exports.deleteDeclaration =function(req, res) {
    Declaration.findOne({_id: req.params.id}, function(err, declaration) {
        if (err)
            res.send({rc: "99",msg: "Declaración no encontrada",errors: err});

        declaration.isDeleted=true;
        declaration.modifiedAt=Date.now();
        declaration.save(function(err) {
            if (err)
                res.send({rc: "99",errors: err,msg: "Error al borrar la declaración"});

            res.json({rc: "00",report: declaration,msg: "Declaración borrada satisfactoriamente."});
        });
    });
};

function uid (len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function numericCode (len) {
    var buf = []
        , chars = '0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}