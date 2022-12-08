const chai = require('chai');
const chaiHttp = require('chai-http');
require("dotenv").config({ silent: true });

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

const jwtToken = process.env.TEST_TOKEN;
describe("GET request to /profile/update/username route", () => {
    before(async function () {
        server = await require("../app");
    });
    
    it("it should respond with an HTTP 200 status code", done => {
        chai
            .request(server)
            .post(`/profile/update/username`)
            .set({ Authorization: `Bearer ${jwtToken}`})
            .send({ newUsername: 'berber'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success", true);
                res.body.should.have.property("msg", "username is successfully updated");
                done();
            });
    });
});

describe("GET request to /profile/update/password route", () => {
    before(async function () {
        server = await require("../app");
    });
    
    it("it should respond with an HTTP 200 status code", done => {
        chai
            .request(server)
            .post(`/profile/update/password`)
            .set({ Authorization: `Bearer ${jwtToken}`})
            .send({ newPassword: ''})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success", false);
                res.body.should.have.property("msg", "invalid password!");
                done();
            });
    });
});

describe("GET request to /profile/update/email route", () => {
    before(async function () {
        server = await require("../app");
    });
    
    it("it should respond with an HTTP 200 status code", done => {
        chai
            .request(server)
            .post(`/profile/update/email`)
            .set({ Authorization: `Bearer ${jwtToken}`})
            .send({ newEmail: 'berber@gmail.com'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success", true);
                res.body.should.have.property("msg", "email is successfully updated");
                done();
            });
    });
});
