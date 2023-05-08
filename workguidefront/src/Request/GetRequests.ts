import axios from 'axios'
import Course from '../Types/Course';
import CoursePage from '../Types/CoursePage';
import Lesson from '../Types/Lesson';
import UserMainInfo from '../Types/UserMainInfo';
import UserInfo from '../Types/UserInfo';
import Position from '../Types/Position';
import Theory from '../Types/Theory';
import Test from '../Types/Test';
import TestValidAnswers from '../Types/TestValidAnswers';
import Notification from '../Types/Notification'
import Activity from '../Types/Activity';
import TestScore from '../Types/TestScore';
import Achievement from '../Types/Achievement';
import AchievementRequestModel from '../Types/AchievementRequestModel';
import AchievementTechModel from '../Types/AchievementTechModel';

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

async function getUserById(id: string): Promise<UserInfo>  {
  return await getRequest(`/api/User/id/${id}`);
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

async function getLessonById(id: string) : Promise<Lesson> {
  return await getRequest(`/api/Lesson/id/${id}`);
}

async function getAllLessons() : Promise<Lesson[]> {
  return await getRequest(`/api/Lesson/`);
}

async function getTheory(id: string): Promise<Theory> {
  return await getRequest(`/api/Theory/id/${id}`);
}

async function getTest(id: string): Promise<Test> {
  return await getRequest(`/api/Test/id/${id}`);
}

async function getTestAnswers(id: string): Promise<TestValidAnswers> {
  return await getRequest(`/api/Test/answers/${id}`);
}

async function getNotifications(): Promise<Notification[]>  {
  return await getRequest(`/api/Notification/user/`);
}

async function getActivities(count: number): Promise<Activity[]>  {
  return await getRequest(`/api/Activity/count/${count}`);
}

async function getUserTestScore(id: string): Promise<TestScore>  {
  return await getRequest(`/api/Test/userLessonScore/${id}`);
}

async function getAllAchievements(id: string): Promise<Achievement[]>  {
    return id != null ? await getRequest(`/api/Achievement/all?courseId=${id}`) : await getRequest(`/api/Achievement/all`);
}

async function getAchievement(id: string): Promise<AchievementTechModel>  {
  return getRequest(`/api/Achievement/${id}`)
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
  getLessonById,
  getAllLessons,
  getTheory,
  getTest,
  getTestAnswers,
  getNotifications,
  getUserById,
  getActivities,
  getUserTestScore,
  getAllAchievements,
  getAchievement
}
