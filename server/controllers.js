// var { con } = require('../con');
const { Client, Pool } = require('pg');

const con = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'SDCV2',
  user: 'justinturkaly',
  password: '0000000'
});

con.connect()
.then(() => {
  console.log('connected to DB V2')
})
.catch((err) => {
  console.log(err)
})


const listQuestions = async (req, res) => {
  console.log('getting questions', req.body)
  let questions = {};
  questions.product_id = req.body.product_id;
  questions.page = Number(req.body.page) || 1;
  questions.count = Number(req.body.count) || 5;
  questions.results = [];

  let result = await con.query(
    `select * from questions
    where product_id = ${req.body.product_id}
    limit ${questions.count}`)

  res.send(result)
}