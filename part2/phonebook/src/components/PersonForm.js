const PersonForm = ({handleSubmit, newName,handleInputNameChange, newNumber, handleInputNumberChange }) => {
    return (
        <>
        <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange}/> 
          <br/>
          number: <input value={newNumber} onChange={handleInputNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
        </>
    )
}

export default PersonForm