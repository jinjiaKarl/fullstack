const mongoose = require('mongoose')

if (process.argv.length != 5 && process.argv.length != 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> name number')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://jinjia:${password}@cluster0.imkssme.mongodb.net/persons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    // console.log('connected')
  })
  .catch((err) => console.log(err))


if (process.argv.length === 3) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, " ", person.number)
        })
        mongoose.connection.close()
    })
} else {
    const newPerson = new Person({
    name: name,
    number: number,
    })
    newPerson.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

