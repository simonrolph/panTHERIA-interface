import React, { Component } from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

class Genera extends Component {
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
          <h1>Genera in {family_name}</h1>
          <ul>
            {this.state.data.map(animal => {
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
    this.getGenera();
  }

  getGenera = () => {
    const { allData, getTaxa, family_name } = this.props;
    const generaInFamily = allData.filter(taxa => {
      return taxa["MSW93_Family"] === family_name;
    });
    const uniqueGenera = getTaxa("MSW93_Genus", generaInFamily);
    this.setState({ data: uniqueGenera });
  };
}

export default Genera;
