# nirvana

# saved aggregations:
[
  {
    '$group': {
      '_id': '$state', 
      'total': {
        '$sum': 1
      }
    }
  }, {
    '$sort': {
      'total': -1
    }
  }
]

[
  {
    '$match': {
      'country': 'United States'
    }
  }
]

[
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
            'count': -1
        }
    }
]