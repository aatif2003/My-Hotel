const express=require("express");
require("dotenv").config();
const {errorHandler}=require("./middleware/errorHandler");
const app=express();
const port=process.env.PORT||5000;
const connectDB=require("./config/db")
const roomRoutes=require("./routes/roomRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const userRoutes=require("./routes/userRoutes");
const cookie_parser=require("cookie-parser");
const auth= require("./middleware/authMiddleware");
const cors=require("cors");
//set up middleware
app.use(cookie_parser());
app.use(express.json());
//use of cors to comunicate with the backend
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true
}));


//connect the database
connectDB();
//routes for the auth validation
// app.use("/auth",auth)
//setting up the routes for the rooms
app.use("/api/rooms",roomRoutes);
//setting up the routes for the booking the rooms
app.use("/api/bookings",bookingRoutes);
//setting up the routes for the user
app.use("/api/users",userRoutes);
//Error Handlers
app.use(errorHandler);


app.listen(port,()=>{
  console.log("Server is listening")
})