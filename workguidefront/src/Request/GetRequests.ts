import axios from 'axios'
import Course from '../Types/Course';
import CoursePage from '../Types/CoursePage';
import Lesson from '../Types/Lesson';
import UserSearchInfo from '../Types/UserSearchInfo';

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

async function getCourseByUrl(url: string): Promise<Course>  {
  return await getRequest(`/api/course/url/${url}`);
}

async function getCourses(page: number, itemsOnPage: number): Promise<CoursePage>  {
  return await getRequest(`/api/course?page=${page}&itemsOnPage=${itemsOnPage}`);
}

async function getLessonByNumber(url: string, lessonNumber: string): Promise<Lesson>  {
  return await getRequest(`/api/lesson/url/${url}/${lessonNumber}`);
}

async function getUsersBySearch(request: string, count: number): Promise<UserSearchInfo[]>  {
  return await getRequest(`/api/User/searchUsers?request=${request}&count=${count}`);
}

export default getRequest

export {
  getRequest,
  getCourses,
  getCourseByUrl,
  getLessonByNumber,
  getUsersBySearch
}
