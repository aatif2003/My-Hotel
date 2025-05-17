import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../features/room/roomSlice";
import "./Room.scss";

const Room = () => {
  const user = useSelector((state) => state.auth.user?.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_BASE || "";
        const res = await fetch(`${API_BASE}/api/rooms/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRoom(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching room:", err);
        setError(err.message);
        setRoom(null);
      }
    };

    getRoom();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await dispatch(deleteRoom(id)).unwrap();
        navigate("/rooms");
      } catch (err) {
        alert("Failed to delete room: " + err);
      }
    }
  };

  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    } catch {
      return `$${amount}`;
    }
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="container">
      {error ? (
        <p className="error-message">Error loading room: {error}</p>
      ) : room ? (
        <div className="room-details">
          <h1 className="heading center">{room.name}</h1>

          {room.des && <p className="description">{room.des}</p>}

          {room.images?.length > 0 && (
            <div className="image-grid">
              {room.images.map((url, i) => (
                <img
                  key={url}
                  src={url}
                  alt={`${room.name} - Image ${i + 1}`}
                  className="room-image"
                />
              ))}
            </div>
          )}

          <div className="price-section">
            <strong>Price:</strong> {formatCurrency(room.price)}
          </div>

          <div className="room-numbers">
            <strong>Room Numbers:</strong>{" "}
            {room.roomNumbers?.map((numObj) => numObj.number).join(", ")}
          </div>

          <div className="room-availability">
            <h3>Room Availability</h3>
            {room.roomNumbers?.map(({ number, unavailableDates }) => (
              <div key={number} className="room-availability-item">
                <div className="room-number-header">
                  <strong>Room {number}</strong>
                </div>
                <div className="unavailable-dates">
                  {unavailableDates.length > 0 ? (
                    unavailableDates.map((dateStr) => (
                      <span key={dateStr} className="date-chip">
                        {formatDate(dateStr)}
                      </span>
                    ))
                  ) : (
                    <span className="all-available">All dates available</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {user?.isadmin && (
            <>
              <Link to={`/room/edit/${room._id}`}>Edit Room</Link> <br />
              <button onClick={handleDelete} className="delete-btn">Delete Room</button>
            </>
          )}
        </div>
      ) : (
        !error && <p className="loading">Loading room data...</p>
      )}
    </div>
  );
};

export default Room;
