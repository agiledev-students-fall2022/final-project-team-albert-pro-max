const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = require("../app");

describe("GET request to /cart route", () => {
    it("it should respond with an HTTP 200 status code and an array in the response body", done => {
        chai
            .request(server)
            .get(`/cart`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Array");
                done();
            })
    })
});
describe("GET request to /cart route", () => {
    it("all courses returned should have boolean in_cart = true", done => {
        chai
            .request(server)
            .get(`/cart`)
            .end((err, res) => {
                res.body.every(el => {
                        expect(el).to.have.property('in_cart',true)
                })
                done();
            })
    })
});

describe("GET request to /cart/watch route", () => {
    it("it should respond with an HTTP 200 status code and an array in the response body", done => {
        chai
            .request(server)
            .get(`/cart/watch`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Array");
                
                done();
            })
    })
});

describe("GET request to /cart/watch route", () => {
    it("all courses returned should have boolean watch = true", done => {
        chai
            .request(server)
            .get(`/cart/watch`)
            .end((err, res) => {
                res.body.every(el => {
                        expect(el).to.have.property('watch',true)
                })
                done();
            })
    })
});
server.close();
