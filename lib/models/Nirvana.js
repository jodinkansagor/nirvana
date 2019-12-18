const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: Date,
  venue: String,
  city: String,
  state: String,
  country: String,
  recorded: String
});

schema.statics.getShowsByState = function(n = 10, order = 'desc') {
  return this.aggregate([
    {
      '$group': {
        '_id': '$state', 
        'total': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'total': order === 'asc' ? 1 : -1
      }
    }, {
      '$limit': n
    }
  ]);
};

schema.statics.getOnlyUSShows = function (n = 10, order = 'desc') {
  return this.aggregate([
    {
      '$match': {
        'country': 'United States'
      }
    }
  ]);
};

module.exports = mongoose.model('Nirvana', schema);
