const jwt = require("jsonwebtoken");
const User = require("../models/users");

const { validationResult } = require("express-validator/check");

exports.signUp = (req, res, next) => {
  const newUser = new User(
    req.body.firstName,
    req.body.lastName,
    req.body.password,
    req.body.email,
    req.body.address,
    req.body.isAdmin
  );

  const user = User.saveUser(newUser);

  const token = jwt.sign(
    { userId: user.id, role: user.is_admin },
    "RANDOM_TOKEN",
    {
      expiresIn: "24h"
    }
  );

  user.token = token;

  const data = {
    status: 201,
    data: user
  };
  res.status(201).json(data);
};

exports.login = (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const response = User.logInUser(user);

  if (response.authenticated) {
    const data = {
      status: 200,
      data: response.data
    };

    res.status(200).json(data);
  } else {
    const data = {
      status: 401,
      error: "Incorrect Credential"
    };
    res.status(401).json(data);
  }
};
