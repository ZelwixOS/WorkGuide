import axios from 'axios';

async function deleteRequest<T>(url: string) {
  return (await axios.delete(url)).data;
}

export default deleteRequest

export {
  deleteRequest,
};
