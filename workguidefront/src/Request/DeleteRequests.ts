import axios from 'axios';

async function deleteRequest<T>(url: string) {
  return (await axios.delete(url)).data;
}

async function deleteCourse(id: string) {
  return deleteRequest(`/api/Course/${id}`)
}

async function deletePosition(id: string)  {
  return await deleteRequest(`/api/Position/${id}`);
}

async function removeCoursePosition(courseId: string, positionId: string) {
  return await deleteRequest(`/api/Course/${courseId}/${positionId}`)
}


export default deleteRequest

export {
  deleteRequest,
  deleteCourse,
  deletePosition,
  removeCoursePosition
};
