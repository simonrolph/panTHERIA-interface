import React from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation";

const Orders = props => {
  const { orders } = props;

  return (
    <React.Fragment>
      <Navigation />
      <div className="content-container">
        <h1 className='visuallyhidden'>Orders</h1>
        <section className='taxaListContainer'>
          <ul className='taxaList taxaList--orders'>
            {orders.map(animal => {
              return (
                <li key={animal["id"]} className='taxaItem'>
                  <Link to={`/${animal["classification"]}`}>
                    {animal["classification"]} {'   '}<em className='taxaList__classificationName'>Order</em>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Orders;
