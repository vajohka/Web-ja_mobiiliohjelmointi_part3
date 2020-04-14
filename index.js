const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let henkilot = [
    {
        name: "Arto Hellas",
        number: "040-1286245",
        id: 1,
    },
    {
        name: "Martti Tienari",
        number: "040-1286246",
        id: 2,
    },
    {
        name: "Arto Järvinen",
        number: "040-1286247",
        id: 3,
    },
    {
        name: "Lea Kutvonen",
        number: "040-1286248",
        id: 4,
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(henkilot)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const henkilo = henkilot.filter(henkilo => henkilo.id === id)
    console.log(henkilo)

    if (henkilo) {
        response.json(henkilo)
    } else {
        response.status(404).end
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    henkilot = henkilot.filter(henkilo => henkilo.id !== id)

    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const nimi = String(body.name)

    const henkiloNimi = henkilot.filter(henkiloNimi => henkiloNimi.name === nimi)

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
    
    const henkilo = {
        name: body.name,
        number: body.number,
        id: getRandomInt(99999999)
    }

    henkilot = henkilot.concat(henkilo)

    response.json(henkilo)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})   