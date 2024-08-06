(function (app, params) {
    for (var k in params) {
        let t = new Template()
        t.name = params[k].name
        t.path = params[k].path
        t.template = app.call(params[k].template)
        let map = params[k].map
        for (var k in map) {
            t.map.set(k, map[k])

        }
        t.bind()

        console.log(params[k].description)

        app.create(t)
    }
})(app)