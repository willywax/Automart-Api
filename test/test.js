const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../index");
const app = require("../app");

const User = require("../models/users");
const Car = require("../models/cars");
const Order = require("../models/orders");

//const data = require('../models/testData');
// const userController = require('../controllers/users');

describe("Model Tests", () => {
  const person = new User(
    "William",
    "William",
    "123123",
    "w@stations.com",
    "144 Peter Road",
    false
  );

  const person2 = new User(
    "Manka",
    "Zimazile",
    "123123",
    "zima@station.com",
    "144 Peter Road",
    false
  );

  let car = new Car(person.id, "used", 20000, "Toyota", "Brevis", "car");

  let order = new Order(person2.id, car.id, 15000);

  describe("User Model", () => {
    it("should save user successfully", () => {
      User.saveUser(person);

      assert.notEqual(User.getUsers().length, 0);
    });

    it("should return id", () => {
      assert.notEqual(person.id, null);
    });

    it("should return correct First Name", () => {
      assert.equal(person.first_name, "William");
    });

    it("should return correct Last Name", () => {
      assert.equal(person.last_name, "William");
    });

    it("should return correct Address", () => {
      assert.equal(person.address, "144 Peter Road");
    });

    it("should return correct Email", () => {
      assert.equal(person.email, "w@stations.com");
    });

    it("should return true if correct user name and password", () => {
      const person2 = {
        email: "w@stations.com",
        password: "123123"
      };
      assert.equal(User.logInUser(person2).authenticated, true);
    });

    it("should return false if wrong password", () => {
      const person3 = {
        email: "w@stations.com",
        password: "12312"
      };
      assert.equal(User.logInUser(person3).authenticated, false);
    });

    it("should return false if wrong username is given", () => {
      const person3 = {
        email: "w@station.com",
        password: "12313"
      };
      assert.equal(User.logInUser(person, person3).authenticated, false);
    });

    it("should return a user", () => {
      const response = User.findUser(person);

      assert.notEqual(response, null);
    });

    it("should return null user doesnt exists", () => {
      const response = User.findUser(person2);

      assert.equal(response, null);
    });
  });

  describe("User Controller", () => {
    const person = {
      firstName: "William",
      lastName: "Max",
      password: "123123",
      email: "register@station.com",
      address: "144 Peter Road",
      isAdmin: false
    };

    it("Verifies Users is registed successfully", done => {
      requester
        .post("/auth/signup")
        .send(person)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Logins user with correct credentials", done => {
      const login = {
        email: "register@station.com",
        password: "123123"
      };

      requester
        .post("/auth/signin")
        .send(login)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("Cars Model", () => {
    it("saves Car", () => {
      let result = Car.saveCar(car);

      assert.equal(car.price, result.price);
    });
    it("Checks return cars array", () => {
      let results = Car.getCars();
      let lastCar = results[results.length - 1];

      //Compares the last car in the array to the car last entered
      assert.equal(car.price, lastCar.price);
    });

    it("Returns Car from list of cars", () => {
      requester
        .get("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });

    it("Should return null car not found", () => {
      requester
        .get("/car/123")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });

    it("Should update car successfully", () => {
      car.price = 25000;
      let result = Car.updateOne(car);

      assert.equal(result.price, 25000);
    });

    it("Should search car successfully by price range", done => {
      requester
        .get("/car?min_price=10000&max_price=30000")
        .send()
        .end((err, res) => {
          let data = res.data;
          assert.notEqual(data, 0);

          done();
        });
    });

    it("Should return null of wrong queries", done => {
      //Make is a wrong query
      requester
        .get("/car?make=Toyota")
        .send()
        .end((err, res) => {
          expect(res.body.data.length).equal(0);

          done();
        });
    });

    it("Should filter by either manufacturer, model or year if car exists", done => {
      requester
        .get("/car?manufacturer=Benz")
        .send()
        .end((err, res) => {
          let data = res.body.data;
          //console.log(data);
          assert.notEqual(data.length, 0);

          done();
        });
    });
    it("Should update Car price Successfully", done => {
      let price = {
        price: 12000
      };

      requester
        .patch("/car/" + car.id + "/price")
        .send(price)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should update Car Status Successfully", done => {
      let status = {
        status: "sold"
      };

      requester
        .patch("/car/" + car.id + "/status")
        .send(status)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should delete Car successfully", done => {
      requester
        .delete("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should fail to delete Car", done => {
      requester
        .delete("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });
  });

  describe("Orders Model", () => {
    it("Saves order successfully", done => {
      let orderObject = {
        buyer: person.id,
        car: car.id,
        amount: 150000
      };

      requester
        .post("/order")
        .send(orderObject)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Save Order through Model", () => {
      let result = Order.saveOrder(order);

      assert(result.car_id, order.car_id);
    });

    it("Finds the Order by Id", () => {
      let result = Order.findOne(order.id);

      assert.equal(order.car, result.car);
    });

    it("Gets All Orders", done => {
      requester
        .get("/order")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Updates Order Price", done => {
      const data = {
        price: 12500
      };
      requester
        .patch("/order/" + order.id + "/price")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Returns error to update wrong Id", done => {
      const data = {
        price: 15500
      };
      requester
        .patch("/order/120/price")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("Flags Model", () => {
    it("should flag a car", done => {
      const flag = {
        car: car.id,
        reason: "Wrong Car",
        description: "Car doesnot match details"
      };

      requester
        .post("/flag")
        .send(flag)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should return all flags", done => {
      requester
        .get("/flag")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });
});
