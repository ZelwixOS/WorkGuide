import axios from 'axios';

async function deleteRequest<T>(url: string) {
  return (await axios.delete(url)).data;
}

async function deleteCourse(id: string) {
  return deleteRequest(`/api/Course/${id}`)
}

export default deleteRequest

export {
  deleteRequest,
  deleteCourse,
};
