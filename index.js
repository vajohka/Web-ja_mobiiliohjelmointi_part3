const express = require('express')
const app = express()

app.use(express.json())

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

    if (henkilo) {
        response.json(henkilo)
    } else {
        response.status(404).end
    }
})

const port = 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})   