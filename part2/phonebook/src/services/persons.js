import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    // then仍然返回一个promise对象
    return request.then(resp => resp.data)
}

 // post will return a new person object
const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(resp => resp.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(resp => resp.data)
}

// delete will not return a person object
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(resp => resp.data)
}

const personService = {getAll, create, update, deletePerson}

export default personService
