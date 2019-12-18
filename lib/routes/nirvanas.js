const { Router } = require('express');
const Nirvana = require('../models/Nirvana');

module.exports = Router()

  .post('/', (req, res, next) => {
    Nirvana
      .create(req.body)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })

  .get('/state', (req, res, next) => {
    const { count = 10, order = 'desc' } = req.query;
    Nirvana
      .getShowsByState(Number(count), order)
      .then(showsByState => res.send(showsByState))
      .catch(next);
  })

  .get('/us', (req, res, next) => {
    const { count = 10 } = req.query;
    Nirvana
      .getOnlyUSShows(Number(count))
      .then(usShows => res.send(usShows))
      .catch(next);
  })

  .get('/year', (req, res, next) => {
    const { order = 'desc' } = req.query;
    Nirvana
      .getShowsByYear(order)
      .then(showsByYear => res.send(showsByYear))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Nirvana
      .findById(req.params.id)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Nirvana
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(nirvanas => res.send(nirvanas))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Nirvana
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Nirvana
      .findByIdAndDelete(req.params.id)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  });
