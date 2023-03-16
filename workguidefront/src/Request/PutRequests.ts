import axios from 'axios'

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
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

async function updatePosition(id: string, title: string) {
  return await put(`/api/Position/`, { id, title })
}

export default put

export {
  put,
  updateCourse,
  updatePosition
}
