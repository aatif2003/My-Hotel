const { Router } = require("express");
const{getRooms,createRooms,getRoom,updateRoom,deletedRoom}=require("../controllers/roomController");
const auth = require("../middleware/authMiddleware");

const router = Router();
//get all the Rooms
router.get("/",getRooms)
//create Rooms
router.post("/",createRooms);
//get a single room
router.get("/:id",getRoom)
//update the room
router.put("/:id",updateRoom);
//delete room
router.delete("/:id",deletedRoom)
module.exports = router;
