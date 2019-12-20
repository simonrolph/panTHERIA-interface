import React, { Component } from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

class Families extends Component {
  state = {
    data: [],
  };
  render() {
    const { order_name, family_name } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        <Breadcrumb
          dataArray={data}
          order_name={order_name}
          family_name={family_name}
        />
        <div className="content-container">
          <h1>Families in {order_name}</h1>
          <ul>
            {data.map(animal => {
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
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getFamilies();
  }

  getFamilies = () => {
    const { allData, getTaxa, order_name } = this.props;
    const familiesInOrder = allData.filter(taxa => {
      return taxa["MSW93_Order"] === order_name;
    });
    const uniqueFamilies = getTaxa("MSW93_Family", familiesInOrder);
    this.setState({ data: uniqueFamilies });
  };
}

export default Families;
