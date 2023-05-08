import axios from 'axios'
import TestAnswer from '../Types/TestAnswer'
import WorkerRegistration from '../Types/WorkerRegistration'
import CustomFile from '../Types/CustomFile'
import AchievementRequestModel from '../Types/AchievementRequestModel'

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
  pageNumber: string,
  content: string,
  files: File[],
) {
  const formData = new FormData()
  formData.append('lessonId', lessonId)
  formData.append('pageNumber', pageNumber)
  formData.append('content', content)

  files.forEach((file: File) => formData.append('files', file))

  return await post(`/api/Theory`, formData)
}

async function createTheoryFile(id: string, file: File): Promise<CustomFile> {
  const formData = new FormData()
  formData.append('file', file)

  return await post(`/api/Theory/createFile/${id}`, formData)
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

async function registerWorker(data: WorkerRegistration) {
  return await post(`/api/Account/Register`, data)
}

async function createAchievement(data: AchievementRequestModel) {
  const formData = new FormData()

  formData.append('name', data.name)

  if (data.picFile) {
    formData.append('picFile', data.picFile)
  }

  formData.append('description', data.description)
  formData.append('type', data.type.toString())

  if (data.courseId) {
    formData.append('courseId', data.courseId)
  }

  if (data.count) {
    formData.append('count', data.count.toString())
  }

  formData.append('testScore', data.testScore.toString())

  return await post(`/api/Achievement`, formData)
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
  registerWorker,
  createTheoryFile,
  createAchievement,
}
