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
          <h1 className='visuallyhidden'>Genera in {family_name}</h1>
          <section className='taxaListContainer'>
            <ul className='taxaList taxaList--genera'>
              {this.state.data.map(animal => {
                return (
                  <li key={animal["id"]} className='taxaItem'>
                    <Link to={`${animal["classification"]}`}>
                      {animal["classification"]}{'   '}<em className='taxaList__classificationName'>Genus</em>
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
    this.getGenera();
  }

  getGenera = () => {
    const { allData, getTaxa, family_name } = this.props;
    const generaInFamily = allData.filter(taxa => {
      return taxa["MSW05_Family"] === family_name;
    });
    const uniqueGenera = getTaxa("MSW05_Genus", generaInFamily);
    this.setState({ data: uniqueGenera });
  };
}

export default Genera;
