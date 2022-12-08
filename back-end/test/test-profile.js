const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let server;

describe("GET request to /profile route", () => {
    before(async function () {
        server = await require("../app");
    });

    it("it should respond with an HTTP 401 when no Authorization header presents", done => {
        chai
            .request(server)
            .get(`/profile`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});

let jwtToken;
describe("GET request to /profile/update/username route", () => {
    before(async function () {
        server = await require("../app");
    });
    
    it("it should respond with an HTTP 200 status code", done => {
        chai
            .request(server)
            .post(`/profile/update`)
            .send({ newUsername: 'foo-bar'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success", true);
                res.body.should.have.property("msg", "email successfully updated");
                done();
            });
    });
});
