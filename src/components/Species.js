import React, { Component } from 'react';
import { Link } from '@reach/router';
import Navigation from './Navigation';

class Species extends Component {
  state = {
    data: [],
  };
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className='content-container'>
          <h1>Species in {this.props.genus_name}</h1>
          <ul>
            {this.state.data.map(animal => {
              return (
                <li key={animal['id']}>
                  <Link
                    to={`${this.props.convertBinomial(animal['id'], true)}`}
                  >
                    {animal['id']}
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
    this.getSpecies();
  }

  getSpecies = () => {
    const { allData, getTaxa, genus_name } = this.props;
    const speciesInGenus = allData.filter(taxa => {
      return taxa['MSW93_Genus'] === genus_name;
    });
    const uniqueSpecies = getTaxa('MSW93_Species', speciesInGenus);
    this.setState({ data: uniqueSpecies });
  };
}

export default Species;
