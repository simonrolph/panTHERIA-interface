import React, { Component } from "react";

class IndividualSpecies extends Component {
  state = {};
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>label</th>
              <th>data</th>
            </tr>
            {this.createTable()}
          </tbody>
        </table>
      </div>
    );
  }

  getThatData = () => {
    const { getSpeciesData, binomial, convertBinomial } = this.props;
    const convertedBinomial = convertBinomial(binomial);
    getSpeciesData(binomial).then(data => {
      this.setState({
        binomial: binomial,
        data: data,
      });
    });
  };

  createTable = () => {
    const { data } = this.state;
    let table = [];
    for (let key in data) {
      table.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{data[key]}</td>
        </tr>
      );
    }
    return table;
  };
}

export default IndividualSpecies;
