const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.route("/concerts").get((req, res) => {
	res.json(db.concerts);
});

router.route("/concerts/:id").get((req, res) => {
	console.log("Request params:", req.params);
	const concert = db.concerts.find((c) => c.id == req.params.id);
	if (concert) {
		res.json(concert);
	} else {
		res.status(404).json({ message: "Concert not found" });
	}
});

router.route("/concerts").post((req, res) => {
	const { performer, genre, price, day, image } = req.body;
	if (performer && genre && price && day && image) {
		const newConcert = { id: uuidv4(), performer, genre, price, day, image };
		db.concerts.push(newConcert);
		res.status(201).json({ message: "OK" });
	} else {
		res.status(400).json({ message: "Missing concert data" });
	}
});

router.route("/concerts/:id").put((req, res) => {
	const { performer, genre, price, day, image } = req.body;
	const concert = db.concerts.find((c) => c.id == req.params.id);
	if (concert) {
		concert.performer = performer || concert.performer;
		concert.genre = genre || concert.genre;
		concert.price = price || concert.price;
		concert.day = day || concert.day;
		concert.image = image || concert.image;
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Concert not found" });
	}
});

router.route("/concerts/:id").delete((req, res) => {
	const index = db.concerts.findIndex((c) => c.id == req.params.id);
	if (index !== -1) {
		db.concerts.splice(index, 1);
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Concert not found" });
	}
});

module.exports = router;
