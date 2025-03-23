import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file

export const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow-sm fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            🍳 Recipe App
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link text-white py-2 px-3 nav-custom ${
                      isActive ? "active-nav" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    `nav-link text-white py-2 px-3 nav-custom ${
                      isActive ? "active-nav" : ""
                    }`
                  }
                >
                  Add Recipe
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link text-white py-2 px-3 nav-custom ${
                      isActive ? "active-nav" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <button
                  onClick={logout}
                  className="btn btn-logout text-white py-2 px-3 nav-custom"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
