import axios from 'axios'
import ServerResponse from '../Types/ServerResponse';
import UserInfo from '../Types/UserInfo';
import UserLinks from '../Types/UserLinks';

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
}

async function updateUserLiks(data: UserLinks): Promise<ServerResponse>  {
  return await put<UserLinks>(`/api/User`, data);
}

export default put

export {
  put,
  updateUserLiks,
}
