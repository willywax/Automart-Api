const Car = require("../models/cars");

exports.saveCar = (req, res, next) => {
  const newCar = new Car(
    req.body.owner,
    req.body.state,
    req.body.price,
    req.body.manufacturer,
    req.body.model,
    req.body.body_type
  );

  const car = Car.saveCar(newCar);

  const data = {
    status: 201,
    data: car
  };

  res.status(201).json(data);
};

exports.getCars = (req, res, next) => {
  let cars = Car.getCars();
  const queries = req.query;

  const data = {
    status: 200,
    data: cars
  };

  if (Object.keys(queries).length) {
    cars = Car.searchCar(queries);
    data.data = cars;
    res.status(200).json(data);
  }
  res.status(200).json(data);
};

exports.getCar = (req, res, next) => {
  const car = Car.findOne(req.params.id);

  const data = {
    status: 200,
    data: car
  };
  if (car != null) {
    res.status(200).json(data);
  } else {
    data.status = 404;
    res.status(404).json(data);
  }
};

exports.updatePrice = (req, res, next) => {
  const car = Car.findOne(req.params.id);

  if (car !== null) {
    car.price = req.body.price;
    const result = Car.updateOne(car);

    const data = {
      status: 200,
      data: result
    };

    res.status(200).json(data);
  } else {
    res.status(404).json("Error Occured");
  }
};

exports.updateStatus = (req, res, next) => {
  const car = Car.findOne(req.params.id);

  if (car !== null) {
    car.status = req.body.status;
    const result = Car.updateOne(car);

    const data = {
      status: 200,
      data: result
    };

    res.status(200).json(data);
  } else {
    res.status(404).json("Error Occured");
  }
};

exports.deleteCar = (req, res, next) => {
  const car = Car.findOne(req.params.id);

  if (car !== null) {
    const result = Car.deleteOne(car);

    const data = {
      status: 200,
      data: result
    };

    res.status(200).json(data);
  }
  res.status(404).json("Failed");
};
