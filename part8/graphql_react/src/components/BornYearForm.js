import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHDAY,ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const BornYearForm = ({ notify, authors}) => {
    const [nameOption, setNameOption] = useState(null)
    const [born, setBorn] = useState('')

    const [setBirthday, result] = useMutation(SET_BIRTHDAY, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            console.log(error)
            notify(error.graphQLErrors[0].message)
        }
    })
    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            notify('author not found')
          }
    }, [result.data]) // eslint-disable-line

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('update author born year...')
        const name = nameOption.value
        setBirthday({ variables: { name, setBornTo: Number(born) } })

        setNameOption(null)
        setBorn('')
    }

    const options = []
    authors.forEach(author => {
        options.push({ value: author.name, label: author.name })
    })
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                <Select 
                    value={nameOption}
                    onChange={setNameOption}
                    options={options}
                />
                <div>
                    born <input value={born} onChange={({ target }) => setBorn(target.value)}/>
                </div>
            <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BornYearForm