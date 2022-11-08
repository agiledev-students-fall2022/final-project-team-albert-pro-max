const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = require("../app");

describe("GET request to /course/details route", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
        const test_id = 639;

        chai
            .request(server)
            .get(`/course/details?id=${test_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("id", test_id);
                expect(Object.keys(res.body).length).to.equal(14);
                done();
            })
    })
});

describe("GET request to /course/search route", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {

        chai
            .request(server)
            .get(`/course/search`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                expect(Object.keys(res.body).length).to.equal(21);
                done();
            })
    })
});

server.close();