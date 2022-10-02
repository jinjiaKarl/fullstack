import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHDAY,ALL_AUTHORS } from '../queries'

const BornYearForm = ({ notify, authors}) => {
    const [name, setName] = useState('')
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
        setBirthday({ variables: { name, setBornTo: Number(born) } })

        setName('')
        setBorn('')
    }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name <input value={name} onChange={({ target }) => setName(target.value)}/>
                </div>
                <div>
                    born <input value={born} onChange={({ target }) => setBorn(target.value)}/>
                </div>
            <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BornYearForm