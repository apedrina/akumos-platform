(function(app){

    let t = new Template()
    t.path = 'app.hello?hello-world.html'
    t.template = app.call('tmpl.hello?hello.txt')
    t.map.set('{{msg}}','Hello World!')
    t.bind()

    app.create(t)

})(app)