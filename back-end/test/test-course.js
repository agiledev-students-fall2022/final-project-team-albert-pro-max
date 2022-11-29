const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let server;

describe("GET request to /course/details route", () => {
    before(async function () {
        server = await require("../app");
    });

    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
        const testId = 639;

        chai
            .request(server)
            .get(`/course/details?id=${testId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("id", testId);
                expect(Object.keys(res.body).length).to.equal(14);
                done();
            });
    });
});

describe("GET request to /course/search route", () => {
    before(async function () {
        server = await require("../app");
    });

    it("it should respond with an HTTP 200 status code and an array in the response body", done => {

        chai
            .request(server)
            .get(`/course/search`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});