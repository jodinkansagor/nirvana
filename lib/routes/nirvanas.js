const { Router } = require('express');
const Nirvana = require('../models/Nirvana');

module.exports = Router()

  .post('/', (req, res, next) => {
    Nirvana
      .create(req.body)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Nirvana
      .findById(req.params.id)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Nirvana
      .find()
      .then(nirvanas => res.send(nirvanas))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Nirvana
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })