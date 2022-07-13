import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter countries: <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const Countries = ({ countriesToShow, handleFilterChange }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many countries to show</p>
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => <li>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt='flag'></img>
        <h3>Weather</h3>
        <Weather
          lat={country.latlng[0]}
          lon={country.latlng[1]}
        />
      </div>
    )
  }
  return countriesToShow.map(country => <p>
    {country.name.common}
    <button
      value={country.name.common}
      onClick={handleFilterChange}>show</button>
  </p>)
}

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    const eventHandler = response => {
      console.log('weather promise fulfilled')
      setWeather(response.data)
      console.log(response.data)
    }

    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    console.log()
    promise.then(eventHandler)
  }, [])

  if (Object.keys(weather).length === 0) {
    return <></>
  }
  const weather_icon_url = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={weather_icon_url} alt='icon'></img>
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )

}
const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      console.log(response.data)
    }

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(eventHandler)
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countriesToShow={countriesToShow}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
