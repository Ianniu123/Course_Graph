const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/database.db')

exports.course = function(request, response) {
    let code = request.params.code
    db.all(`SELECT * FROM courses WHERE code = '${code}'`, function(err, rows) {
        if (rows.length == 0) {
            response.end("no such course exists")
            return;
        }
        let obj = rows[0]
        response.render('course', {
            name: obj.name,
            description: obj.description,
            code: obj.code,
            area: obj.area
        })
    })
}

exports.index = function(request, response) {
    response.render('index', {})
}

exports.data = function(req, res) {
    let data = []
    db.all("SELECT code, area from courses", function(err, rows) {
        //creating each node
        for (let i = 0; i < rows.length; i++) {
            let color = '#11479e'
            let area = rows[i].area
            if (area === 'core') {
                color = 'blue'
            } else if (area === 'game development') {
                color = 'green'
            } else if (area === 'security') {
                color = 'red'
            } else if (area === 'AI') {
                color = 'yellow'
            } else {
                color = 'purple'
            }

            const obj = {
                style: {'background-color': color},
                data: {id: rows[i].code, href:`http://localhost:3000/course/${rows[i].code}`}
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
            res.json(data)
        })
    })
}

exports.courses = function(req, res, next) {
    db.all("SELECT * from courses", function(err, rows) {
        let courses = []
        for (let i = 0; i < rows.length; i++) {
            courses.push(rows[i])
        }
        res.render('courses', {
            courses: courses
        })
    })
}