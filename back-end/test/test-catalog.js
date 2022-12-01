const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let server;

describe("GET request to /course/catalog route", () => {
    before(async function () {
        server = await require("../app");
    });

    it("it should respond with an HTTP 200 status code and an array in the response body", done => {
        const testId = '63858d5792cdc839bf93fb10';

        chai
            .request(server)
            .get(`/course/catalog/${testId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.every(el => {
                    expect(el).to.have.property('id',testId);
                });
                done();
            });
    });
});
