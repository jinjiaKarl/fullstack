import {useState, useEffect} from 'react'
import axios from 'axios'
 
const App = () => {
  // 
  const [filter,setFilter] = useState('')
  const [countries,setCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  let filteredCountries = countries 
  if (filter.length > 0) {
    filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
   <div>
    find countris <input value={filter} onChange={handleFilterChange}/>
    <br/>
    <Countries countries={filteredCountries} />
   </div>
  );
}

const Country = ({ country }) => {
  // Object.values返回一个给定对象自身的所有可枚举属性值的数组
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" width="100" height="100" />
    </>
  )
}

const  Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }
  if (countries.length === 1) {
    return (
      <>
        <Country country={countries[0]} />
      </>
    )
  }
  return ( 
    <>
      {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
    </>
  )
}
export default App;
