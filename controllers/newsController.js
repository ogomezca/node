var News = require('../models/newsModel');

/* This method gets all news from WebPadron Admin related to an specfic Adscription... bye*/
exports.getNews = function (req, res) {
    News.find({adscription: req.body.adscription}, function (err, news){
        if(err) res.send({ rc:"99", errors: err, msg:"Error al obtener las noticias del usuario."});

        res.json({rc: "00", result: news});
    });
};