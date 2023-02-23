import axios from 'axios'

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
}

export default put

export {
  put,
}
