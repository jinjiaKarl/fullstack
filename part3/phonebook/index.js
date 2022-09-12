const express = require('express')
const app = express()
const morgan = require('morgan')

// parse body of requests as JSON
app.use(express.json())
// app.use(function (req, res, next) {
//     console.log(req)
//     morgan.token('body', function (req, res) { 
//         return JSON.stringify(req.body)
//     })
//     next()
// })

// 如果在路由处添加了req.boy.id，但是这个中间件应该是在进入路由之前的执行的，为什么req.body.id会有值？？？
// 因为 morgan()还有第二个参数option,{ immediate: true }，默认是false, 意味着等到有response的时候才会打印log
// 所以如果修改了req.body.id，那么打印的log就是修改后的值
app.use(morgan(function (tokens, req, res) {
    let msgs = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
      ]
    if (tokens.method(req, res) === 'POST') {
        // msgs.push(tokens['body'](req, res))
        msgs.push(JSON.stringify(req.body))
    }
    return msgs.join(' ')
  }))

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
    // let newPerson = request.body // 不要直接修改 request.body，因为它是一个对象，对象是引用类型，修改它会影响到原对象
    // newPerson.id = generateRandomId()
    // 因此创建一个新对象，然后修改新对象
    let newPerson = {
        id: generateRandomId(),
        ...request.body
    }
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.find(p => p.name === newPerson.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
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
