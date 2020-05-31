require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Henkilo = require('./models/henkilo')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Henkilo.find({}).then(henkilot => {
        response.json(henkilot.map(henkilo => henkilo.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response) => {
    Henkilo.findById(request.params.id).then(note => {
        response.json(note.toJSON())
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Henkilo.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    })


app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    }

    /*if (henkiloNimi) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }*/

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    const henkilo = new Henkilo({
        name: body.name,
        number: body.number,
        id: getRandomInt(99999999)
    })

    henkilo.save().then(savedHenkilo => {
        response.json(savedHenkilo.toJSON())
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})   