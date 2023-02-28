import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}>show</button>
  )
}

const ShowCountry = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [temperature, setTemperature] = useState('')
  const [icon, setIcon] = useState('')
  const [wind, setWind] = useState('')

  let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`

  
  useEffect(() => {
    axios.get(weatherAPI).then((response) => {
      const temp = response.data.main.temp
      const icon = response.data.weather[0].icon
      const wind = response.data.wind.speed

      console.log(temp);
      console.log(response.data);
      console.log('icon ', icon);
      console.log('wind ', wind);
      
      setTemperature(temp)
      setIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`)
      setWind(wind)
    })
  }, [weatherAPI])  
  
  const languages = Object.values(country.languages)
  const flags = Object.values(country.flags)  
  return (
    <div>
        <h1>
        <strong>
          {country.name.common}
        </strong>
      </h1>

      <p>captial {country.capital}</p>
      <p>area {country.area}</p>

      <p><strong>languages:</strong></p>
      <ul>

        {languages.map((language) => (
          <li key={language}>{language}</li>
        ) )}
        
      </ul>

      <img src={flags[0]} alt={flags[2]} />

      <h2>
        <strong>
          Weather in {country.name.common}
        </strong>
      </h2>
      <p>temperature {temperature} Celcius</p>
      <img src={icon} alt="" />
      <p>wind {wind} m/s</p>
      </div>
  )
}

const Countries = ({ filteredCountries, handleClick }) => {

  console.log(filteredCountries);

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specifiy another filter</p>
    )
  } else if (filteredCountries.length === 1){
    const country = filteredCountries[0]
    return (
      <ShowCountry key={country.name.common} country={country}/>
    )
  }

  return filteredCountries.map((country) => (
    <p key={country.name.common}>
        {country.name.common} <Button onClick={() => {handleClick(country)}}/>
      </p>
  ))

};

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  
  useEffect(() => {
      console.log('getting countries');
      axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
        setCountries(response.data)
      })
  }, [])

  

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFilter(country.name.common)
  }

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <input value={filter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries} handleClick={handleClick}/>

      
    </div>
  )
}

export default App;
