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
    // queryTester()
  })
  .catch((err) => {
    console.log(err)
  })

async function queryTester() {

  let result = await con.query(`select * from answers where question_id = 234348`)

  console.log('test', result.rows)
}


const listQuestions = async (req, res) => {

  let result = await con.query(
    `SELECT
    questions.id,
    questions.product_id,
    questions.body,
    questions.date_written,
    questions.asker_name,
    questions.asker_email,
    questions.reported,
    questions.helpful,
    answers
    FROM questions, answers
    WHERE questions.id = answers.question_id
    AND questions.product_id = 66649
    LIMIT 1;
    `
  )

  let data = [];
  result.rows.forEach((item, i) => {
    let copy = item;
    let formatted = (item.answers.slice(1, item.answers.length - 2))
    let split = (formatted.split(','))
    let answerObj = {
      id: split[0],
      test: split[1],
      body: split[2],
      date: split[3],
      answerer_name: split[4],
      helpfulness: split[7]
    }
    copy.answers = answerObj
    data.push(copy)
  })

  res.send(data)
}

const listAnswers = async (req, res) => {
  let result = await con.query(`select * from answers where question_id = 234349`)
  res.send(result.rows)
}

const insertQuestion = async (req, res) => {
  console.log(req.body)
  let body = req.body
  let result = await con.query(`insert into questions (
    body,
    asker_name,
    asker_email,
    product_id,
    date_written,
    reported,
    helpful)
    values (
      '${body.body}',
      '${body.name}',
      '${body.email}',
      ${body.product_id},
      ${4232},
      ${false},
      ${0})`)

  res.send('success adding question')
}

const insertAnswer = async (req, res) => {
  console.log(req.body)
  let body = req.body;
  let result = await con.query(`insert into answers (
    question_id,
    body,
    date_written,
    answerer_name,
    answerer_email,
    reported,
    helpful)
    values (
    ${body.question_id},
    '${body.body}',
    ${24234},
    '${body.name}',
    '${body.email}',
    ${false},
    ${0})`)

  res.send('success adding answer')
}

const markQuestionHelpful = async (req, res) => {
  let body = req.body;

  let result = await con.query(
    `UPDATE questions
    SET helpful = helpful + 1
    WHERE id = ${body.question_id};`)
  res.send(result)
}

const reportQuestion = async (req, res) => {
  let body = req.body;

  let result = await con.query(
    `UPDATE questions
    SET reported = ${true}
    WHERE id = ${body.question_id}`)

  res.send(result)
}

const markAnswerHelpful = async (req, res) => {
  let body = req.body;

  let result = await con.query(
    `UPDATE answers
    SET helpful = helpful + 1
    WHERE id = ${body.question_id}`)

    res.send(result)
}

const reportAnswer = async (req, res) => {
  let body = req.body;

  let result = await con.query(
    `UPDATE answers
    SET reported = ${true}
    WHERE id = ${body.question_id}`)

  res.send(result)
}


module.exports.listQuestions = listQuestions;
module.exports.listAnswers = listAnswers;
module.exports.insertQuestion = insertQuestion;
module.exports.insertAnswer = insertAnswer;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;





