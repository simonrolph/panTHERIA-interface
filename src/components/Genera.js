import React, { Component } from 'react';
import { Link } from '@reach/router';
import Navigation from './Navigation';

class Genera extends Component {
  state = {
    data: [],
  };
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className='content-container'>
          <h1>Genera in {this.props.family_name}</h1>
          <ul>
            {this.state.data.map(animal => {
              return (
                <li key={animal['id']}>
                  <Link to={`${animal['classification']}`}>
                    {animal['classification']}
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
      return taxa['MSW93_Family'] === family_name;
    });
    const uniqueGenera = getTaxa('MSW93_Genus', generaInFamily);
    this.setState({ data: uniqueGenera });
  };
}

export default Genera;
