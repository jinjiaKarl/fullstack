import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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
      alert(`${newName} is already added to phonebook`)
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
      <Filter filterName={filterName} handleInputFilterNameChange={handleInputFilterNameChange}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleInputNameChange={handleInputNameChange} newNumber={newNumber} handleInputNumberChange={handleInputNumberChange}/>
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} persons={persons} setPersons={setPersons} personService={personService}/>
    </div>
  )
}

export default App