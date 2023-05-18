import { SliderTypeMap } from '@mui/material';
import axios from 'axios'
import ServerResponse from '../Types/ServerResponse';
import TestAnswer from '../Types/TestAnswer';
import UserInfo from '../Types/UserInfo';
import UserLinks from '../Types/UserLinks';
import WorkerRegistration from '../Types/WorkerRegistration';
import AchievementRequestModel from '../Types/AchievementRequestModel';

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
}

async function updateUserLinks(data: UserLinks): Promise<ServerResponse>  {
  return await put<UserLinks>(`/api/User`, data);
}

async function updateCourse(
  id: string,
  url: string,
  name: string,
  description: string,
  picFile: File | null,
) {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('url', url);
  formData.append('description', description)

  if (picFile) {
    formData.append('picFile', picFile)
  }

  return await put(`/api/Course`, formData)
}

async function updatePosition(id: string, title: string) {
  return await put(`/api/Position/`, { id, title })
}

async function updateLesson(
  id: string,
  orderNumber: number,
  name: string,
  isComplexTest: boolean,
  courseId: string) {
  return await put(`/api/Lesson/`, { id, orderNumber, name, isComplexTest,  courseId })
}

async function updateTheory(pageNumber: number, content: string, lessonId: string, id: string) {
  return await put(`/api/Theory/`, { pageNumber, content, lessonId, id })
}

async function updateWorker(id: string, data: WorkerRegistration) {
  return await put(`/api/User/${id}`, data)
}

async function updateWorkerFull(id: string, data: WorkerRegistration) {
  const formData = new FormData()
  formData.append('login', data.login)
  formData.append('password', data.password)
  formData.append('email', data.email)
  formData.append('phoneNumber', data.phoneNumber)
  formData.append('firstName', data.firstName)
  formData.append('secondName', data.secondName)
  formData.append('positionId', data.positionId)

  if (data.avatar) {
    formData.append('avatar', data.avatar)
  }
  if (data.mentorId) {
    formData.append('mentorId', data.mentorId)
  }

  return await put(`/api/Account/UpdateUserInfo/${id}`, formData)
}

async function updateTest(
  lessonId: string,
  pageNumer: number,
  isManyAnswer: boolean,
  content: string,
  answers: TestAnswer[],
  id: string
) {
  return await put(`/api/Test/`, {
    pageNumer,
    content,
    isManyAnswer,
    lessonId,
    answers,
    id
  })
}

async function updateAchievement(data: AchievementRequestModel) {
  const formData = new FormData()
  formData.append('id', data.id!)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('type', data.type.toString())

  if (data.picFile) {
    formData.append('picFile', data.picFile)
  }

  if (data.courseId) {
    formData.append('courseId', data.courseId)
  }

  if (data.count) {
    formData.append('count', data.count.toString())
  }

  formData.append('testScore', data.testScore.toString())
  return await put(`/api/Achievement/`, formData)
}

export default put

export {
  put,
  updateCourse,
  updatePosition,
  updateUserLinks,
  updateLesson,
  updateTheory,
  updateTest,
  updateWorker,
  updateWorkerFull,
  updateAchievement
}
