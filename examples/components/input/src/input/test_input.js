(function(app){

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('inputExample')")

    index.bind()

    app.assert(index.template.includes("app.show('inputExample')"), "app.show('inputExample') not present at template")

})(app)