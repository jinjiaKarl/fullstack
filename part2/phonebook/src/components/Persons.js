const Persons = ({showPersons, persons, setPersons, personService, setIsError, setMessage}) => {
    const handleOnClick = (element) => {
       if (window.confirm(`Delete ${element.name}`)) {
            personService
            .deletePerson(element.id)
            .then(returnedPerson => {
                // console.log(returnedPerson) // prints {}
                 // array.filter() return a new array
                setPersons(persons.filter(person => person.id !== element.id))
            }).catch(error => {
                setIsError(true)
                setMessage(`Information of ${element.name} has already been removed from server`)
                setTimeout(() => {
                    setMessage('')
                    setIsError(false)
                },  5000)
            })
       }
    }
    return (
        <>
        {showPersons.map((element => {
            return (
                <div key={element.id}>
                    {element.name} {element.number}
                    <button onClick={()=> {handleOnClick(element)}}>Delete</button>
                </div>
            )
        }))}
        </>
      )
}

export default Persons