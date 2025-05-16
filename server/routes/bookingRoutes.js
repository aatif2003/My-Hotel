const express = require("express");
const router = express.Router();
const { getBooking, createBooking, updatedBooking, deletedBooking, getSingleBooking } = require("../controllers/bookingController");
const auth = require("../middleware/authMiddleware"); 

// get all the bookings
router.get("/",auth,  getBooking);
// create the booking
router.post("/", auth, createBooking);
// update the booking
router.put("/:id", auth, updatedBooking);
// delete the booking
router.delete("/:id", auth, deletedBooking);
// get a single booking
router.get("/:id", auth, getSingleBooking);

module.exports = router;
