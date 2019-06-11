const { check, validationResult } = require("express-validator/check");

const User = require("../models/users");

exports.checks = {
  singUpCheck: [
    check("email")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 5 })
      .withMessage("Password must have a min of 5 characters"),
    check("firstName")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("firstName is required Field"),
    check("lastName")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("lastName is a required Field"),
    check("isAdmin")
      .isBoolean()
      .withMessage("isAdmin is a required field with boolean value"),
    check("email").custom(value => {
      let result = User.findUserByEmail(value);
      if (result !== null) {
        return Promise.reject("E-mail already in use");
      }
      return true;
    })
  ],
  singInCheck: [
    check("email")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("password is field is required")
  ],
  postCarCheck: [
    check("owner")
      .trim(" ")
      .escape()
      .isString()
      .custom(value => {
        let result = User.findUserById(value);
        if (result === null) {
          return Promise.reject("Invalid Owner Id used");
        }
        return true;
      }),
    check("state")
      .isIn(["used", "new"])
      .withMessage("State needs to be [used, new] "),
    check("status")
      .optional()
      .isIn(["available", "sold"])
      .withMessage("Status needs to be [available, sold] "),
    check("model")
      .isString()
      .trim(" ")
      .escape()
      .withMessage("model is required"),
    check("body_type")
      .isString()
      .escape()
      .trim(" ")
      .withMessage("body_type is required")
  ]
};

exports.validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  } else {
    next();
  }
};
