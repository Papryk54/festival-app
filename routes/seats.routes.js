const express = require("express");
const router = express.Router();
const Seat = require("../controllers/seat.controller");

router.route("/seats").get(Seat.getAll);
router.route("/seats/:id").get(Seat.getById);
router.route("/seats").post(Seat.create);
router.route("/seats/:id").put(Seat.update);
router.route("/seats/:id").delete(Seat.delete);

module.exports = router;
