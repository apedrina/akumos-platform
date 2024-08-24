(function(app){

    eval(app.get('tmpl?hello.js'))

    console.log(app.get('tmpl?hello.txt'))

    console.log(app.get('config?hello.json'))

})(app)
