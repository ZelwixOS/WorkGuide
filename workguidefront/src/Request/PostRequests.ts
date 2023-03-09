import axios from 'axios'

async function post<T>(url: string, data: T) {
  return (await axios.post(url, data)).data
}

async function checkAnswer(testId: string, answerId: string) {
  return await post(`/api/Test/checkAnswer/`, {
    testId: testId,
    answerId: answerId,
  })
}

async function checkComplexTest(lessonId: string, answers: any) {
  let entries = Object.entries(answers)
  let testAnswers = entries.map((entry) => {
    return {
      testId: entry[0],
      answerId: entry[1],
    }
  })

  console.log(testAnswers)
  return await post(`/api/Test/checkTest/`, {
    lessonId: lessonId,
    answers: testAnswers,
  })
}

async function banUser(id: string) {
  return await post(`/api/Account/Ban/${id}`, null);
}

async function unbanUser(id: string) {
  return await post(`/api/Account/Unban/${id}`, null);
}

export default post

export { post, checkAnswer, checkComplexTest, banUser, unbanUser }
