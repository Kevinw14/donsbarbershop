const express = require('express')
const app = express()
const client = require('./client/client')

app.use('/css', express.static('./css'));
app.use('/fonts', express.static('./fonts'));
app.use('/imgs', express.static('./imgs'));
app.use('/javascript', express.static('./javascript'));

const port = process.env.PORT || 4000

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {

    try {
        const services = (await client.query('select * from services')).rows
        const barbers = (await client.query('select * from barbers order by map')).rows
        const testimonials = (await client.query('select * from testimonials')).rows

        res.render('home', {services: services, barbers: barbers, testimonials: testimonials })

    } catch (error) {
        console.log(error)
    }
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contacts', (req, res) => {
    res.render('contact')
})

app.get('/services', async (req, res) => {
    try {
        const services = (await client.query('select * from services')).rows

        res.render('services', { services: services })

    } catch (error) {
        console.log(error)
    }
})

app.get('/book-now', (req, res) => {
    // res.render('appointmentservice')
    // res.render('appointmentbarber')
    // res.render('appointmentdate')
    res.render('appointmentconfirm')
})


app.listen(port, () => console.log(`Listen on port ${port}`))