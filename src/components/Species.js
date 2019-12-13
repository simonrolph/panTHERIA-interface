import React, { Component } from "react";
import { Link } from "@reach/router";

class Species extends Component {
  state = {};
  render() {
    return (
      <div className="content-container">
        <ul>
          {this.props.leveltaxa.map(animal => {
            return (
              <li key={animal["id"]}>
                <Link
                  to={`${this.props.convertBinomial(animal["classification"])}`}
                >
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

export default Species;
