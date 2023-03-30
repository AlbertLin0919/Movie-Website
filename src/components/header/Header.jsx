import "./Header.css";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1EXC-mPtZBKBAgxdrnCVWhZhpyMQ3qkq9A&usqp=CAU"
            alt="header-logo"
            className="header__logo"
          />
        </Link>
        <NavLink to="/movies/now_playing">
          <span>上映中</span>
        </NavLink>
        <NavLink to="/movies/popular">
          <span>最受歡迎</span>
        </NavLink>
        <NavLink to="/movies/top_rated">
          <span>最高評價</span>
        </NavLink>
        <NavLink to="/movies/upcoming">
          <span>即將上映</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
