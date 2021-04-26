const express = require('express');
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
const client = require('./client/client')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');
const port = 4000

app.use('/css', express.static('./css'));
app.use('/fonts', express.static('./fonts'));
app.use('/imgs', express.static('./imgs'));
app.use('/javascript', express.static('./javascript'));
app.set('view engine', 'ejs')
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { secure: false } }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

function validatePassword(user, password) {
    return user.password == password
}

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    return next()
}

passport.use(new LocalStrategy(async (username, password, done) => {
        const data = await client.query(`select * from users where username = '${username}'`)
        const user = data.rows[0]
        if(!user) { return done(null, false, { message: "Incorrect Username" }) }
        if(!validatePassword(user, password)) { return done(null, false , {message: "Incorrect Password"}) }
        return done(null, user)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const data = await client.query(`select * from users where id = '${id}'`)
    const user = data.rows[0]
    done(null, user)
})

app.get('/', async (req, res) => {

    try {
        let testimonialData = await client.query('select * from testimonials')
        let testimonials = testimonialData.rows
        let barberData = await client.query('select * from barbers order by map')
        let barbers = barberData.rows
        let servicesData = await client.query('select * from services')
        let services = servicesData.rows
        res.render('home', { services: services, barbers: barbers, testimonials: testimonials })
    } catch (error) {
        console.log("Error ", error)
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
    res.render('appointmentconfirm')
})

app.get('/login', (req, res) => {
    console.log(req.isAuthenticated())
    res.render('login')
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/dashboard'}))

app.get('/dashboard', isLoggedIn, async (req, res) => {
    console.log(req.isAuthenticated())
    res.render('dashboard')
});

app.get('/logout', (req, res) => {
    req.logOut()
    response.redirect('/')
})
app.listen(port, () => console.log(`Listen on port ${port}`))