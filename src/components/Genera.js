import React, { Component } from "react";
import { Link } from "@reach/router";

class Genera extends Component {
  state = {};
  render() {
    return (
      <div className="content-container">
        <ul>
          {this.props.leveltaxa.map(animal => {
            return (
              <li key={animal["id"]}>
                <Link to={`${animal["classification"]}`}>
                  {animal["classification"]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genera;
