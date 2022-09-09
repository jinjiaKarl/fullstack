import {useState, useEffect} from 'react'
import axios from 'axios'
// for weather api
const apiKey = process.env.REACT_APP_API_KEY
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
  const [show, setShow] = useState(false)
  const hanleOnClick = () => {
    setShow(!show)
  }
  const text = show ? 'hide' : 'show'
  return (
    <>
      {country.name.common}
      <button onClick={hanleOnClick}>{text}</button>
      <br/>
      {show && <View country={country}/>}
    </>
  )
}

// TODO: how to refactor this?
const View =  ({ country }) => {
  const [weather, setWeather] = useState({})
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + country.capital[0]
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setWeather(response.data)
      })
    },[])
  if (Object.keys(weather).length === 0) {
    return ( 
      <>
        <h2>{country.name.common}</h2>
        capital {country.capital[0]} <br/>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        </>
    )
  }
      console.log(country)
      console.log(weather)

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='flag' width='100' height='100'/>
      <h3>weather in {country.capital}</h3>
      <p>temperature: {} Celcius </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' width='100' height='100'/>
      <p>wind: {weather.wind.speed} m/s</p>
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
  return ( 
    <>
      {countries.map(country => <Country key={country.name.common} country={country}/>)}
    </>
  )
}
export default App;
