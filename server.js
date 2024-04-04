const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/routes.js')
const hbs = require('hbs')

hbs.registerPartials(__dirname + '/public/layouts/partials')
app.get(['/', '/index'], routes.index)
app.get('/course/:code', routes.course)
app.get('/data', routes.data)
app.get('/courses', routes.courses)

app.set('view engine', 'hbs')
app.set('views', __dirname + '/public/layouts')
app.use(express.static(__dirname + '/public/'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/index`)
})