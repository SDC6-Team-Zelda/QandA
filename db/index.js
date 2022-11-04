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



  client.query(`select * from questions where product_id = ${productID}`, (err, res) => {
    let result = []
    if (err) {
      console.log(err)
    } else {
      // console.log(res.rows)
      for (let i = 0; i < res.rows.length; i++) {
        let id = res.rows[i].id;
        client.query(`select * from answers where question_id = ${id}`, (er, re) => {
          if (er) {
            console.log(er)
          } else {
            // console.log('test', res.rows, re.rows)
            let formatted = questionFormatter(res.rows, re.rows)
            let merged = [...formatted]
            // console.log('TEST', merged)
            // console.log('test', formatted[i])
            result.push(formatted[i])
          }
        })
      }
    }
  })


  // return new Promise((resolve, reject) => {

  //   connection.query('select * from users where fullName = ?;', name,
  //     (err, result) => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         // console.log(result)
  //         resolve(result)
  //       }
  //     })


  // })


}

module.exports.grabQuestions = grabQuestions;
