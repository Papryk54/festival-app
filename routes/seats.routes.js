const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.route("/seats").get((req, res) => {
	res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
	const seat = db.seats.find((s) => s.id == req.params.id);
	if (seat) {
		res.json(seat);
	} else {
		res.status(404).json({ message: "Seat not found" });
	}
});

router.route("/seats").post((req, res) => {
	let { day, seat, client, email } = req.body;
	day = parseInt(day);
	seat = parseInt(seat);

	const isTaken = db.seats.some(
		(seatData) => seatData.day === day && seatData.seat === seat
	);

	if (isTaken) {
		res.status(202).json({ message: "The slot is already taken..." });
	}

	if (day && seat && client && email) {
		const newSeat = { id: uuidv4(), day, seat, client, email };
		db.seats.push(newSeat);
		res.status(201).json({ message: "OK" });
	} else {
		res.status(400).json({ message: "Missing seat data" });
	}
});

router.route("/seats/:id").put((req, res) => {
	const { day, seat, client, email } = req.body;
	const seatData = db.seats.find((s) => s.id == req.params.id);
	if (seatData) {
		seatData.day = day || seatData.day;
		seatData.seat = seat || seatData.seat;
		seatData.client = client || seatData.client;
		seatData.email = email || seatData.email;
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Seat not found" });
	}
});

router.route("/seats/:id").delete((req, res) => {
	const index = db.seats.findIndex((s) => s.id == req.params.id);
	if (index !== -1) {
		db.seats.splice(index, 1);
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Seat not found" });
	}
});

module.exports = router;
