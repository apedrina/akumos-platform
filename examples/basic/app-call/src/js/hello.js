(function(app){

    eval(app.call('tmpl?hello.js'))

    console.log(app.call('tmpl?hello.txt'))

    console.log(app.call('config?hello.json'))

})(app)
