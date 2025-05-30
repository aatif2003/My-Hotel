import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Booking.scss";

const Booking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch booking");
        }
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBooking();
    }
  }, [id]);

  const handleDelete=()=>{
    console.log("Deleted Sucessfully")
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!booking) return <div>No booking found.</div>;

  return (
    <div className="booking-container">
      <h1 className="heading">Booking Details</h1>
      <p className="detail"><strong>Name:</strong> {booking.name}</p>
      <p className="detail"><strong>Email:</strong> {booking.email}</p>
      <p className="detail"><strong>Check-in Date:</strong> {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : "N/A"}</p>
      <p className="detail"><strong>Check-out Date:</strong> {booking.checkoutDate ? new Date(booking.checkoutDate).toLocaleDateString() : "N/A"}</p>
      <button onClick={handleDelete}>Delete</button>
      <button>Confirm</button>
    </div>
  );
};

export default Booking;
