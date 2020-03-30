const axios = require('axios');

const redlistBaseURL = 'https://apiv3.iucnredlist.org';
const iNaturalistBaseURL = 'https://api.inaturalist.org/v1/';

exports.getIUCNstatus = (endpoint) => {
  return axios.get(`${redlistBaseURL}/......`)
}

exports.getiNaturalistPhotos = (speciesBinomial) => {
  return axios.get(`${iNaturalistBaseURL}taxa?q=${speciesBinomial}`).then((result) => {
    return result.data.results[0].default_photo.medium_url;
  })
}