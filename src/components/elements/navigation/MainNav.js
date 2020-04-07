import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainNav.css";

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    let classes;
    this.state.isOpen
      ? (classes = "navbar-menu is-active")
      : (classes = "navbar-menu");
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h2 className="title has-text-black">{this.props.siteName}</h2>
          </Link>

          <button
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="mainNavigation"
            onClick={() => this.toggleMenu()}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="mainNavigation" className={classes}>
          <div className="navbar-start">
            <Link className="navbar-item has-text-black" to="/">
              Home
            </Link>
            <Link className="navbar-item has-text-black" to="/about">
              About
            </Link>
            <Link className="navbar-item has-text-black" to="/contact">
              Contact
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">{this.props.statsButtonText}</div>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainNav;
