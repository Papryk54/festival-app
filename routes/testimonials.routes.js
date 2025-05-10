const express = require("express");
const router = express.Router();
const Testimonial = require("../controllers/testimonial.controller");

router.route("/testimonials").get(Testimonial.getAll);
router.route("/testimonials/random").get(Testimonial.getRandom);
router.route("/testimonials/:id").get(Testimonial.getById);
router.route("/testimonials").post(Testimonial.create);
router.route("/testimonials/:id").put(Testimonial.update);
router.route("/testimonials/:id").delete(Testimonial.delete);

module.exports = router;
