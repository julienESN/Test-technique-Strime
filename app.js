const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bonjour!');
});

app.listen(3000, () => {
  console.log("Application en cours d'exécution sur le port 3000");
});

const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'strime',
  user: 'strime',
  password: 'strime',
});
