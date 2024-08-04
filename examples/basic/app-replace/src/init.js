(function(app){

    let map = new Map()
    map.set('{{m1}}','Hello')
    map.set('{{m2}}','World')

    app.replace(map ,'.html')

})(app)