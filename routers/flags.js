const express = require("express");

const router = express.Router();

const flagController = require("../controllers/flags");

router.post("/", flagController.flagCar);
router.get("/", flagController.getFlags);

module.exports = router;
