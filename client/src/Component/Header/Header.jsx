import { Link } from "react-router-dom";
import "./header.style.scss";

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo-link">
          <img src="/images/logo.png" alt="Loyal Tiger Inn" className="logo" />
          <h1 className="logo-text">Loyal Tiger Inn</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
