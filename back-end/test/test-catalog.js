const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const server = require("../app");

describe("GET request to /course/catalog route", () => {
    it("it should respond with an HTTP 200 status code and an array in the response body", done => {
        chai
            .request(server)
            .get(`/course/catalog`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});

server.close();