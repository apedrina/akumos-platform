(function(app){

    let t = new Template()
    t.template = app.get('tmpl?index.html')
    t.map.set('{{msg_0}}', 'App.after!')
    t.bind()
    t.path = 'app.package?other.html'

    app.create(t)

})(app)