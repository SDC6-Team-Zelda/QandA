const express = require("express");
const path = require("path");
const { grabQuestions } = require('../db/index.js')
// const axios = require('axios');
// require("dotenv").config();

let port = 1128;

const app = express();

// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

//List Questions
app.get('/qa/questions', (req, res) => {
  // console.log(req.body)
  grabQuestions(req.body.product_id)
  .then((data) => {
    console.log('sucesfull grab', data)
  })
  .catch((err) => {
    console.log(err)
  })
})

//Answers List
app.get('/qa/answers', (req, res) => {
  // console.log(req.body)

})

//Add a Question
app.post('/qa/questions', (req, res) => {
  console.log(req.body)
})

//Add an answer
app.post('/qa/questions/answers', (req, res) => {
  console.log(req.query)
})

//Mark Question as Helpful
app.put('/qa/questions/helpful', (req, res) => {
  console.log(req.query)
})

//Report Question
app.put('/qa/question/report', (req, res) => {
  console.log(req.query)
})

//Mark Answer as Helpful
app.put('/qa/answers/helpful', (req, res) => {
  console.log(req.query)
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

