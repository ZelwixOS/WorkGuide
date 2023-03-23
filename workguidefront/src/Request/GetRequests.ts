import axios from 'axios'
import Course from '../Types/Course';
import CoursePage from '../Types/CoursePage';
import Lesson from '../Types/Lesson';
import UserMainInfo from '../Types/UserMainInfo';
import UserInfo from '../Types/UserInfo';
import Position from '../Types/Position';
import Notification from '../Types/Notification'

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

async function getCourseByUrl(url: string): Promise<Course>  {
  return await getRequest(`/api/course/url/${url}`);
}

async function getCourseById(id: string): Promise<Course>  {
  return await getRequest(`/api/course/id/${id}`);
}

async function getCourses(page: number, itemsOnPage: number): Promise<CoursePage>  {
  return await getRequest(`/api/course?page=${page}&itemsOnPage=${itemsOnPage}`);
}

async function getSearchedCourses(page: number, itemsOnPage: number, search: string): Promise<CoursePage>  {
  return await getRequest(`/api/course?page=${page}&itemsOnPage=${itemsOnPage}&search=${search}`);
}

async function getLessonByNumber(url: string, lessonNumber: string): Promise<Lesson>  {
  return await getRequest(`/api/lesson/url/${url}/${lessonNumber}`);
}

async function getAllWorkers(): Promise<UserMainInfo[]>  {
  return await getRequest(`/api/account/GetAllWorkers`);
}

async function getUsersBySearch(request: string, count: number): Promise<UserInfo[]>  {
  return await getRequest(`/api/User/searchUsers?request=${request}&count=${count}`);
}

async function getCurrentUserInfo(): Promise<UserInfo>  {
  return await getRequest(`/api/Account/GetCurrentUserInfo`);
}

async function getAllPositions(): Promise<Position[]>  {
  return await getRequest(`/api/Position`);
}

async function getPosition(id: string): Promise<Position>  {
  return await getRequest(`/api/Position/id/${id}`);
}

async function getCoursePositions(id: string): Promise<Position[]>  {
  return await getRequest(`/api/Course/positions/${id}`);
}

async function getNotifications(): Promise<Notification[]>  {
  return await getRequest(`/api/Notification/user/`);
}

export default getRequest

export {
  getRequest,
  getCourses,
  getCourseByUrl,
  getAllWorkers,
  getLessonByNumber,
  getCourseById,
  getSearchedCourses,
  getUsersBySearch,
  getCurrentUserInfo,
  getAllPositions,
  getPosition,
  getCoursePositions,
  getNotifications
}
