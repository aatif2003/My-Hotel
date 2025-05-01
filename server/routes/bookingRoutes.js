const express = require("express");
const router = express.Router();
const {getBooking,createBooking,updatedBooking,deletedBooking,booking}=require("../controllers/bookingController");

// get all the bookings
router.get("/",getBooking);
//create the bookings
router.post("/",createBooking);
//update the Booking
router.put("/:id",updatedBooking);
//delete the Booking
router.delete("/:id",deletedBooking);
//get the single Booking
router.get("/:id",booking); 
module.exports = router;
