const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/routes.js')
const hbs = require('hbs')
const parser = require('body-parser')

hbs.registerPartials(__dirname + '/public/layouts/partials')

app.use(session({
    secret: "course_graph",
    resave: true,
    saveUninitialized: true
}))
app.use(parser.urlencoded({ extended: true })) //used to read the body of a request message

app.get(['/', '/index'], routes.index) //renders the main page
app.get('/data', routes.data) //getting graph data

app.get('/login', routes.login)
app.post('/validate', routes.validate) //checks if the user exists
app.post('/register', routes.createUser) //registers the user
app.get('/register', routes.register) 
app.get('/logout', routes.logout)

app.post("/search", routes.search) //looking for a course

app.get('/course/:code', routes.course)
app.get('/courses', routes.courses)

app.get('/users', routes.users)

app.get('/reviews', routes.reviews)
app.post('/reviews', routes.createReview) //creates a course review

app.set('view engine', 'hbs')
app.set('views', __dirname + '/public/layouts')
app.use(express.static(__dirname + '/public/'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/index`)
})