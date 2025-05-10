const { v4: uuidv4 } = require("uuid");
const Testimonial = require("../models/testimonial.model");

exports.getAll = async (req, res) => {
	try {
		const testimonials = await Testimonial.find();
		res.json(testimonials);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const testimonials = await Testimonial.find();
		const randomIndex = Math.floor(Math.random() * testimonials.length);
		res.json(testimonials[randomIndex]);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id);
		if (testimonial) {
			res.json(testimonial);
		} else {
			res.status(404).json({ message: "Testimonial not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.create = async (req, res) => {
	const { author, text } = req.body;
	if (author && text) {
		try {
			const newTestimonial = new Testimonial({
				author,
				text,
			});
			await newTestimonial.save();
			res.status(201).json({ message: "Testimonial created" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	} else {
		res.status(400).json({ message: "Missing author or text" });
	}
};

exports.update = async (req, res) => {
	const { author, text } = req.body;
	try {
		const testimonial = await Testimonial.findById(req.params.id);
		if (testimonial) {
			testimonial.author = author || testimonial.author;
			testimonial.text = text || testimonial.text;
			await testimonial.save();
			res.json({ message: "Testimonial updated" });
		} else {
			res.status(404).json({ message: "Testimonial not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
		if (testimonial) {
			res.json({ message: "Testimonial deleted" });
		} else {
			res.status(404).json({ message: "Testimonial not found" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
