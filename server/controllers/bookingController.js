const Booking=require("../models/bookingModel");

//get all the booking
const getBooking=async(req,res,next)=>{
 try{
  const booking=await Booking.find();
  if(!booking){
    return res.status(400)
    throw new Error("donot find the Booking")
  }
  return res.status(200).json(booking)

 }catch(err){
  next(err)
 }
}
//create the Booking
const createBooking=async(req,res,next)=>{
  try{
    const booking=await  Booking.create(req.body);
    if(!booking){
      res.status(400)
      throw new Error("cannot Book the rooms")
    }

    return res.status(201).json(booking);

  }catch(err){
    next(err)
  }
}
//update the booking
const updatedBooking=async(req,res,next)=>{
  try{
 const updatedBooking= await Booking.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
 if(!updatedBooking){
  res.status(400)
  throw new Error("cannot update the ")
 }
 const booking=await Booking.find();
 return res.status(200).json(booking)
  }catch(err){
    next(err)
  }
}
//delete the booking
const deletedBooking=async(req,res,next)=>{
  try{
    const deletedBooking=await Booking.findByIdAndDelete(req.params.id);
  if(!deletedBooking){
    res.status(400);
    throw new Error("cannot delete the Bookng");
  }
  return res.status(200).json({id:req.params.id});

  }catch(err){
    next(err);
  }

}
//get the single Booking
const booking=async (req,res,next)=>{
     try{
     const booking=await Booking.findById(req.params.id);
     if(!getBooking){
      res.status(400);
      throw new Error("cannot find the single Booking")
     }
     return res.status(200).json(booking);


     }catch(err){
      next(err)
     }
}

module.exports={
  getBooking,createBooking,updatedBooking,deletedBooking,booking
}