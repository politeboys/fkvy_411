const { Client } = require('pg');

const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('connected to the database'))
  .catch(err => console.log('error connecting to the database:', err));

module.exports = db;