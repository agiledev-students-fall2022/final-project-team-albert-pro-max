const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let server;

describe("GET request to /cart route", () => {
    before(async function () {
        server = await require("../app");
    });

    it("it should respond with an HTTP 401 status code when no Authorization header presents", done => {
        chai
            .request(server)
            .get(`/cart`)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});
