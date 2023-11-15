import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <header>
        <NavLink to="/">
          <img
            className="header__Logo"
            src="Logo.png"
            alt="logo"
            draggable="false"
          />
        </NavLink>
        <h1 className="header__Title">Image Generator</h1>
        <div>
          <button className="header__Button">
            <NavLink to="/login" className="nav__Link">
              login
            </NavLink>
          </button>
          <NavLink to="/register" className="nav__Link">
            register
          </NavLink>
        </div>
      </header>
      <nav>
        <ul className="nav__ul">
          <li className="nav__li">
            <NavLink to="/" className="nav__Link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="nav__li">
            <NavLink
              to="/search"
              className="nav__Link"
              activeClassName="active"
            >
              Search
            </NavLink>
          </li>
          <li className="nav__li">
            <NavLink
              to="/favorite"
              className="nav__Link"
              activeClassName="active"
            >
              favorite
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Dashboard;
