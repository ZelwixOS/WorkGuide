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
  return await post(`/api/Account/Ban/${id}`, null)
}

async function createCourse(
  url: string,
  name: string,
  description: string,
  picFile: File | null,
) {

  const formData = new FormData()
  formData.append('name', name)
  formData.append('url', url);
  formData.append('description', description)

  if (picFile) {
    formData.append('picFile', picFile)
  }

  return await post(`/api/Course`, formData)
}

async function unbanUser(id: string) {
  return await post(`/api/Account/Unban/${id}`, null)
}

async function publishCourse(id: string) {
  return await post(`/api/Course/publish/${id}`, null)
}

async function unpublishCourse(id: string) {
  return await post(`/api/Course/unpublish/${id}`, null)
}

async function createPosition(title: string) {
  return await post(`/api/Position`, { title: title })
}

async function addCoursePosition(courseId: string, positionId: string) {
  return await post(`/api/Course/${courseId}/${positionId}`, null)
}

export default post

export {
  post,
  checkAnswer,
  checkComplexTest,
  banUser,
  unbanUser,
  publishCourse,
  unpublishCourse,
  createCourse,
  createPosition,
  addCoursePosition,
}
