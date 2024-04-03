exports.courses = function(request, response, next) {
    //get all the sql objects and then send them through
    const obj = {
        hello: "hello"
    }
    response.json(obj)
    next()
}