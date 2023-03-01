import axios from 'axios'
import Course from '../Types/Course';

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

async function getCourseByUrl(url: string): Promise<Course>  {
  return await getRequest(`/api/course/url/${url}`);
}

export default getRequest

export {
  getRequest,
  getCourseByUrl,
}
