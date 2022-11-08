const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const server = require("../app");

describe("GET request to /course/catalog route", () => {
    it("it should respond with an HTTP 200 status code and an array in the response body", done => {
        const test_id = 1;
        chai
            .request(server)
            .get(`/course/catalog`)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }

                res.should.have.status(200);
                res.body.should.be.a("array");
                expect(res.body.length).to.equal(5);
                expect(Object.keys(res.body[0]).length).to.equal(14);
                done();
            })
    })
});

server.close();