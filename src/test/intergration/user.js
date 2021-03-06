import "@babel/polyfill";

import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";

const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

import index from "../../index";
import app from "../../app";

describe("Testing User Enpoints", () => {
  it("Register User User", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "123123",
      first_name: "firstName",
      last_name: "lastName",
      address: "144 Posta"
    };
    requester
      .post("/auth/signup")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(201);

        let userId = res.body.id;
        done();
      });
  });

  it("Fails to Register Users with duplicate email", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "123123",
      first_name: "firstName",
      last_name: "lastName",
      address: "144 Posta"
    };
    requester
      .post("/auth/signup")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(409);

        done();
      });
  });

  it("Signs In Successfully", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "123123"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Fails to Sign in valid email", done => {
    let userDetails = {
      email: "tes@automart.com",
      password: "123123"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(401);

        done();
      });
  });

  it("Fails to Signin Invalid password", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "12312"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(401);

        done();
      });
  });
});
