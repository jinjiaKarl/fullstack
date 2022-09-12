const express = require('express')
const app = express()

// parse body of requests as JSON
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

const generateRandomId = () => {
    const min = 10
    const max = 100000
    // [min, max) interval
    return Math.floor(Math.random() * (max - min)) + min
}


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// :id is a requset parameter, is string
app.get('/api/persons/:id', (request, response) => {
    const id  = Number(request.params.id)
    // if not found, person is undefined
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        // https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express/36507614#36507614
        // Use to quickly end the response without any data.
        // response.status(404).end()
        // Use to send a response with data.
        response.status(404).send('Sorry, we cannot find that!')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
    // returns no data
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    // Without the json-parser, the body property would be undefined. 
    const person = request.body
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    person.id = generateRandomId()
    persons = persons.concat(person)
    response.json(person)
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    response.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
