const express = require("express");

const router = express.Router();

const carController = require("../controllers/cars");

router.post("/", carController.saveCar);
router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.patch("/:id/status", carController.updateStatus);
router.patch("/:id/price", carController.updatePrice);
router.delete("/:id", carController.deleteCar);

module.exports = router;
