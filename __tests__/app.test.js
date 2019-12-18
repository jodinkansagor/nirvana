require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Nirvana = require('../lib/models/Nirvana')

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let nirvana;
  let date;
  beforeEach(async () => {
    date = new Date();
    nirvana = await Nirvana.create({
      date,
      venue: 'City Gardens',
      city: 'Trenton',
      state: 'New Jersey',
      country: 'United States',
      recorded: 'true'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new nirvana', () => {
    const date = new Date();
    return request(app)
      .post('/api/v1/nirvanas')
      .send({
        date,
        venue: 'City Gardens',
        city: 'Trenton',
        state: 'New Jersey',
        country: 'United States',
        recorded: 'true'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: date.toISOString(),
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          country: 'United States',
          recorded: 'true',
          __v: 0
        });
      });
  });

  it('gets a nirvana show by Id', () => {
    return request(app)
      .get(`/api/v1/nirvanas/${nirvana.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: nirvana.id,
          date: date.toISOString(),
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          country: 'United States',
          recorded: 'true',
          __v: 0
        });
      });
  });

  it('gets all nirvana shows', () => {
    return request(app)
      .get('/api/v1/nirvanas')
      .then(res => {
        expect(res.body).toEqual([{
          _id: nirvana.id,
          date: date.toISOString(),
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          country: 'United States',
          recorded: 'true',
          __v: 0
        }]);
      });
  });

  it('updates a nirvana show', () => {
    return request(app)
      .patch(`/api/v1/nirvanas/${nirvana.id}`)
      .send({ recorded: 'false' })
      .then(res => {
        expect(res.body).toEqual({
          _id: nirvana.id,
          date: date.toISOString(),
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          country: 'United States',
          recorded: 'false',
          __v: 0
        });
      });
  });

});
