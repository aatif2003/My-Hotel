import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../features/room/roomSlice';
import RoomList from "../../component/RoomList/RoomList";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, isError, message } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <div>
      <h1 className="heading center">Rooms</h1>

      {isError && <p style={{ color: 'red' }}>{message}</p>}

      {rooms && rooms.length > 0 ? (
        <RoomList data={rooms} />
      ) : (
        <p>No rooms available.</p>
      )}
    </div>
  );
};

export default Rooms;
