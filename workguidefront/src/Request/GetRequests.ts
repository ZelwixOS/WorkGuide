import axios from 'axios'

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

export default getRequest

export {
  getRequest,
}
