const Flag = require("../models/flags");

exports.flagCar = (req, res, next) => {
  const flag = new Flag(req.body.car, req.body.reason, req.body.description);

  const result = Flag.saveFlag(flag);

  res.status(200).json(result);
};

exports.getFlags = (req, res, next) => {
  let flags = Flag.getFlags();

  const data = {
    status: 200,
    data: flags
  };

  res.status(200).json(data);
};
