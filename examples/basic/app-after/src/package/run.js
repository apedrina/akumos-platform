(function(app){

    let map = new Map()
    map.set('${msg_1}','Hi all!')
    app.replace(map, '.html')

})(app)