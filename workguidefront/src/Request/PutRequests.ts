import axios from 'axios'
import ServerResponse from '../Types/ServerResponse';
import UserInfo from '../Types/UserInfo';
import UserLinks from '../Types/UserLinks';

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
}

async function updateUserLinks(data: UserLinks): Promise<ServerResponse>  {
  return await put<UserLinks>(`/api/User`, data);
}

async function updateCourse(
  id: string,
  url: string,
  name: string,
  description: string,
  picFile: File | null,
) {
  const data = {
    id: id,
    url: url,
    name: name,
    description: description,
    picFile: picFile,
  }
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('url', url);
  formData.append('description', description)

  if (picFile) {
    formData.append('picFile', picFile)
  }

  return await put(`/api/Course`, formData)
}

export default put

export {
  put,
  updateUserLinks,
  updateCourse
}
