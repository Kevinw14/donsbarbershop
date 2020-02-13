const express = require('express')
const app = express()
const port = 3000 | process.env.PORT

app.set('view engine', 'ejs')

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app