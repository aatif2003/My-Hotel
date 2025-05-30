import './Booking.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, clearBooking } from '../../features/booking/bookingSlice';
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { isLoading, error, booking } = useSelector((state) => state.booking);

  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkInDate: '',
    checkoutDate: '',
  });

  const { name, email, checkInDate, checkoutDate } = formData;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) throw new Error('Failed to fetch room');
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchRoom();
  }, [id]);

 useEffect(() => {
  if (booking) {
    alert('Booking successful!');
    dispatch(clearBooking());
    navigate("/success");
  }
}, [booking, dispatch, navigate]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      roomId: id,
      name,
      email,
      checkInDate,
      checkoutDate,
    };

    dispatch(createBooking(dataToSubmit));
  };

  return (
    <div className="booking-container">
      <h1 className="heading">Book Now</h1>

      {room && (
        <div>
          <h2>{room.name}</h2>
          <p>Price: ${room.price}</p>
        </div>
      )}

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="checkInDate">Check-in Date</label>
            <input
              type="date"
              name="checkInDate"
              value={checkInDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="checkoutDate">Check-out Date</label>
            <input
              type="date"
              name="checkoutDate"
              value={checkoutDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Room'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Booking;
