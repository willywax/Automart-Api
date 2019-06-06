const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orders");

router.post("/", orderController.saveOrder);
router.get("/", orderController.getOrder);
router.patch("/:id/price", orderController.updatePrice);

module.exports = router;
