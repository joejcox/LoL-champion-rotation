import React from "react";
import { Link } from "react-router-dom";

const MainNav = (props) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h2 className="title has-text-black">{props.siteName}</h2>
        </Link>

        {/* <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item has-text-black" to="/about">
            About
          </Link>
          <Link className="navbar-item has-text-black" to="/contact">
            Contact
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">{props.statsButtonText}</div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
