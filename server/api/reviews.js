var express = require('express');
var router = express.Router();
var logger = require('./../services/logging/logger');


module.exports = function (db) {
    //
    // REVIEWS API
    // An API should be plain and stupid. All validations must be done on client side, but I've handled here to make my failing tests pass.
    //
    router.put('/api/reviews', function (req, res) {
        var reqBody = null;
        if (req) {
            reqBody = req.body;
            var productId = -1;
            var description = '';
            if (!(reqBody.product_id && reqBody.description)) {
                res.send(400, {message: 'bad request'});
            } else {
                productId = parseInt(reqBody.product_id);
                if (isNaN(productId)) {
                    logger.error('REVIEWS: product id is not an integer');
                    res.send(400, {message: 'bad request'});
                }
            }
        } else {
            logger.error('REVIEWS: no request sent for reviews');
            res.send(400, 'bad request');

        }

        var insertQuery = db.prepare("INSERT INTO reviews(product_id, description) VALUES(?,?)");
        var responseCode = 201;
        var responseMessage = {};
        try {
            insertQuery.run(productId, description);
            responseMessage = {message: 'new review inserted'};
        }
        catch (e) {
            res.send(400, {message: 'could not insert review'});
            logger.error(e, 'REVIEWS: could not insert review');
            responseCode = 400;
            responseMessage = {message: 'could not insert review'};
        }
        finally {
            insertQuery.finalize();
            res.send(responseCode, responseMessage);
        }
    });

    router.get('/api/reviews', function (req, res) {
        db.all('SELECT * FROM reviews', function (err, rows) {
            if (!err) {
                res.send(rows);
            }
            else {
                logger.error(err, 'error getting data from the reviews table');
            }
        });
    });

    return router;
};

