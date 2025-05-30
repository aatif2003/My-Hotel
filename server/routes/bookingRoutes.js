const express = require("express");
const router = express.Router();
const { getBooking, createBooking, updatedBooking, deletedBooking, getSingleBooking } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware"); 

// get all the bookings
router.get("/",  getBooking);
// create the booking
router.post("/",createBooking);
// update the booking
router.put("/:id", auth, updatedBooking);
// delete the booking
router.delete("/:id", auth, deletedBooking);
// get a single booking
router.get("/:id", getSingleBooking);

module.exports = router;
