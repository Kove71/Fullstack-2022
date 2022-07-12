import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  )
}
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)

}

const App = () => {

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
      />
    </div>
  )
}

export default App