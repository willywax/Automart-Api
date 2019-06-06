const uuid = require("uuid");

const Car = require("./cars");

const orderData = [];

class Order {
  constructor(buyer, car, amount) {
    this.id = this.generateId();
    this.car_id = car;
    this.created_on = new Date();
    this.buyer = buyer;
    this.status = "pending"; // Default Status when Order is made
    this.price_offered = amount;
  }

  static findOne(order) {
    let result = null;
    for (let i = 0; i < orderData.length; i++) {
      if (order === orderData[i].id) {
        result = orderData[i];
        break;
      }
    }
    if (result !== null) {
      const car = Car.findOne(result.car_id);
      result.price = car !== null ? car.price : "None";
    }
    return result;
  }

  static saveOrder(order) {
    orderData.push(order);

    // Return last saved Record
    return orderData[orderData.length - 1];
  }

  static updateOrder(order) {
    let result = null;
    let old_price;
    const new_price = 0;
    for (let i = 0; i < orderData.length; i++) {
      if (order.id === orderData[i].id) {
        // old_price = orderData[i].price_offered;
        // new_price = order.price_offered;
        orderData[i] = order;
        result = order;
        break;
      }
    }
    if (result !== null) {
      // result.old_price_offered = old_price;
      // result.new_price_offered = new_price
    }
    return result;
  }

  static getOrders() {
    return orderData;
  }

  generateId() {
    return uuid.v1();
  }
}

module.exports = Order;
