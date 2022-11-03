const { Client } = require('pg');
const {questionFormatter} = require('./controllers.js')

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'sdcfirstiteration',
  user: 'justinturkaly',
  password: '0000000'
};
const client = new Client(connection);
client.connect()
client.query('select * from questions where product_id = 5', (err, res) => {
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
          // console.log('questions', res.rows, 'answers', re.rows)
          questionFormatter(res.rows, re.rows)
          // let dataObj = {}
          // for (let i = 0; i < res.rows.length; i++) {
          //   let link = res.rows[i].id;
          //   let result = []
          //   for (let j = 0; j < re.rows.length; j++) {
          //     // console.log(re.rows[j]
          //     if (re.rows[j].question_id.toString() === link.toString()) {
          //       result.push(re.rows[j])
          //     }
          //   }
          //   let key = res.rows[i]
          //   dataObj[key] = result;
          // }
          // console.log(dataObj)
          client.end()
        }
      })
    }
  }
})

