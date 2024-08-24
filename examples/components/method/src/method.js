(function (app) {

    let method = new Template()
    method.name = 'methodExample'
    method.template = `
    <h2>Akumos Components</h2>
    
    <input data-akumos data-type='bind' data-name='msg'></input>
    
    <hr>

    <button data-akumos data-type='method' data-event-click='obj.update(true)'>update all</button>
    <button data-akumos data-type='method' data-event-click='obj.update(false)'>update element</button>
    `
    method.controller = 'methodController'

    app.reg('methodController', app.get('libs?method.js'))

    app.create(method)

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('methodExample')")

    index.bind()

    app.create(index)   

})(app)