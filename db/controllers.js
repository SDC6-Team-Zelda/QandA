const questionFormatter = (q, a) => {
// console.log(q, a)
let result = []
// console.log(a)
for (let i = 0; i < q.length; i++) {
  let id = q[i].id
  let dataObj = q[i]
  let answerArray = []
  dataObj.answers = []
  for (let j = 0; j < a.length; j++) {
    // console.log(a[j])
    if (a[j].question_id === id) {
      dataObj.answers.push(a[j])
    }
  }
  result.push(dataObj)
}
// console.log(result)
return result
}

module.exports.questionFormatter = questionFormatter;