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

schema.statics.getOnlyUSShows = function() {
  return this.aggregate([
    {
      '$match': {
        'country': 'United States'
      }
    }
  ]);
};

schema.statics.getShowsByYear = function(order = 'desc') {
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date',
            'format': '%Y'
          }
        },
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': order === 'asc' ? 1 : -1
      }
    }
  ]);
};

module.exports = mongoose.model('Nirvana', schema);
