(function (app) {

    if (app.params.get('name') === 'spring-jwt') {
        let mapper_config = JSON.parse(app.call('config.spring.jwt?mapper-config.json'))
        app.js('libs?iterate-config.js', app, mapper_config)

        //let mapper_classes = JSON.parse(app.call('config.spring.jwt?mapper-classes.json'))
        //app.js('libs?iterate-config.js', app, mapper_classes)

    }

})(app)