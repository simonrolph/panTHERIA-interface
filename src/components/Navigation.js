import React from "react";
import { Link } from "@reach/router";
import "../App.css";

const Navigation = props => {
  return (
    <nav>
      <div className="nav-logo-container">
        <p className="nav-logo">
          <Link to="/">Pantheria</Link>
        </p>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/choose-order">Browse taxa</Link>
      </div>
    </nav>
  );
};

export default Navigation;
