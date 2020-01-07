import React, { Component } from "react";
import "./App.scss";
import { Router } from "@reach/router";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Families from "./components/Families";
import Genera from "./components/Genera";
import Species from "./components/Species";
import IndividualSpecies from "./components/IndividualSpecies";
import WR05 from "./data/WR05.json";

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
              allData={WR05}
              orders={this.getTaxa("MSW05_Order", WR05)}
            />
            <Families
              path="/:order_name"
              allData={WR05}
              getTaxa={this.getTaxa}
            />
            <Genera
              path="/:order_name/:family_name"
              allData={WR05}
              getTaxa={this.getTaxa}
            />
            <Species
              path="/:order_name/:family_name/:genus_name"
              allData={WR05}
              getTaxa={this.getTaxa}
              convertBinomial={this.convertBinomial}
            />
            <IndividualSpecies
              path="/:order_name/:family_name/:genus_name/:binomial"
              allData={WR05}
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
          id: item["MSW05_Binomial"],
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
    return WR05.filter(species => species["MSW05_Binomial"] === binomial);
  };
}

export default App;
