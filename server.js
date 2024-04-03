const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./src/routes/routes.js')
const cytoscape = require('cytoscape')


app.use(express.static(__dirname + '/public'))

app.get(['/', '/index'], function(request, response, next) {
    response.sendFile(__dirname + '/public/views/index.html')
})
app.get(['/graph'], routes.courses)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/index`)
})