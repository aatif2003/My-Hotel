import "./App.style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./component/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoom from "./pages/createRoom";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import Edit from "./pages/Edit/Edit";
import Booking from "./pages/Booking/Booking";

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/all/:id" element={<Room />} />
          <Route path="/room/edit/:id" element={<Edit/>} />
          <Route path="/booking/:id" element={<Booking/>} />
        </Routes>
        
      </Router>
    </div>
  );
}


