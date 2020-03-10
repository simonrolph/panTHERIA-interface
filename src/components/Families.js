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
          <h1 className='visuallyhidden'>Families in {order_name}</h1>
          <section className='taxaListContainer'>
            <ul className='taxaList taxaList--families'>
              {data.map(animal => {
                return (
                  <li key={animal["id"]} className='taxaItem'>
                    <Link to={`${animal["classification"]}`}>
                      {animal["classification"]} {'   '}<em className='taxaList__classificationName'>Family</em>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
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
      return taxa["MSW05_Order"] === order_name;
    });
    const uniqueFamilies = getTaxa("MSW05_Family", familiesInOrder);
    this.setState({ data: uniqueFamilies });
  };
}

export default Families;
