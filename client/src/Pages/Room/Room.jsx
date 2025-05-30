import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Rooms.scss";

const Room = () => {
  const user = useSelector((state) => state.auth?.user?.user || null);
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (room?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % room.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [room]);

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
      const options = { year: "numeric", month: "short", day: "numeric" };
      const date = new Date(dateStr);
      return isNaN(date) ? "Invalid Date" : date.toLocaleDateString("en-US", options);
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="room-container">
      {error ? (
        <p className="error-message">Error loading room: {error}</p>
      ) : room ? (
        <div className="room-details">
          <h1 className="room-heading">{room.name}</h1>

          {room.des && <p className="room-description">{room.des}</p>}

          <div className="room-carousel">
            <img
              src={
                room.images?.length > 0
                  ? room.images[currentIndex]
                  : "/default-room.jpg"
              }
              alt={`Room ${room.name}`}
              className="room-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-room.jpg";
              }}
            />
          </div>

          <div className="room-info">
            <div className="room-price">
              <strong>Price:</strong> {formatCurrency(room.price)}
            </div>

            <div className="room-numbers">
              <strong>Room Numbers:</strong>{" "}
              {room.roomNumbers?.map((numObj) => numObj.number).join(", ") || "N/A"}
            </div>
          </div>

          <div className="room-availability">
            <h3 className="availability-heading">Room Availability</h3>
            {room.roomNumbers?.map(({ number, unavailableDates }) => (
              <div key={number} className="availability-item">
                <div className="availability-room-number">
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
        </div>
      ) : (
        !error && <p className="loading">Loading room data...</p>
      )}
      <div className="book-now-wrapper">
  {room && (
    <Link to={`/booking/${room._id}`} className="book-now-btn">
      Book Now
    </Link>
  )}
</div>
    </div>
  );
};

export default Room;
