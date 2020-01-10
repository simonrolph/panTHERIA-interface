import React, { Component } from "react";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

class IndividualSpecies extends Component {
  state = {
    data: [],
    species: "",
    references: "",
  };
  render() {
    const { data, species } = this.state;
    const { order_name, family_name, genus_name, binomial } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <Breadcrumb
          dataArray={data}
          binomial={binomial}
          order_name={order_name}
          family_name={family_name}
          genus_name={genus_name}
          species={species}
        />
        <div className="content-container">
          <h1>
            <i>{species}</i>
          </h1>
          <table>
            <tbody>{this.createTable()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }

  createTable = () => {
    const { data } = this.state;
    let speciesData = data;
    let table = [];
    for (let key in speciesData) {
      table.push(
        <tr className="dataTable__row" key={key}>
          <td className="dataTable__data--key">{key}</td>
          <td className="dataTable__data--value">
            {speciesData[key] === -999 ? "Unknown" : speciesData[key]}{" "}
          </td>
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
    const convertedKeysData = this.dataTranslator(speciesData);
    const references = speciesData[0]["References"].split(";");
    this.setState({
      data: convertedKeysData,
      species: convertedBinomial,
      references: references,
    });
    this.createTable();
  };

  dataTranslator = speciesData => {
    const converter = {
      MSW05_Order: "Order",
      MSW05_Family: "Family",
      MSW05_Genus: "Genus",
      MSW05_Species: "Species",
      MSW05_Binomial: "Binomial",
      "X1.1_ActivityCycle": "Activity Cycle",
      "X5.1_AdultBodyMass_g": "Adult Body Mass (g)",
      "X8.1_AdultForearmLen_mm": "Adult Forearm Length (mm)",
      "X13.1_AdultHeadBodyLen_mm": "Adult Head Body Length (mm)",
      "X2.1_AgeatEyeOpening_d": "Age at Eye Opening (days)",
      "X3.1_AgeatFirstBirth_d": "Age at First Birth (days)",
      "X18.1_BasalMetRate_mLO2hr": "Basal Metabolic Rate (mLO2hr)",
      "X5.2_BasalMetRateMass_g": "Basal Metabolic Rate Mass (g)",
      "X6.1_DietBreadth": "Diet Breadth",
      "X7.1_DispersalAge_d": "Dispersal Age (days)",
      "X9.1_GestationLen_d": "Gestation length (days)",
      "X12.1_HabitatBreadth": "Habitat Breadth",
      "X22.1_HomeRange_km2": "Home Range (groups or individuals, km2)",
      "X22.2_HomeRange_Indiv_km2": "Home Range (individuals, km2)",
      "X14.1_InterbirthInterval_d": "Interbirth Interval (days)",
      "X15.1_LitterSize": "Litter size",
      "X16.1_LittersPerYear": "Litters per year",
      "X17.1_MaxLongevity_m": "Max Longevity",
      "X5.3_NeonateBodyMass_g": "Neonatal Body Mass (g)",
      "X13.2_NeonateHeadBodyLen_mm": "Neonatal Head Body Length (mm)",
      "X21.1_PopulationDensity_n.km2": "Population density (n/km2)",
      "X10.1_PopulationGrpSize": "Population Group Size",
      "X23.1_SexualMaturityAge_d": "Sexual Maturity Age (days)",
      "X10.2_SocialGrpSize": "Social Group Size",
      "X24.1_TeatNumber": "Teat Number",
      "X12.2_Terrestriality": "Terrestriality",
      "X6.2_TrophicLevel": "Trophic Level",
      "X25.1_WeaningAge_d": "Weaning Age (days)",
      "X5.4_WeaningBodyMass_g": "Weaning Body Mass (g)",
      "X13.3_WeaningHeadBodyLen_mm": "Weaning Head Body Length (mm)",
      "X5.5_AdultBodyMass_g_EXT": "Adult Body Mass (g)",
      "X16.2_LittersPerYear_EXT": "Litters Per Year",
      "X5.6_NeonateBodyMass_g_EXT": "Neonatal Body Mass (g)",
      "X5.7_WeaningBodyMass_g_EXT": "Weaning Body Mass (g)",
      "X26.1_GR_Area_km2": "Geographic Range Area (km2)",
      "X26.2_GR_MaxLat_dd": "Geographic Range Max Latitude (decimal degrees)",
      "X26.3_GR_MinLat_dd": "Geographic Range Min Latitude (decimal degrees)",
      "X26.4_GR_MidRangeLat_dd":
        "Geographic Range Mid Range Latitude (decimal degrees)",
      "X26.5_GR_MaxLong_dd": "Geographic Range Max Longitude (decimal degrees)",
      "X26.6_GR_MinLong_dd": "Geographic Range Min Longitude (decimal degrees)",
      "X26.7_GR_MidRangeLong_dd":
        "Geographic Range Mid Range Longitude (decimal degrees)",
      "X27.1_HuPopDen_Min_n.km2": "Human Population Density Min (n/km2)",
      "X27.2_HuPopDen_Mean_n.km2": "Human Population Density Mean (n/km2)",
      "X27.3_HuPopDen_5p_n.km2":
        "Human Population Density 5th Percentile (n/km2)",
      "X27.4_HuPopDen_Change": "Human Population Density Change",
      "X28.1_Precip_Mean_mm": "Precipitation Mean (mm)",
      "X28.2_Temp_Mean_01degC": "Temperature Mean (0.1degC)",
      "X30.1_AET_Mean_mm": "Mean Actual Evapotranspiration Rate (mm)",
      "X30.2_PET_Mean_mm": "Mean Potential Evapotranspiration Rate (mm)",
    };
    const activityCycleConverter = {
      1: "Nocturnal only",
      2: "Nocturnal/Crepuscular, Cathemeral, Crepuscular or Diurnal/Crepuscular",
      3: "Diurnal only",
    };
    const terrestrialityConverter = {
      1: "Fossorial and/or ground dwelling only",
      2: "Above ground dwelling",
    };
    const trophicLevelConverter = {
      1: "Herbivore",
      2: "Omnivore",
      3: "Carnivore",
    };
    let speciesDataObj = speciesData[0];
    let convertedKeysSpeciesData = {};
    for (let originalKey in speciesDataObj) {
      for (let unconvertedKey in converter) {
        if (unconvertedKey === originalKey) {
          let convertedKey = converter[unconvertedKey];
          if (unconvertedKey === "X1.1_ActivityCycle") {
            let unconvertedActivityCycle = speciesDataObj[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              activityCycleConverter[unconvertedActivityCycle];
          } else if (unconvertedKey === "X12.2_Terrestriality") {
            let unconvertedTerrestriality = speciesDataObj[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              terrestrialityConverter[unconvertedTerrestriality];
          } else if (unconvertedKey === "X6.2_TrophicLevel") {
            let unconvertedTrophicLevel = speciesDataObj[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              trophicLevelConverter[unconvertedTrophicLevel];
          } else {
            convertedKeysSpeciesData[convertedKey] =
              speciesDataObj[originalKey];
          }
        }
      }
    }

    return convertedKeysSpeciesData;
  };
}

export default IndividualSpecies;
