const { Client } = require('pg');
const { questionFormatter } = require('./controllers.js')

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'sdcfirstiteration',
  user: 'justinturkaly',
  password: '0000000'
};
const client = new Client(connection);
client.connect()

const grabQuestions = (productID) => {
  return new Promise((resolve, reject) => {

    client.query(`select * from questions where product_id = ${productID}`, (err, res) => {
      let result = []
      if (err) {
        reject(err)
      } else {
        resolve(res.rows)
      }
    })

  })
}

const grabAnswers = (answers) => {
  return new Promise((resolve, reject) => {

    client.query(`select * from answers where question_id = ${answers[0].id}`, (err, res) => {
      if (err) {
        reject(err)
      } else {
        let copy = answers.slice()
        copy.answers = []
        for (let i = 0; i < answers.length; i++) {
          // console.log(res.rows[0].question_id, answers[i].id)
          if (res.rows[0].question_id === answers[i].id) {
            copy.answers.push(res.rows[0])
          }
        }
        console.log(copy)
        resolve(copy)
      }
    })

  })
}

const grabAllAnswers = (id) => {
  console.log(id)

  return new Promise ((resolve, reject) => {

    client.query(`select * from answers where question_id = ${id}`, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.rows)
      }
    })
  })

}

const insertQuestion = (body) => {
console.log('test', body.product_id)

return new Promise ((resolve, reject) => {

  client.query(`insert into questions (body, asker_name, asker_email, product_id, date_written, reported, helpful) values ('${body.body}', '${body.name}', '${body.email}', ${body.product_id}, ${4232}, ${false}, ${0})`, (err, res) => {
    if (err) {
      reject(err)
    } else {
      resolve(res)
    }
  })
})
}

const insertAnswer = (body) => {
  console.log(body)
  // console.log(`insert into answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) values (${body.question_id}, ${body.body}, ${132134}, ${body.name}, ${body.email}, ${false}, ${0});`)

  let newBody = body.body

  return new Promise((resolve, reject) => {

    client.query(`insert into answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
                  values (${body.question_id}, '${newBody}', ${24234}, '${body.name}', '${body.email}', ${false}, ${0})`, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const markQuestionHelpful = (body) => {

  return new Promise((resolve, reject) => {

    client.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${body.question_id};`, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const reportQuestion = (body) => {

  return new Promise((resolve, reject) => {

    client.query(`UPDATE questions SET reported = ${true} WHERE id = ${body.question_id}`, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

const markAnswerHelpful = (body) => {

  return new Promise((resolve, reject) => {

    client.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${body.question_id}`, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

const reportAnswer = (body) => {
  console.log('test', body)

  return new Promise((resolve, reject) => {

    client.query(`UPDATE answers SET reported = ${true} WHERE id = ${body.question_id}`, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}


module.exports.grabQuestions = grabQuestions;
module.exports.grabAnswers = grabAnswers;
module.exports.grabAllAnswers = grabAllAnswers;
module.exports.insertQuestion = insertQuestion;
module.exports.insertAnswer = insertAnswer;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;







