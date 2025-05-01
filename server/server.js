const express=require("express");
require("dotenv").config();
const {errorHandler}=require("./middleware/errorHandler");
const app=express();
const port=process.env.PORT||5000;
const connectDB=require("./config/db")
const roomRoutes=require("./routes/roomRoutes");
const bookingRoutes=require("./routes/bookingRoutes")
//set up middleware

app.use(express.json());

//connect the database
connectDB();
//setting up the routes for the rooms
app.use("/api/rooms",roomRoutes);
//setting up the routes for the booking the rooms
app.use("/api/bookings",bookingRoutes)
//Error Handlers
app.use(errorHandler);


app.listen(port,()=>{
  console.log("Server is listening")
})