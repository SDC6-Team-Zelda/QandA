const { Client } = require('pg');
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'sdcfirstiteration',
  user: 'justinturkaly',
  password: '0000000'
};
const client = new Client(connection);
client.connect()
client.query('SELECT * FROM answers_photos', (err, res) => {
  console.log(err, res)
  client.end()
})