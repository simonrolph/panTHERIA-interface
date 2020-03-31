const axios = require('axios');

const redlistBaseURL = 'https://apiv3.iucnredlist.org';
const iNaturalistBaseURL = 'https://api.inaturalist.org/v1/';

exports.getIUCNstatus = (endpoint) => {
  return axios.get(`${redlistBaseURL}/......`)
}

exports.getiNaturalistData = (speciesBinomial) => {
  return axios.get(`${iNaturalistBaseURL}taxa?q=${speciesBinomial}`).then((result) => {
    let image = result.data.results[0].default_photo ? result.data.results[0].default_photo.medium_url : null;
    let commonName = result.data.results[0].preferred_common_name;
    return { image, commonName }
  })
}