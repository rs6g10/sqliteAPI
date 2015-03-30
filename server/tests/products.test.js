var supertest = require('supertest'),
    should = require('should'),
    api = supertest('localhost:8086');

process.env.PORT = 8086;
var app = require('./../express')();

it('GET /api/products/1', function (done) {
    supertest(app)
        .get('/api/products/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '802')
        .expect(200)
        .expect(isValidResultForAProduct)
        .end(done);
});

it('GET /api/products/reviews', function (done) {
    supertest(app)
        .get('/api/products/reviews')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(isValidResultForProductsAndReviews)
        .end(done);
});

it('GET /api/products', function (done) {
    supertest(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(isValidResultForProducts)
        .end(done);
});

it('GET /api/products should return a 200 response', function (done) {
    api
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200, done);
});

it('should return a 404 response for invalid API', function (done) {
    api
        .get('/api/something')
        .set('Accept', 'application/json')
        .expect(404, done);
});

//Assertion functions
var isValidResultForAProduct = function(res) {
    res.should.be.an.instanceOf(Object);
    res.should.have.property('body').with.lengthOf(1);
    var body = res.body[0];
    body.should.have.property('id', 1);
};

var isValidResultForProductsAndReviews = function(res){
    res.should.be.an.instanceOf(Object);
    res.body.products[0].should.have.property('reviews');
}

var isValidResultForProducts = function(res){
    res.should.be.an.instanceOf(Object);
    var body = res.body;
    body.should.have.property('totalProducts', 229);
    body.should.have.property('pageSize', 10);
    body.should.have.property('currentPage', 1);
    body.should.have.property('products').be.instanceof(Array).and.have.lengthOf(10);
};


