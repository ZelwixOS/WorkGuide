import axios from 'axios'
import TestAnswer from '../Types/TestAnswer'
import WorkerRegistration from '../Types/WorkerRegistration'

async function post<T>(url: string, data: T) {
  return (await axios.post(url, data)).data
}

async function checkAnswer(testId: string, answerIds: string[]) {
  return await post(`/api/Test/checkAnswer/`, {
    testId: testId,
    answerId: answerIds,
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
  formData.append('url', url)
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

async function createLesson(
  orderNumber: number,
  name: string,
  isComplexTest: boolean,
  courseId: string,
) {
  return await post(`/api/Lesson/`, {
    orderNumber,
    name,
    isComplexTest,
    courseId,
  })
}

async function createTheoryPage(
  lessonId: string,
  pageNumber: number,
  content: string,
) {
  return await post(`/api/Theory/`, { pageNumber, content, lessonId })
}

async function createQuestionPage(
  lessonId: string,
  pageNumer: number,
  isManyAnswer: boolean,
  content: string,
  answers: TestAnswer[],
) {
  return await post(`/api/Test/`, {
    pageNumer,
    content,
    isManyAnswer,
    lessonId,
    answers,
  })
}
  
async function readNotification(notificationId: string) {
  return await post(`/api/Notification/readT/${notificationId}`, null)
}

async function registerWorker(data : WorkerRegistration) {
  return await post(`/api/Account/Register`, data)
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
  createLesson,
  createTheoryPage,
  createQuestionPage,
  readNotification,
  registerWorker
}
