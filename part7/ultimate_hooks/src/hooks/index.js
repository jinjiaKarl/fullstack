import { useState, useEffect } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(() => {
        axios
            .get(baseUrl)
            .then(res => {
                setResources(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [baseUrl])
  
    const create = (resource) => {
      axios.post(baseUrl, resource)
        .then(res => {
            setResources(resources.concat(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }
    return {
      type,
      value,
      onChange,
      reset
    }
  }
  