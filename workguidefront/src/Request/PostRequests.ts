import axios from 'axios';

async function post<T>(url: string, data: T) {
  return (await axios.post(url, data)).data;
}

export default post

export {
  post,
};
