import React, { Component } from 'react';
import Navigation from './Navigation';
import Breadcrumb from './Breadcrumb';
import DataCard from './DataCard';
import Tumbleweed from './Tumbleweed';
import { getIUCNstatus, getiNaturalistPhotos } from '../lib/utils';

class IndividualSpecies extends Component {
  state = {
    data: [],
    ecologyData: {},
    physiologyData: {},
    lifeHistoryData: {},
    geographyData: {},
    unknownData: {},
    species: '',
    references: '',
    showUnknown: false,
    picURL: ''
  };
  render() {
    const {
      data,
      species,
      ecologyData,
      physiologyData,
      lifeHistoryData,
      geographyData,
      unknownData,
      showUnknown,
      picURL,
    } = this.state;
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
        <div className='content-container'>
          <div className='content-container--inner'>
            <h1>
              <i>{species}</i>
            </h1>
            <img src={picURL} alt={binomial} />
            <DataCard data={ecologyData} title="Ecology"/>
            <DataCard data={physiologyData} title="Physiology"/>
            <DataCard data={lifeHistoryData} title="Life History"/>
            <DataCard data={geographyData} title="Geography"/>
            {this.noData(ecologyData, physiologyData, lifeHistoryData, geographyData) && <Tumbleweed />}
            <DataCard data={unknownData} title="Unrecorded Data" showUnknown={showUnknown} toggle={this.toggleUnrecordedData}/>
          
          </div>
        </div>
      </React.Fragment>
    );
  }

  toggleUnrecordedData = () => {
    this.setState(prevState => ({
      showUnknown: !prevState.showUnknown,
    }))
  }

  noData = (ecologyData, physiologyData, lifeHistoryData, geographyData) => {
    return (Object.keys(ecologyData).length === 0 && Object.keys(physiologyData).length === 0 && Object.keys(lifeHistoryData).length === 0 && Object.keys(geographyData).length === 0);
  }

  componentDidMount() {
    this.getThatData();
    this.getOtherData(this.props.binomial);
  }

  getThatData = () => {
    const { getSpeciesData, binomial, convertBinomial } = this.props;
    const convertedBinomial = convertBinomial(binomial, false);
    const speciesData = getSpeciesData(convertedBinomial);
    const semanticallyOrganisedData = this.semanticSplit(speciesData);
    const convertedAllData = this.dataTranslator(speciesData);
    const convertedEcologyData = this.dataTranslator(
      semanticallyOrganisedData[0],
    );
    const convertedPhysiologyData = this.dataTranslator(
      semanticallyOrganisedData[1],
    );
    const convertedLifeHistoryData = this.dataTranslator(
      semanticallyOrganisedData[2],
    );
    const convertedGeographyData = this.dataTranslator(
      semanticallyOrganisedData[3],
    );
    const convertedUnknowns = this.dataTranslator(
      semanticallyOrganisedData[4],
    );

    const references = speciesData[0]['References'].split(';');
    this.setState({
      data: convertedAllData,
      ecologyData: convertedEcologyData,
      physiologyData: convertedPhysiologyData,
      lifeHistoryData: convertedLifeHistoryData,
      geographyData: convertedGeographyData,
      unknownData: convertedUnknowns,
      species: convertedBinomial,
      references: references,
    });
  };

  getOtherData = (binomial) => {
    let species = binomial.replace("_", "%20")
    getiNaturalistPhotos(species).then(picURL => this.setState({
      picURL
    }))
  }

  semanticSplit = data => {
    const speciesDataObj = data[0];
    const semanticallySorted = {
      taxonomy: [
        'MSW93_Order',
        'MSW93_Family',
        'MSW93_Genus',
        'MSW93_Species',
        'MSW93_Binomial',
      ],
      ecology: [
        'X1.1_ActivityCycle',
        'X6.1_DietBreadth',
        'X7.1_DispersalAge_d',
        'X12.1_HabitatBreadth',
        'X22.1_HomeRange_km2',
        'X22.2_HomeRange_Indiv_km2',
        'X21.1_PopulationDensity_n.km2',
        'X10.1_PopulationGrpSize',
        'X10.2_SocialGrpSize',
        'X12.2_Terrestriality',
        'X6.2_TrophicLevel',
      ],
      physiology: [
        'X5.1_AdultBodyMass_g',
        'X8.1_AdultForearmLen_mm',
        'X13.1_AdultHeadBodyLen_mm',
        'X2.1_AgeatEyeOpening_d',
        'X18.1_BasalMetRate_mLO2hr',
        'X5.2_BasalMetRateMass_g',
        'X5.3_NeonateBodyMass_g',
        'X13.2_NeonateHeadBodyLen_mm',
        'X24.1_TeatNumber',
        'X5.4_WeaningBodyMass_g',
        'X13.3_WeaningHeadBodyLen_mm',
        'X5.5_AdultBodyMass_g_EXT',
        'X5.6_NeonateBodyMass_g_EXT',
        'X5.7_WeaningBodyMass_g_EXT',
      ],
      lifeHistory: [
        'X3.1_AgeatFirstBirth_d',
        'X9.1_GestationLen_d',
        'X14.1_InterBirthInterval_d',
        'X15.1_LitterSize',
        'X16.1_LittersPerYear',
        'X17.1_MaxLongevity_m',
        'X23.1_SexualMaturityAge_d',
        'X25.1_WeaningAge_d',
        'X16.2_LittersPerYear_EXT',
      ],
      geography: [
        'X26.1_GR_Area_km2',
        'X26.2_GR_MaxLat_dd',
        'X26.3_GR_MinLat_dd',
        'X26.4_GR_MRLat_dd',
        'X26.5_GR_MaxLong_dd',
        'X26.6_GR_MinLong_dd',
        'X26.7_GR_MRLong_dd',
        'X27.1_HuPopDen_Min_n.km2',
        'X27.2_HuPopDen_Mean_n.km2',
        'X27.3_HuPopDen_5p_n.km2',
        'X27.4_HuPopDen_Change',
        'X28.1_Precip_Mean_mm',
        'X28.2_Temp_Mean_01degC',
        'X30.1_AET_Mean_mm',
        'X30.2_PET_Mean_mm',
      ],
    };
    let ecologyData = {};
    let physiologyData = {};
    let lifeHistoryData = {};
    let geographyData = {};
    let unknownData = {};
    for (let tag in semanticallySorted) {
      for (let i = 0; i < semanticallySorted[tag].length; i++) {
        for (let key in speciesDataObj) {
          if (semanticallySorted[tag][i] === key) {
            if (speciesDataObj[key] === -999) {
              unknownData[key] = 'Unknown';
            } else {
            switch (tag) {
              case 'ecology':
                ecologyData[key] = speciesDataObj[key];
                break;
              case 'physiology':
                physiologyData[key] = speciesDataObj[key];
                break;
              case 'lifeHistory':
                lifeHistoryData[key] = speciesDataObj[key];
                break;
              default:
                geographyData[key] = speciesDataObj[key];
            }
            }
          }
        }
      }
    }
    return [ecologyData, physiologyData, lifeHistoryData, geographyData, unknownData];
  };



  dataTranslator = speciesData => {
    const converter = {
      'MSW05_Order': 'Order',
      'MSW05_Family': 'Family',
      'MSW05_Genus': 'Genus',
      'MSW05_Species': 'Species',
      'MSW05_Binomial': 'Binomial',
      'X1.1_ActivityCycle': 'Activity Cycle',
      'X5.1_AdultBodyMass_g': 'Adult Body Mass (g)',
      'X8.1_AdultForearmLen_mm': 'Adult Forearm Length (mm)',
      'X13.1_AdultHeadBodyLen_mm': 'Adult Head Body Length (mm)',
      'X2.1_AgeatEyeOpening_d': 'Age at Eye Opening (days)',
      'X3.1_AgeatFirstBirth_d': 'Age at First Birth (days)',
      'X18.1_BasalMetRate_mLO2hr': 'Basal Metabolic Rate (mLO₂hr)',
      'X5.2_BasalMetRateMass_g': 'Basal Metabolic Rate Mass (g)',
      'X6.1_DietBreadth': 'Diet Breadth',
      'X7.1_DispersalAge_d': 'Dispersal Age (days)',
      'X9.1_GestationLen_d': 'Gestation length (days)',
      'X12.1_HabitatBreadth': 'Habitat Breadth',
      'X22.1_HomeRange_km2': 'Home Range (groups or individuals, ㎢)',
      'X22.2_HomeRange_Indiv_km2': 'Home Range (individuals, ㎢)',
      'X14.1_InterbirthInterval_d': 'Interbirth Interval (days)',
      'X15.1_LitterSize': 'Litter size',
      'X16.1_LittersPerYear': 'Litters per year',
      'X17.1_MaxLongevity_m': 'Max Longevity',
      'X5.3_NeonateBodyMass_g': 'Neonatal Body Mass (g)',
      'X13.2_NeonateHeadBodyLen_mm': 'Neonatal Head Body Length (mm)',
      'X21.1_PopulationDensity_n.km2': 'Population density (n/㎢)',
      'X10.1_PopulationGrpSize': 'Population Group Size',
      'X23.1_SexualMaturityAge_d': 'Sexual Maturity Age (days)',
      'X10.2_SocialGrpSize': 'Social Group Size',
      'X24.1_TeatNumber': 'Teat Number',
      'X12.2_Terrestriality': 'Terrestriality',
      'X6.2_TrophicLevel': 'Trophic Level',
      'X25.1_WeaningAge_d': 'Weaning Age (days)',
      'X5.4_WeaningBodyMass_g': 'Weaning Body Mass (g)',
      'X13.3_WeaningHeadBodyLen_mm': 'Weaning Head Body Length (mm)',
      'X5.5_AdultBodyMass_g_EXT': 'Extrapolated Adult Body Mass (g)',
      'X16.2_LittersPerYear_EXT': 'Extrapolated Litters Per Year',
      'X5.6_NeonateBodyMass_g_EXT': 'Extrapolated Neonatal Body Mass (g)',
      'X5.7_WeaningBodyMass_g_EXT': 'Extrapolated Weaning Body Mass (g)',
      'X26.1_GR_Area_km2': 'Geographic Range Area (㎢)',
      'X26.2_GR_MaxLat_dd': 'Geographic Range Max Latitude (DD)',
      'X26.3_GR_MinLat_dd': 'Geographic Range Min Latitude (DD)',
      'X26.4_GR_MidRangeLat_dd':
        'Geographic Range Mid Range Latitude (DD)',
      'X26.5_GR_MaxLong_dd': 'Geographic Range Max Longitude (DD)',
      'X26.6_GR_MinLong_dd': 'Geographic Range Min Longitude (DD)',
      'X26.7_GR_MidRangeLong_dd':
        'Geographic Range Mid Range Longitude (DD)',
      'X27.1_HuPopDen_Min_n.km2': 'Human Population Density Min (n/㎢)',
      'X27.2_HuPopDen_Mean_n.km2': 'Human Population Density Mean (n/㎢)',
      'X27.3_HuPopDen_5p_n.km2':
        'Human Population Density 5th Percentile (n/㎢)',
      'X27.4_HuPopDen_Change': 'Human Population Density Change',
      'X28.1_Precip_Mean_mm': 'Precipitation Mean (mm)',
      'X28.2_Temp_Mean_01degC': 'Temperature Mean (0.1℃)',
      'X30.1_AET_Mean_mm': 'Mean Actual Evapotranspiration Rate (mm)',
      'X30.2_PET_Mean_mm': 'Mean Potential Evapotranspiration Rate (mm)',
    };
    const activityCycleConverter = {
      1: 'Nocturnal only',
      2: 'Nocturnal/Crepuscular, Cathemeral, Crepuscular or Diurnal/Crepuscular',
      3: 'Diurnal only',
    };
    const terrestrialityConverter = {
      1: 'Fossorial and/or ground dwelling only',
      2: 'Above ground dwelling',
    };
    const trophicLevelConverter = {
      1: 'Herbivore',
      2: 'Omnivore',
      3: 'Carnivore',
    };
    speciesData = !Array.isArray(speciesData) ? speciesData : speciesData[0];
    let convertedKeysSpeciesData = {};
    for (let originalKey in speciesData) {
      for (let unconvertedKey in converter) {
        if (unconvertedKey === originalKey) {
          let convertedKey = converter[unconvertedKey];
          if (unconvertedKey === 'X1.1_ActivityCycle') {
            let unconvertedActivityCycle = speciesData[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              activityCycleConverter[unconvertedActivityCycle];
          } else if (unconvertedKey === 'X12.2_Terrestriality') {
            let unconvertedTerrestriality = speciesData[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              terrestrialityConverter[unconvertedTerrestriality];
          } else if (unconvertedKey === 'X6.2_TrophicLevel') {
            let unconvertedTrophicLevel = speciesData[originalKey];
            convertedKeysSpeciesData[convertedKey] =
              trophicLevelConverter[unconvertedTrophicLevel];
          } else {
            convertedKeysSpeciesData[convertedKey] = speciesData[originalKey];
          }
        }
      }
    }
    return convertedKeysSpeciesData;
  };


}

export default IndividualSpecies;
