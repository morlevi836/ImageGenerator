import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css";
import { useState } from "react";

function Dashboard() {
  let location = useLocation();
  let { state } = location;

  const [firstName, setFirstName] = useState(state?.first_name || "");

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
        <div className="header__Login">
          {firstName === "" ? (
            <>
              <button className="header__Button">
                <NavLink to="/login" className="nav__Link">
                  login
                </NavLink>
              </button>
              <NavLink to="/register" className="nav__Link">
                register
              </NavLink>
            </>
          ) : (
            <>
              <h1 className="Title__Name">Hello {firstName}</h1>
              <img
                className="LogOut__Logo"
                src="logout.png"
                alt="logout"
                draggable="false"
                onClick={() => setFirstName("")}
              />
            </>
          )}
        </div>
      </header>

      <nav className="Nav">
        <ul className="Nav__ul">
          <li className="Nav__li">
            <NavLink to="/" className="Nav__Link" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className="Nav__li">
            <NavLink
              to="/search"
              className="Nav__Link"
              activeClassName="active"
            >
              Search
            </NavLink>
          </li>
          <li className="Nav__li">
            <NavLink
              to="/favorite"
              className="Nav__Link"
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
