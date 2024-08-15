(function (app) {
    let form = new Template()
    form.name = 'form'
    form.template = `
    <input type="text" data-akumos data-name='name' data-type='bind' class="form-control">
    <br>
    <input type="text" data-akumos data-name='lastName' data-type='bind' class="form-control">
    <br>
    <button data-akumos data-type="method" data-name='btnMethod' data-event-click="obj.hello(obj.name)">call</button>
    <table style='border: 1px solid black;'>
    <div data-akumos data-type='script' data-name='script'>
        <script>
            e.innerHTML = e.innerHTML + "<tr><td>" + obj.name +"</td></tr>"
        </script>
    </div>

    <div data-akumos data-type='boolean' data-name='boolean' data-member='ready'>
        show or hidden!
    </div>
    </table>
    `
    form.controller = 'personController'

    app.regsScr.set('personController', app.get('libs?Person.js'))

    app.create(form)

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.call('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('form')")

    index.bind()

    app.create(index)

})(app)