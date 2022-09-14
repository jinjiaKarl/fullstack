require("dotenv").config() // 解析 .env 文件
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
// parse body of requests as JSON
app.use(express.json())
// app.use(function (req, res, next) {
//     console.log(req)
//     morgan.token('body', function (req, res) { 
//         return JSON.stringify(req.body)
//     })
//     next()
// })
app.use(cors())


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

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(persons => {
        // can use the JSON.stringify(), then use toJson(). 
        response.json(persons)
    })
    .catch(error => next(error))
})

// :id is a requset parameter, is string
app.get('/api/persons/:id', (request, response, next) => {
    // 从mongodb中获取数据不需要转换成Number类型
    // const id  = Number(request.params.id)
    // if not found, person is undefined
    Person.findById(request.params.id)
        .then(person => {
            if (person){
                response.json(person)
            } else {
                // https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express/36507614#36507614
                // Use to quickly end the response without any data.
                // response.status(404).end()
                // Use to send a response with data.
                response.status(404).send('Sorry, we cannot find that!')
            }
        })
        .catch(error => {
           next(error)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const newPerson = {
        ...request.body,
    }
    // 针对updates，不会自动运行validation https://github.com/mongoose-unique-validator/mongoose-unique-validator#find--updates
    // { new: true } means return the updated person
    Person.findByIdAndUpdate(request.params.id, newPerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        // https://www.rfc-editor.org/rfc/rfc9110.html#name-204-no-content
        // returns no data
        response.status(204).end()
    }).catch(error => {
        next((error))
    })
})

app.post('/api/persons', async (request, response, next) => {
    // Without the json-parser, the body property would be undefined. 
    // let newPerson = request.body // 不要直接修改 request.body，因为它是一个对象，对象是引用类型，修改它会影响到原对象
    // newPerson.id = generateRandomId()
    // 因此创建一个新对象，然后修改新对象
    const newPerson = new Person({
        // databae will generate id
       // id: generateRandomId(),
        ...request.body
    })
    
    try {
        const findPerson = await Person.find({name: newPerson.name})
        if (findPerson.length > 0) {
            return response.status(400).json({
                error: 'name must be unique'
            }) 
        }
    } catch(error) {
       next(error)
    }

    try {
        const savedPerson = await newPerson.save()
        response.json(savedPerson)
    } catch(error) {
        next(error)
    }
})

app.get('/info', (request, response,next) => {
    Person.count({})
    .then(count => {
        const info = `<p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>`
        response.send(info)
    })
    .catch(error => {
       next(error)
    })
  
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
