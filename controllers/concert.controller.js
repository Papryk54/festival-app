const Concert = require("../models/concert.model");
const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
	try {
		const concerts = await Concert.find();
		res.json(concerts);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);
		if (concert) {
			res.json(concert);
		} else {
			res.status(404).json({ message: "Concert not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.create = async (req, res) => {
	try {
		const { performer, genre, price, day, image } = req.body;
		if (performer && genre && price && day && image) {
			const newConcert = new Concert({
				performer,
				genre,
				price,
				day,
				image,
				id: uuidv4(),
			});
			await newConcert.save();
			res.status(201).json({ message: "OK" });
		} else {
			res.status(400).json({ message: "Missing concert data" });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.update = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);
		if (concert) {
			const { performer, genre, price, day, image } = req.body;
			concert.performer = performer || concert.performer;
			concert.genre = genre || concert.genre;
			concert.price = price || concert.price;
			concert.day = day || concert.day;
			concert.image = image || concert.image;
			await concert.save();
			res.json({ message: "OK" });
		} else {
			res.status(404).json({ message: "Concert not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.delete = async (req, res) => {
	try {
		const concert = await Concert.findById(req.params.id);
		if (concert) {
			await concert.deleteOne();
			res.json({ message: "OK" });
		} else {
			res.status(404).json({ message: "Concert not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
