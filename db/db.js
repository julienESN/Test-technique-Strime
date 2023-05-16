const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'strime',
  user: 'strime',
  password: 'strime',
});

module.exports = db;
