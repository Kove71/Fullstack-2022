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

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return <p>Too many countries to show</p>
  }
  return countriesToShow.map(country => <p>{country.name.common}</p>)
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
      />
    </div>
  )
}

export default App
