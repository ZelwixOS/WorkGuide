import axios from 'axios'
import Course from '../Types/Course';
import CoursePage from '../Types/CoursePage';

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

async function getCourseByUrl(url: string): Promise<Course>  {
  return await getRequest(`/api/course/url/${url}`);
}

async function getCourses(page: number, itemsOnPage: number): Promise<CoursePage>  {
  return await getRequest(`/api/course?page=${page}&itemsOnPage=${itemsOnPage}`);
}

export default getRequest

export {
  getRequest,
  getCourses,
  getCourseByUrl,
}
