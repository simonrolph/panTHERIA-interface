import React from "react";
import { Link } from "@reach/router";

const Navigation = props => {
  return (
    <nav>
      <div className="nav-logo-container">
        <p className="nav-logo">
          <Link to="/">PanTHERIA</Link>
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
