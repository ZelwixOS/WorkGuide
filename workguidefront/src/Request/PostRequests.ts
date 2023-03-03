import axios from 'axios';

async function post<T>(url: string, data: T) {
  return (await axios.post(url, data)).data;
}

async function checkAnswer(testId: string, answerId: string) {
  return await post(`/api/Test/checkAnswer/`, { testId: testId, answerId: answerId });
}

export default post

export {
  post,
  checkAnswer,
};
