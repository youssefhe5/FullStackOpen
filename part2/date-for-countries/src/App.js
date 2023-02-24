import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Countries = ({filteredCountries}) => {

  console.log(filteredCountries);

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specifiy another filter</p>
    )
  } else if (filteredCountries.length === 1){
    const country = filteredCountries[0]
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
          <li>{language}</li>
        ) )}
        
      </ul>

      <img src={flags[0]} alt={flags[2]} />
      </div>
    )
  }

  return filteredCountries.map((country) => (
      <p key={country.name.common}>
        {country.name.common}
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

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  

  return (
    <div>
      <input value={filter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries}/>

      
    </div>
  )
}

export default App;
