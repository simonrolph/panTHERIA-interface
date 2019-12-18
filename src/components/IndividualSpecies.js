import React, { Component } from "react";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

class IndividualSpecies extends Component {
  state = {
    data: [],
    species: "",
  };
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Breadcrumb
          dataArray={this.state.data}
          binomial={this.props.binomial}
        />
        <div className="content-container">
          <h1>{this.state.species}</h1>
          <table>
            <tbody>{this.createTable()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  createTable = () => {
    const { data } = this.state;
    let speciesData = data[0];
    let table = [];
    for (let key in speciesData) {
      table.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{speciesData[key] === -999 ? "Unknown" : speciesData[key]} </td>
        </tr>
      );
    }
    return table;
  };

  componentDidMount() {
    this.getThatData();
  }

  getThatData = () => {
    const { getSpeciesData, binomial, convertBinomial } = this.props;
    const convertedBinomial = convertBinomial(binomial, false);
    const speciesData = getSpeciesData(convertedBinomial);
    this.setState({
      data: speciesData,
      species: convertedBinomial,
    });
    this.createTable();
  };
}

export default IndividualSpecies;
