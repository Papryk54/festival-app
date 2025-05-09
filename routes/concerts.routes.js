const express = require("express");
const router = express.Router();
const ConcertController = require("../controllers/concert.controller");

router.get("/concerts", ConcertController.getAll);
router.get("/concerts/:id", ConcertController.getById);
router.post("/concerts", ConcertController.create);
router.put("/concerts/:id", ConcertController.update);
router.delete("/concerts/:id", ConcertController.delete);

module.exports = router;
