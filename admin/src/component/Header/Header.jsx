import { Link } from "react-router-dom";
import "./header.style.scss";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice"; // Import logout action
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className='main-header'>
      <div className="container">
        <Link to="/"> 
          <h1 className="logo">Loyal Tiger Inn</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/rooms/create">Create</Link> {/* Fixed 'crate' to 'create' */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
