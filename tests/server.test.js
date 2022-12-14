const { Client, Pool } = require('pg');
const axios = require('axios');
const { test_data } = require('./test-data.js');


const API_URL = `http://localhost:1128`;

const productIDBody = {
  data: {"product_id": 66649}
}
const questionIDBody = {
  data: {"question_id": 234352}
}
const newQuestionBody = {
    "body": "this is a test pls work",
    "name": "james",
    "email": "james@gmail.com",
    "product_id": 66649
}
const newAnswerBody = {
  params: {
    "question_id": 234351,
    "body": "this is a test pls work",
    "name": "jimmy",
    "email": "jimmy@gmail.com"
  }
}
const helpfulBody = {"question_id": 234351}

const answerHelpfulBody = {"question_id": 2}

jest.setTimeout(20000);


describe('SDC QA Service', () => {
  const pool = new Pool({
    host: 'localhost',
  port: 5432,
  database: 'sdcfirstiteration',
  user: 'justinturkaly',
  password: '0000000'
  });

  beforeAll(() => {
    console.log('before all...');
  });

  afterAll(() => {
    return pool.query(`DELETE FROM questions WHERE asker_name='${newQuestionBody.name}'`)
      .then(() => {
        // console.log('succes deleting question')
        return pool.query(`DELETE FROM answers WHERE answerer_name='${newAnswerBody.params.name}'`)
        .then(() => {
          // console.log('success deleting answer')
        })
      })
  });

  test('Should list all questions for the product', () => {
    return axios.get(`${API_URL}/qa/questions`, productIDBody)
      .then((result) => {
        // console.log(result)
        expect(result.status).toEqual(200);
        expect(Array.isArray(result.data)).toEqual(true)
      })
  });

  test('Should list all answers for the question', () => {
    return axios.get(`${API_URL}/qa/answers`, questionIDBody)
      .then((result) => {
        // console.log(result)
        expect(result.status).toEqual(200);
        expect(Array.isArray(result.data)).toEqual(true)
      })
  });

  test('Should add a question', () => {
    return axios.post(`${API_URL}/qa/questions`, newQuestionBody)
      .then((result) => {
        console.log(result)
        expect(result.status).toEqual(201);
        expect(result.data).toEqual('CREATED')
      })
  });

  test('Should add an answer', () => {
    return axios.post(`${API_URL}/qa/questions/answers`, newAnswerBody)
      .then((result) => {
        console.log(result)
        expect(result.status).toEqual(201);
        expect(result.data).toEqual('CREATED')
      })
  });

  test('Should mark question as helpful', () => {
    return axios.put(`${API_URL}/qa/questions/helpful`, helpfulBody)
      .then((result) => {
        // console.log(result)
        expect(result.status).toEqual(204);
        // expect(result.statusText).toEqual('No Content')
      })
  });

  test('Should mark an answer as helpful', () => {
    return axios.put(`${API_URL}/qa/answers/helpful`, answerHelpfulBody)
      .then((result) => {
        expect(result.status).toEqual(204);
      })
  });

  test('Should report a question', () => {
    return axios.put(`${API_URL}/qa/questions/report`, helpfulBody)
      .then((result) => {
        expect(result.status).toEqual(204);
      })
  });

  test('Should report an answer', () => {
    return axios.put(`${API_URL}/qa/answers/report`, answerHelpfulBody)
      .then((result) => {
        expect(result.status).toEqual(204);
      })
  });
});