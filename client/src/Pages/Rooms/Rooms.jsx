import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, reset } from "../../features/room/roomSlice";
import { Link } from "react-router-dom";
import "./Rooms.scss";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading, isError, message } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) return <p>Loading rooms...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {message}</p>;

  return (
    <div className="room-list">
      {rooms.length > 0 ? (
        rooms.map((item) => (
          <Link to={`/room/all/${item._id}`} key={item._id} className="room-card">
            <div className="room-image-wrapper">
              <img src={item.images?.[0] || "/default-room.jpg"} alt={item.name} className="room-image" />
            </div>
            <div className="room-info">
              <h3 className="room-name">{item.name}</h3>
              <p className="room-price">${item.price} / night</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No rooms found.</p>
      )}
    </div>
  );
};

export default Rooms;
