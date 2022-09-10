import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      return
    }
    let isRepeated = false
    persons.forEach(element => {
      if (element.name === newName) {
        isRepeated = true
        return 
      }
    })
    if (isRepeated) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
          .update(persons.find(element => element.name === newName).id, {name: newName, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          setMessage(`${newName} number is changed`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        // array.concat() returns a new array
        setPersons(persons.concat(returnedPerson))
      })
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }
  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleInputFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  // NB: do I have a better way?
  let showPersons = persons
  if (filterName.length > 0) {
    showPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter filterName={filterName} handleInputFilterNameChange={handleInputFilterNameChange}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleInputNameChange={handleInputNameChange} newNumber={newNumber} handleInputNumberChange={handleInputNumberChange}/>
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} persons={persons} setPersons={setPersons} personService={personService} setIsError={setIsError} setMessage={setMessage}/>
    </div>
  )
}

export default App