var supertest = require('supertest'),
    should = require('should'),
    api = supertest('localhost:8086');

process.env.PORT = 8087;
var app = require('./../express')();

//keep it simple, just test for put
it('PUT valid json to /api/reviews', function (done) {
    supertest(app)
        .put('/api/reviews')
        .send({ product_id: 3, description: 'this description has been put from supertest' })
        .expect(201)
        .expect(isValidReviewBeenPut)
        .end(done);
});

//keep it simple, just test for put
it('PUT invalid json to /api/reviews', function (done) {
    supertest(app)
        .put('/api/reviews')
        .send({ product_id: null, description: null })
        .expect(400)
        .expect(isInValidReviewBeenPut)
        .end(done);
});

//Assertion functiona
var isValidReviewBeenPut = function(res) {
    res.should.be.an.instanceOf(Object);
    res.body.should.have.property('message', 'new review inserted');
};

var isInValidReviewBeenPut = function(res) {
    res.should.be.an.instanceOf(Object);
    res.body.should.have.property('message', 'bad request');
};



