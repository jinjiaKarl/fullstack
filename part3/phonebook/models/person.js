const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
// https://mongoosejs.com/docs/validation.html
const personSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d+/.test(v)
            },
            message: props => {
                //console.log(props)
                return `${props.value} is not a valid phone number!`
            }
        }
    }
})
  
// the toJSON method of each object is called automatically by the JSON.stringify method.
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)