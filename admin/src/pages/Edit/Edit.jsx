import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../../features/room/roomSlice";
import "./Edit.style.scss";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    des: "",
    roomNumber: [],
  });

  // Optionally get rooms or room by ID from redux store if already loaded:
  // const room = useSelector(state => state.room.rooms.find(r => r._id === id));

  useEffect(() => {
    // You can fetch from API here or get from redux if already loaded
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name || "",
          price: data.price || "",
          des: data.des || "",
          roomNumber: data.roomNumber || [],
        });
      } catch (err) {
        console.error("Failed to fetch room:", err);
      }
    };

    getRoom();
  }, [id]);

  const { name, price, des, roomNumber } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomNumber") {
      setFormData((prev) => ({
        ...prev,
        roomNumber: value.split(",").map((num) => num.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(updateRoom({ id, roomData: formData }));

      if (updateRoom.fulfilled.match(resultAction)) {
        alert("Room updated successfully!");
        navigate("/rooms");
      } else {
        // You can display error message from Redux state or resultAction.payload
        alert("Failed to update room: " + (resultAction.payload || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="edit-room-container">
      <div className="edit-form-box">
        <h1>Edit Room</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={name} onChange={handleChange} required />
          </div>
          <div>
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea name="des" value={des} onChange={handleChange} rows={4} />
          </div>
          <div>
            <label>Room Numbers (comma-separated)</label>
            <input
              name="roomNumber"
              value={roomNumber.join(",")}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Room</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
