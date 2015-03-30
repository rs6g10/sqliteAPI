module.exports = function () {
    var port = process.env.PORT || 8085;
    var express = require('express'),
        app = express(),
        helmet = require('helmet'),
        bodyParser = require('body-parser'),
        productsAPI = require('./api/products'),
        router = express.Router(),
        reviewsAPI = require('./api/reviews'),
        sqlite = require('sqlite3'),
        db = new sqlite.Database('data/catalogue.sqlite3');


// Add headers
    app.use(function (req, res, next) {

        // Request methods you wish to allow
        res.setHeader('Access-Control-  ' +
        'Allow-Methods', 'GET');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.set("port", port);



// Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

// Enable jsonp
    app.enable('jsonp callback');

// Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    app.use('/', router);
    app.use('/', productsAPI(db));
    app.use('/', reviewsAPI(db));

    console.log("[server] Express Configured");
    app.listen(app.get("port"), function () {
        console.log("[server] Express server listening on port " + app.get("port"));
    });

    return app;

};
