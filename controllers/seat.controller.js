const Seat = require("../models/seat.model");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
	try {
		res.json(await Seat.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.id);
		if (!seat) res.status(404).json({ message: "Not found" });
		else res.json(seat);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.create = async (req, res) => {
	let { day, seat, client, email } = req.body;
	day = parseInt(day);
	seat = parseInt(seat);

	if (!day || !seat || !client || !email) {
		return res.status(400).json({ message: "Missing seat data" });
	}

	const isTaken = await Seat.findOne({ day, seat });
	if (isTaken) {
		return res.status(202).json({ message: "The slot is already taken..." });
	}

	const newSeat = new Seat({ id: uuidv4(), day, seat, client, email });
	await newSeat.save();

	if (req.io) req.io.emit("seatsUpdated", await Seat.find());

	res.status(201).json({ message: "OK" });
};

exports.update = async (req, res) => {
	try {
		const seatData = await Seat.findById(req.params.id);
		const { day, seat, client, email } = req.body;
		if (!seatData) return res.status(404).json({ message: "Seat not found" });
		seatData.day = day || seatData.day;
		seatData.seat = seat || seatData.seat;
		seatData.client = client || seatData.client;
		seatData.email = email || seatData.email;
		await seatData.save();
		res.status(200).json({ message: "OK" });
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.delete = async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.id);
		if (!seat) return res.status(404).json({ message: "Not found" });

		await seat.deleteOne();
		res.json({ message: "OK" });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
