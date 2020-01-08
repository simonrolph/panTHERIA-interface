import React, { Component } from "react";
import Navigation from "./Navigation";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="content-container">
          <h1>Home component here</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
