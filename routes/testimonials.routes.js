const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

router.route("/testimonials").get((req, res) => {
	res.json(db.testimonials);
});

router.route("/testimonials/random").get((req, res) => {
	const randomTestimonial = db.testimonials[0];
	res.json(randomTestimonial);
});

router.route("/testimonials/new").post((req, res) => {
	const { author, text } = req.body;
	if (author && text) {
		const newTestimonial = { id: uuidv4(), author, text };
		db.testimonials.push(newTestimonial);
		res.status(201).json({ message: "OK" });
	} else {
		res.status(400).json({ message: "Missing author or text" });
	}
});

router.route("/testimonials/:id").put((req, res) => {
	const { author, text } = req.body;
	const testimonial = db.testimonials.find((t) => t.id === req.params.id);
	if (testimonial) {
		testimonial.author = author || testimonial.author;
		testimonial.text = text || testimonial.text;
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Testimonial not found" });
	}
});

router.route("/testimonials/:id").delete((req, res) => {
	const index = db.testimonials.findIndex((t) => t.id === req.params.id);
	if (index !== -1) {
		db.testimonials.splice(index, 1);
		res.json({ message: "OK" });
	} else {
		res.status(404).json({ message: "Testimonial not found" });
	}
});

router.route("/testimonials/:id").get((req, res) => {
	const testimonial = db.testimonials.find((t) => t.id === req.params.id);
	if (testimonial) {
		res.json(testimonial);
	} else {
		res.status(404).json({ message: "Testimonial not found" });
	}
});

module.exports = router;
