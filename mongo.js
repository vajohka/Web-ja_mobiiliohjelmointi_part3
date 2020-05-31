const mongoose = require('mongoose')


const nimi = process.argv[2]
const numero = process.argv[3]



const url =
    `mongodb+srv://fullstack:v98GyD4uM2QguwpO@webjamobiiliharkka3-rvm0n.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const henkiloSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number,
})

const Henkilo = mongoose.model('Henkilo', henkiloSchema)


if (process.argv.length>2) {
    const henkilo = new Henkilo ({
        name: nimi,
        number: numero,
        id: 1,
    })
    
    henkilo.save().then(Response => {
        console.log("Adding person " + nimi + "  number " + numero + " to the directory" )
        mongoose.connection.close()
    })
} else {
    Henkilo.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(henkilo => {
            console.log(henkilo.name + " " + henkilo.number)
        })
        mongoose.connection.close()
    })
}




