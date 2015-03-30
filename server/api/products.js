var express = require('express'),
    router = express.Router(),
    async = require('async'),
    logger = require('./../services/logging/logger');


module.exports = function (db) {
    //
    // PRODUCTS
    //
    // get all products
    router.get('/api/products', function (req, res) {

        var pageSize;
        if (req.query.pagesize) {
            pageSize = parseInt(req.query.pagesize);
        } else {
            pageSize = 10;
        }

        var page;
        if (req.query.page) {
            page = req.query.page - 1;
        } else {
            page = 0;
        }
        var totalProducts = 0;

        db.all('SELECT count(*) AS TotalCount FROM products', function (err, rows) {
            if (!err) {
                totalProducts = rows[0].TotalCount;
                logger.info('total count of products table is: ', totalProducts);
            }
            else {
                logger.error(err, 'error getting the table count of products table');
                res.send(500, {message: 'could not find products'});
            }


            var skip = pageSize * page;
            var pageCount = Math.round(totalProducts / pageSize);

            db.all('SELECT * FROM products limit ' + pageSize + ' offset ' + skip, function (err, rows) {
                if (!err) {
                    res.json({
                        totalProducts: totalProducts,
                        pageSize: pageSize,
                        totalPages: pageCount,
                        currentPage: page + 1,
                        products: rows
                    });
                }
                else {
                    logger.error(err, 'error getting rows from the products table');
                    res.send(500, {message: 'could not products'});
                }
            });
        });
    });

    // get all products & reviews
    router.get('/api/products/reviews', function (req, res) {
            var pageSize;
            if (req.query.pagesize) {
                pageSize = parseInt(req.query.pagesize);
            } else {
                pageSize = 10;
            }

            var page;
            if (req.query.page) {
                page = req.query.page - 1;
            } else {
                page = 0;
            }
            var totalProducts = 0;

            db.all('SELECT count(*) AS TotalCount FROM products', function (er, rows) {
                if (!er) {
                    totalProducts = rows[0].TotalCount;
                    logger.info('total count of products table is: ', totalProducts);
                }
                else {
                    logger.error(er, 'error getting the table count of products table');
                    res.send(500, {message: 'could not products'});
                }

                var skip = pageSize * page;
                var pageCount = Math.round(totalProducts / pageSize);


                db.all('SELECT * FROM products limit ' + pageSize + ' offset ' + skip, function (err, products) {
                    if (!err) {
                        var productRows = [];
                        async.each(products, function (product, callback) {
                                db.all('SELECT description FROM reviews where product_id = ' + product.id, function (error, reviews) {
                                    product.reviews = reviews;
                                    productRows.push(product);
                                    callback();
                                });
                            },
                            function (error) {
                                if (!error) {
                                    res.json({
                                        totalProducts: totalProducts,
                                        pageSize: pageSize,
                                        totalPages: pageCount,
                                        currentPage: page + 1,
                                        products: productRows
                                    });
                                } else {
                                    logger.error(err, 'error joining rows from the products and reviews tables');
                                    res.send(500, {message: 'could not products'})
                                }
                            }
                        );

                    }
                    else {
                        logger.error(err, 'error getting rows from the products table');
                        res.send(500, {message: 'could not products'})
                    }
                });
            });
        }
    );

// get product by id.
    router.get('/api/products/:productId', function (req, res) {
        db.all('SELECT * FROM products WHERE id = ' + req.params.productId, function (err, rows) {
            if (!err) {
                res.json(rows);
            }
            else {
                logger.error(err, 'error getting rows from the products table');
                //res.send()
            }
        });
    });

    return router;
}
;

