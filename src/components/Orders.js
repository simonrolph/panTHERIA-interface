import React, { Component } from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation";

class Orders extends Component {
  state = {};
  render() {
    const { orders } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <div className="content-container">
          <h1>Orders</h1>
          <ul>
            {orders.map(animal => {
              return (
                <li key={animal["id"]}>
                  <Link to={`/${animal["classification"]}`}>
                    {animal["classification"]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Orders;
