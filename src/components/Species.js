import React, { Component } from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

class Species extends Component {
  state = {
    data: [],
  };
  render() {
    const { order_name, family_name, genus_name, convertBinomial } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        <Breadcrumb
          dataArray={data}
          order_name={order_name}
          family_name={family_name}
          genus_name={genus_name}
        />
        <div className="content-container">
          <h1 className='visuallyhidden'>Species in {genus_name}</h1>
          <section className='taxaListContainer'>
            <ul className='taxaList taxaList--species'>
              {this.state.data.map(animal => {
                return (
                  <li key={animal["id"]} className='taxaItem'>
                    <Link to={`${convertBinomial(animal["id"], true)}`}>
                      {animal["id"]}{'   '}<em className='taxaList__classificationName'>Species</em>
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
    this.getSpecies();
  }

  getSpecies = () => {
    const { allData, getTaxa, genus_name } = this.props;
    const speciesInGenus = allData.filter(taxa => {
      return taxa["MSW05_Genus"] === genus_name;
    });
    const uniqueSpecies = getTaxa("MSW05_Species", speciesInGenus);
    this.setState({ data: uniqueSpecies });
  };
}

export default Species;
