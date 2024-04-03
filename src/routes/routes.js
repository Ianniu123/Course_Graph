const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/database.db')

exports.courses = function(request, response, next) {
    //get all the sql objects and then send them through
    let data = []
    db.all("SELECT code from courses", function(err, rows) {
        //creating each node
        for (let i = 0; i < rows.length; i++) {
            const obj = {
                data: {id: rows[i].code}
            }
            data.push(obj)
        }
        
        db.all("SELECT source, target from relationships", function(err, rows) {
            for (let i = 0; i < rows.length; i++) {
                let a = rows[i].source
                let b = rows[i].target
                const obj = {
                    data: {id: a + b, source: a, target: b}
                }
                data.push(obj)
            }
            response.json(data)
        })
    })
}