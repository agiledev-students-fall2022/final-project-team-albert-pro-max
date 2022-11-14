const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const server = require("../app");

describe("GET request to /profile route", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
        const testId = 1;
        chai
            .request(server)
            .get(`/profile`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("id", testId);
                done();
            });
    });
});

describe("GET request to /profile/update route", () => {
    it("it should respond with an HTTP 200 status code", done => {
        chai
            .request(server)
            .post(`/profile/update`)
            .send({ field: 'email', newValue: 'foo.bar@notexist.foo' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success", true);
                res.body.should.have.property("msg", "email successfully updated");
                done();
            });
    });
});

server.close();
