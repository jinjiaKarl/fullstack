import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const obj = {
        content: content,
        id: getId(), 
        votes: 0 
    }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const voteOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const obj = response.data
    const changedObj = {
        ...obj,
        votes: obj.votes + 1
    }
    const res = await axios.put(`${baseUrl}/${id}`, changedObj)
    return res.data
}
export default { getAll,createNew, voteOne}