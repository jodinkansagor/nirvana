const csv = require('csvtojson');
const moment = require('moment');
const Nirvana = require('../models/Nirvana');

function seedData() {
  return csv({ delimeter: ',' })
    .fromFile(__dirname + '/../../csv/nirvana.csv')
    .then(csvToJsonFiles => {
      const shows = csvToJsonFiles
        .map(show => ({
          date: moment(`${show.Date}`, 'MM/DD/YYYY').toISOString(),
          venue: show.venue,
          city: show.City,
          state: show.State,
          country: show.Country,
          recorded: show['Recording Surfaced']
        }));
      return Nirvana.create(shows);
    })
    .then(() => console.log('done'));
}

module.exports = {
  seedData
};
