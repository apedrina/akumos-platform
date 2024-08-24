(function (app) {

    let booleanT = new Template()
    booleanT.name = 'booleanExample'
    booleanT.template = `
    <h2>Akumos Components - Boolean</h2>
    
    <div data-akumos data-type='method' data-name='display' data-event-focus='obj.show()'>
        <h3>Hello World!</h3>
    </div>
    <div data-akumos data-name='x' data-type='script'>
        <script>
            document.createElement('div')
        </script>
    </div>

    <hr>
    <button data-akumos data-type='method' data-event-click='obj.change(true)'>show</button>
    <button data-akumos data-type='method' data-event-click='obj.change(false)'>hidden</button>
    `
    booleanT.controller = 'booleanController'

    app.reg('booleanController', app.get('libs?boolean.js'))

    app.create(booleanT)

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('booleanExample')")

    index.bind()

    app.create(index)   

})(app)