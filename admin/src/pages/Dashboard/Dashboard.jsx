import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchBookingById } from "../../features/booking/bookingSlice";
import BooKingList from "../../component/BookingList/BooKingList";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { booking = [] } = useSelector((state) => state.booking); // default to empty array

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchBookingById());
  }, [user, navigate, dispatch]);

   const handleAction = (booking) => {
    console.log("View clicked for booking:", booking);
    // You can navigate or open modal etc.
  };

  return (
    <div>
      <h1 className="heading center">Dashboard</h1>
      {booking.length > 0 ? <BooKingList data={booking} onAction={handleAction}  /> : <p>No bookings found.</p>}
    </div>
  );
};

export default Dashboard;
