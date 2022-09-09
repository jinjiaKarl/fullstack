import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(resp => {
        console.log(resp)
        setPersons(resp.data)
      })
  }, [])


  const handleSubmit = (event) => {
    if (newName.length === 0) {
      return
    }
    event.preventDefault()
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
      // array.concat() returns a new array
      setPersons(persons.concat({name: newName, number: newNumber, id: uuidv4()}))
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
  let showPersons = []
  if (filterName.length === 0) {
    showPersons = persons
  } else {
    persons.forEach(element => {
      if (element.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())) {
        showPersons.push(element)
      }
    })
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleInputFilterNameChange={handleInputFilterNameChange}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleInputNameChange={handleInputNameChange} newNumber={newNumber} handleInputNumberChange={handleInputNumberChange}/>
      <h2>Numbers</h2>
      <Persons showPersons={showPersons}/>
    </div>
  )
}

export default App