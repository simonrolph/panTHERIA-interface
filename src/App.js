import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Orders from "./components/Orders";
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
        <main>
          <Router>
            <Home path="/" />
            <Orders
              path="/choose-order"
              allData={WR93}
              orders={this.getTaxa("MSW93_Order", WR93)}
            />
            <Families
              path="/:order_name"
              allData={WR93}
              getTaxa={this.getTaxa}
            />
            <Genera
              path="/:order_name/:family_name"
              allData={WR93}
              getTaxa={this.getTaxa}
            />
            <Species
              path="/:order_name/:family_name/:genus_name"
              allData={WR93}
              getTaxa={this.getTaxa}
              convertBinomial={this.convertBinomial}
            />
            <IndividualSpecies
              path="/:order_name/:family_name/:genus_name/:binomial"
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

  getTaxa = (level, dataArray) => {
    const result = [];
    const map = new Map();
    for (const item of dataArray) {
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

  convertBinomial = (binomial, convertToUnderscore) => {
    if (convertToUnderscore) {
      return binomial.replace(" ", "_");
    } else {
      return binomial.replace("_", " ");
    }
  };

  getSpeciesData = binomial => {
    return WR93.filter(species => species["MSW93_Binomial"] === binomial);
  };
}

export default App;
