const helper = require("../utils/helper");
const client = require("../services/connection");
const carData = [];

class Car {
  constructor(car) {
    this.id = helper.generateId();
    this.owner = car.token.userId;
    this.state = car.state;
    this.status = "available";
    this.price = car.price;
    this.manufacturer = car.manufacturer;
    this.model = car.model;
    this.body_type = car.body_type;
    this.primary_image = "image.jpg";
  }

  static saveCar(car, done) {
    const query =
      "INSERT INTO cars(id,owner,state,status,price,model,manufacturer,body_type,primary_image) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";

    const values = [
      car.id,
      car.owner,
      car.state,
      car.status,
      car.price,
      car.model,
      car.manufacturer,
      car.body_type,
      car.primary_image
    ];

    client.query(query, values, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows[0]);
      }
    });
  }

  static getCars() {
    return carData;
  }

  static findById(car) {
    let result = null;
    for (let i = 0; i < carData.length; i++) {
      if (carData[i].id === car) {
        result = carData[i];
        break;
      }
    }
    return result;
  }

  static updateOne(car) {
    let result = null;
    for (let i = 0; i < carData.length; i++) {
      if (carData[i].id === car.id) {
        carData[i] = car;
        result = carData[i];
        break;
      }
    }
    return result;
  }

  static searchCar(queries) {
    const keys = Object.keys(queries);
    const cars = [];
    for (let i = 0; i < carData.length; i++) {
      let found = false;
      for (const key of keys) {
        if (key === "min_price" && carData[i].price >= queries.min_price) {
          found = true;
        } else if (
          key === "max_price" &&
          carData[i].price <= queries.max_price
        ) {
          found = true;
        } else if (carData[i][key] === queries[key]) {
          found = true;
        } else {
          found = false;
          break;
        }
      }
      if (found) {
        cars.push(carData[i]);
      }
    }

    return cars;
  }

  static deleteOne(car) {
    let result = null;
    for (let i = 0; i < carData.length; i++) {
      if (carData[i].id === car.id) {
        carData.splice(i, 1);
        result = car;
        break;
      }
    }
    return result;
  }

  generateId() {
    return uuid.v1();
  }
}

module.exports = Car;
