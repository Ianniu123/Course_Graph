const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data/database.db')

exports.index = function(request, response) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        response.render('index', {})
    }
}

exports.data = function(request, response) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        let data = []
        db.all("SELECT code, area from courses", function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }

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
                    data: {id: rows[i].code, href:`/course/${rows[i].code}`}
                }
                data.push(obj)
            }
            
            db.all("SELECT source, target from relationships", function(err, rows) {
                if (err) {
                    response.end(`Error: ${err}`)
                }
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
}


exports.login = function(request, response) {
    if (request.session.username) {
        response.redirect("/")
    } else {
        response.render('login', {})
    }
}

exports.validate = function(request, response, next) {
    let username = request.body.username
    let password = request.body.password

    if (username && password) {
        db.all(`SELECT * FROM users WHERE username = '${username}'`, function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }

            if (rows.length == 0) {
                response.end("No password matches with the username")
                //no such user exists
            } else {
                let user = rows[0]
                if (user.password !== password) {
                    response.end("No password matches with the username")
                } else {
                    request.session.username = user.username
                    request.session.role = user.role
                    response.redirect('/')
                }
            }
        })
    }
}

exports.createUser = function(request, response, next) {
    let username = request.body.username
    let password = request.body.password

    console.log("Creating new user")

    if (username && password) {
        db.all(`INSERT INTO users VALUES('${username}', '${password}', 'guest')`, function(err, rows) {
            if (err) {
                response.end("Username already used!")
            } else {
                response.redirect('/login')
            }
        })
    }
}

exports.register = function(request, response, next) {
    if (request.session.username) {
        response.redirect("/")
    } else {
        response.render('register', {})
    }
}

exports.logout = function(request, response) {
    if (request.session.username) {
        request.session.destroy()
        response.redirect("/login")
    } else {
        response.redirect("/login")
    }
}

exports.search = function(request, response, next) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        let code = request.body.search
        response.redirect(`/course/${code}`)
    }
}

exports.course = function(request, response) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        let code = request.params.code
        code = code.toUpperCase()
        db.all(`SELECT * FROM courses WHERE code = '${code}'`, function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }
            
            if (rows.length == 0) {
                response.end("No such course exists")
                return;
            }

            let obj = rows[0]
            db.all(`SELECT rating, review FROM ratings WHERE code = '${code}'`, function(err, rows) {
                let reviews = []
                let sum = 0
                let denominator = 1

                if (err) {
                    response.end(`Error: ${err}`)
                }

                for (let i = 0; i < rows.length; i++) {
                    let obj = {
                        review: rows[i].review,
                        rating: rows[i].rating
                    }
                    reviews.push(obj)
                    sum += rows[i].rating
                }
                
                if (rows.length !== 0) {
                    denominator = rows.length
                }

                response.render('course', {
                    name: obj.name,
                    description: obj.description,
                    code: obj.code,
                    area: obj.area,
                    reviews: reviews,
                    avg_rating: sum / denominator
                })
            })
        })
    }   
}

exports.courses = function(request, response, next) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        db.all("SELECT * from courses", function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }

            let courses = []
            for (let i = 0; i < rows.length; i++) {
                courses.push(rows[i])
            }
            response.render('courses', {
                courses: courses
            })
        })
    }
}

exports.users = function(request, response, next) {
    if (!request.session.username) {
        response.redirect("/login")
    } else if (request.session.role !== "admin") {
        response.end("administrative privilege required!")
    } else {
        db.all("SELECT * from users", function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }

            let users = []
            for (let i = 0; i < rows.length; i++) {
                users.push(rows[i])
            }
            response.render('users', {
                users: users
            })
        })
    }
}

exports.reviews = function(request, response, next) {
    if (!request.session.username) {
        response.redirect("/login")
    } else {
        db.all("SELECT * from ratings", function(err, rows) {
            if (err) {
                response.end(`Error: ${err}`)
            }

            let reviews = []
            for (let i = 0; i < rows.length; i++) {
                reviews.push(rows[i])
            }
            response.render('reviews', {
                reviews: reviews
            })
        })
    }
}

exports.createReview = function(request, response, next) {
    if (!request.session.username) {
        response.end("Unauthorized access!")
    } else {
        let username = request.session.username
        let course_code = request.body.course_code
        let review = request.body.review

        let rating = 5 //request from the model api

        if (course_code && review && username) {
            db.all(`INSERT INTO Ratings VALUES('${username}', '${course_code}', '${review}', ${rating})`, function(err, rows) {
                if (err) {
                    response.end(`Error: ${err}`)
                }
                response.redirect(`/course/${course_code}`)
            })
        } else {
            response.end("Cannot add empty reviews!")
        }
    }
}