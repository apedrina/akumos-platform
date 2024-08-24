(function (app) {

    let input = new Template()
    input.name = 'inputExample'
    input.template = `
    
    <input type="text" data-akumos data-name='name' data-type='bind' class="form-control">
    <br>
    <input type="text" data-akumos data-name='lastName' data-type='bind' class="form-control">
    `
    input.controller = 'personController'

    app.regsScr.set('personController', app.get('libs?person.js'))

    app.create(input)

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('inputExample')")

    index.bind()

    app.create(index)   

})(app)