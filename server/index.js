const express = require("express");
const path = require("path");
const { listQuestions, listAnswers, insertQuestion, insertAnswer, markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer } = require('./controllers.js');


let port = 1128;

const app = express();

app.use(express.json());

//List Questions
app.get('/qa/questions', listQuestions)

//Answers List
app.get('/qa/answers', listAnswers)

//Add a Question
app.post('/qa/questions', insertQuestion)

//Add an answer
app.post('/qa/questions/answers', insertAnswer)

//Mark Question as Helpful
app.put('/qa/questions/helpful', markQuestionHelpful)

//Report Question
app.put('/qa/questions/report', reportQuestion)

//Mark Answer as Helpful
app.put('/qa/answers/helpful', markAnswerHelpful)

//Report Answer
app.put('/qa/answers/report', reportAnswer)

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

