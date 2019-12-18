const { Router } = require('express');
const Nirvana = require('../models/Nirvana');

module.exports = Router()

  .post('/', (req, res, next) => {
    Nirvana
      .create(req.body)
      .then(nirvana => res.send(nirvana))
      .catch(next);
  })


