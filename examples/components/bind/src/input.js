(function (app) {

    let input = new Template()
    input.name = 'inputExample'
    input.template = `
    <hr>
    <input type="text" data-akumos data-name='name' data-type='bind' class="form-control">
    
    <input type="text" data-akumos data-name='lastName' data-type='bind' class="form-control">
    <hr>
    <button data-akumos data-type='method' data-event-click='obj.update()'>update</button>
    <button data-akumos data-type='method' data-event-click='obj.checkValues()'>check values</button>
    `
    input.controller = 'personController'

    app.reg('personController', app.get('libs?person.js'))

    app.create(input)

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('inputExample')")

    index.bind()

    app.create(index)   

})(app)