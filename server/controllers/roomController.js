const roomsModel = require("../models/roomsModel");
const Room = require("../models/roomsModel");
//get the rooms
const getRooms = async (req, res,next) => {
 try{
 const rooms=await Room.find();
 if(!rooms){
  res.status(400);
  throw new Error;
 }
return res.status(200).json(rooms)
 }catch(err){
 next(err)
 }
};

// createRooms
const createRooms = async (req, res, next) => {
  try {
    // todo: validate data from user with Joi
    const room = await Room.create(req.body); 
    if (!room) {
      res.status(400);
      throw new Error("There was a problem in creating the room");
    }
    const rooms=await Room.find()
    return res.status(201).json(rooms);
  } catch (err) {
    next(err);
  }
};
//get single room
const getRoom=async (req,res,next)=>{
  try{
 const room=await Room.findById(req.params.id);
 if(!room){
  res.status(400);
  throw new Error("room not found");
 }
return res.status(200).json(room)
  }catch(err){
    next(err)
  }
}
//update the room
const updateRoom=async (req,res,next)=>{
  try{
    const updateRoom= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    if(!updateRoom){
      res.status(400)
      throw new Error("cannot update the rooms");
    }
    return res.status(200).json(updateRoom)

  }catch(err){
   next(err)
  }
};
//delete the room

const deletedRoom = async (req, res, next) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(400);
      throw new Error("Cannot delete the room");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getRooms,
  createRooms,getRoom,updateRoom,deletedRoom
};
