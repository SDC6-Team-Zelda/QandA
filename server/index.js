const express = require("express");
const path = require("path");
const { grabQuestions, grabAnswers, grabAllAnswers, insertQuestion, insertAnswer, markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer } = require('../db/index.js')
// const axios = require('axios');
// require("dotenv").config();

let port = 1128;

const app = express();

// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

//List Questions
app.get('/qa/questions', (req, res) => {
  // console.log(req.body)
  grabQuestions(req.body)
  .then((data) => {
    // console.log('sucesfull grab', data)
    // res.send(data)
    grabAnswers(data)
    .then((data) => {
      res.status(200)
      res.send(data)
      // res.send('OK')
      // res.writeHead(200, 'OK')
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

//Answers List
app.get('/qa/answers', (req, res) => {
  // console.log(req.body)
  grabAllAnswers(req.body.question_id)
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err)
  })
})

//Add a Question
app.post('/qa/questions', (req, res) => {
  // console.log('inside post req', req)
  insertQuestion(req.body)
  .then((data) => {
    res.status(201)
    res.send('CREATED')
  })
  .catch((err) => {
    console.log(err)
  })
})

//Add an answer
app.post('/qa/questions/answers', (req, res) => {
  // console.log('TESTEESTAFD', req.body)
  insertAnswer(req.body.params)
  .then((data) => {
    // console.log('succesful insert', data)
    res.status(201)
    res.send('CREATED')
  })
  .catch((err) => {
    console.log(err)
  })
})

//Mark Question as Helpful
app.put('/qa/questions/helpful', (req, res) => {
  console.log(req.body)
  markQuestionHelpful(req.body)
  .then((data) => {
    // console.log('succesful helpful update', data)
    res.status(204)
    res.send('NO CONTENT')
  })
  .catch((err) => {
    console.log(err)
  })
})

//Report Question
app.put('/qa/questions/report', (req, res) => {
  console.log(req.query)
  reportQuestion(req.body)
  .then((data) => {
    // console.log('succesful report', data)
    res.status(204)
    res.end()
  })
  .catch((err) => {
    console.log(err)
  })
})

//Mark Answer as Helpful
app.put('/qa/answers/helpful', (req, res) => {
  // console.log(req.query)
  markAnswerHelpful(req.body)
  .then((data) => {
    // console.log('succesfull answer helpful', data)
    res.status(204)
    res.end()
  })
  .catch((err) => {
    console.log(err)
  })
})

//Report Answer
app.put('/qa/answers/report', (req, res) => {
  // console.log(req.query)
  reportAnswer(req.body)
  .then((data) => {
    console.log('succesfull answer report', data)
    res.status(204)
    res.end()
  })
  .catch((err) => {
    console.log(err)
  })
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

