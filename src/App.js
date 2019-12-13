import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Families from "./components/Families";
import Genera from "./components/Genera";
import Species from "./components/Species";
import IndividualSpecies from "./components/IndividualSpecies";
import WR93 from "./data/WR93.json";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Navigation />

        <main>
          <Router>
            <Home
              path="/"
              allData={WR93}
              leveltaxa={this.getTaxa("MSW93_Order")}
            />
            <Families
              path="/:order_name"
              allData={WR93}
              leveltaxa={this.getTaxa("MSW93_Family")}
            />
            <Genera
              path="/:order_name/:family_name"
              allData={WR93}
              leveltaxa={this.getTaxa("MSW93_Genus")}
            />
            <Species
              path="/:order_name/:family_name/:genera_name"
              allData={WR93}
              leveltaxa={this.getTaxa("MSW93_Binomial")}
              convertBinomial={this.convertBinomial}
            />
            <IndividualSpecies
              path="/:order_name/:family_name/:genera_name/:binomial"
              allData={WR93}
              getSpeciesData={this.getSpeciesData}
              convertBinomial={this.convertBinomial}
            />
          </Router>
        </main>

        <Footer />
      </div>
    );
  }

  // chooseOrder = chosenOrder => {
  //   const animalsInChosenOrder = WR93.filter(animal => {
  //     return animal["MSW93_Order"] === chosenOrder;
  //   });

  //   this.setState({
  //     animalsInChosenOrder: animalsInChosenOrder,
  //     chosenOrder: chosenOrder,
  //   });
  // };

  getTaxa = level => {
    const result = [];
    const map = new Map();
    for (const item of WR93) {
      if (!map.has(item[level])) {
        map.set(item[level], true);
        result.push({
          classification: item[level],
          id: item["MSW93_Binomial"],
        });
      }
    }
    return result;
  };

  convertBinomial = binomialWithSpace => {
    return binomialWithSpace.replace(" ", "_");
  };

  getSpeciesData = binomial => {
    return WR93.filter(species => species["MSW93_Binomial"] === binomial);
  };
}

export default App;
