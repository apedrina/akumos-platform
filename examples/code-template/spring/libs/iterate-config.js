(function (app, params) {
    for (var k in params) {
        let t = new Template()
        t.name = params[k].name
        t.path = params[k].path
        t.template = app.get(params[k].template)

        t.addConfig((params[k].map))
        t.bind()

        app.create(t)
    }
})(app, params)