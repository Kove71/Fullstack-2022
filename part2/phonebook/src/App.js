import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Persons = ({ personsToShow, handleDelete }) => {
  return personsToShow.map(person => <p key={person.id}>
    {person.name} {person.number} <button
      data-id={person.id}
      data-name={person.name}
      onClick={handleDelete}>delete</button>
  </p>)

}

const Notification = ({ message, color }) => {
  if (message === null) {
    return <></>
  }
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNotification = (message, color) => {
    setNotificationColor(color)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook! Do you want to update the number?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            if (!returnedPerson) {
              handleNotification(`Information of ${newName} was already deleted from the server`, 'red')
              setPersons(persons.filter(p => p.id !== person.id))
            } else {
              setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            }
          })
          .catch(error => {
            handleNotification(error.response.data.error, 'red')
          })
        handleNotification(`Updated ${newName}`, 'green')


      }
    } else {
      const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => handleNotification(error.response.data.error, 'red'))
      handleNotification(`Added ${newName}`, 'green')
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

  const handleDelete = (event) => {
    const person_id = event.target.getAttribute('data-id')
    const person_name = event.target.getAttribute('data-name')
    if (window.confirm(`Do you want to delete ${person_name}?`)) {
      personsService
        .deletePerson(person_id)
        .then(returnedStatus => console.log(returnedStatus))
        .catch(error => {
          handleNotification(`Information of ${person_name} was already deleted from the server`, 'red')
          setPersons(persons.filter(p => p.id !== person_id))
        })
      setPersons(persons.filter(p => p.id !== person_id))
    }
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notificationMessage}
        color={notificationColor}
      />
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
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App