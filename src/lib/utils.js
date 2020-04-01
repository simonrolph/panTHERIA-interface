const axios = require('axios');

const redlistBaseURL = 'https://apiv3.iucnredlist.org';
const iNaturalistBaseURL = 'https://api.inaturalist.org/v1/';

exports.getIUCNstatus = (endpoint) => {
  return axios.get(`${redlistBaseURL}/......`)
}

exports.getiNaturalistData = (speciesBinomial) => {
  return axios.get(`${iNaturalistBaseURL}taxa?q=${speciesBinomial}&taxon_id=40151&rank=species`).then((result) => {
    let records = result.data.results;
    if (records.length ) {
      let image = records[0].default_photo ? records[0].default_photo.medium_url : null;
      let commonName = records[0].preferred_common_name;
    return { image, commonName };
    } else {
      return;
    }
  })
}