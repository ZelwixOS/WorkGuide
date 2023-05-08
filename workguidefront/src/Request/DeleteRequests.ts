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

async function deleteLesson(id: string)  {
  return await deleteRequest(`/api/Lesson/${id}`);
}

async function  deleteTest(id: string) {
  return await deleteRequest(`/api/Test/${id}`);
}

async function  deleteTheory(id: string) {
  return await deleteRequest(`/api/Theory/${id}`);
}

async function  deleteTheoryFile(id: string) {
  return await deleteRequest(`/api/Theory/deleteFile/${id}`);
}

async function  deleteAchievement(id: string) {
  return await deleteRequest(`/api/Achievement/${id}`);
}

export default deleteRequest

export {
  deleteRequest,
  deleteCourse,
  deletePosition,
  removeCoursePosition,
  deleteLesson,
  deleteTest,
  deleteTheory,
  deleteTheoryFile,
  deleteAchievement
};
