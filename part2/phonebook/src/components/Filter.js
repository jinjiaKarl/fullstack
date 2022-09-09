const Filter = ({filterName, handleInputFilterNameChange}) => {
    return (
        <>
        Filter shown with <input value={filterName} onChange={handleInputFilterNameChange}/>
        </>
    )
}

export default Filter