import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(res => {
            console.log(res)
            setCountry(res.data[0])
        })
        .catch(err => {
            // TODO: the name is empty when it is first rendered. So have a error. how to fix it?
            console.log(err)
        })
  },[name])

  if ( name === '' || !country){
    return null
  }
  return country
}



