const Persons = ({showPersons}) => {
    return (
        <>
        {showPersons.map((element => {
            return (
                <div key={element.id}>{element.name} {element.number}</div>
            )
        }))}
        </>
      )
}

export default Persons