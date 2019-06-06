const uuid = require("uuid");

const carData = [];

class Car {
  constructor(owner, state, price, manufacturer, model, body_type) {
    this.id = this.generateId();
    this.owner = owner;
    this.state = state;
    this.status = "available";
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.body_type = body_type;
    this.created_on = new Date();
  }

  static saveCar(car) {
    carData.push(car);

    // Return last saved Record
    return carData[carData.length - 1];
  }

  static getCars() {
    return carData;
  }

  static findOne(car) {
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
        if (key === "min_price" || key === "max_price") {
          if (key === "min_price") {
            if (carData[i].price >= queries.min_price) {
              found = true;
            } else {
              found = false;
              break;
            }
          }
          if (key === "max_price") {
            if (carData[i].price <= queries.max_price) {
              found = true;
            } else {
              found = false;
              break;
            }
          }
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
        // carData[i] = car;
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
