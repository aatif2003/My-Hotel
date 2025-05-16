import "./RoomList.scss";
import { Link } from "react-router-dom";

const RoomList = ({ data }) => {
  return (
    <div className="room-list">
      {data.map((item) => (
        <Link to={`/room/all/${item._id}`} key={item._id} className="room-card">
          {item.images?.[0] && <img src={item.images[0]} alt={item.name} />}
          <div className="info">
            <p className="name">{item.name}</p>
            <p className="price">${item.price} / night</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RoomList;

