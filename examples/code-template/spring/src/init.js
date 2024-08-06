(function (app) {

    if (app.params.get('name') === 'spring-jwt') {
        let archPom = new Template()
        archPom.path = 'app.spring.jwt.src.main.resources.archetype-resources?pom.xml'
        archPom.template = app.call('tmpl.spring.jwt.src.main.resources.archetype-resources?pom.xml')
        archPom.map.set('{{dependencies}}', app.call('tmpl.spring.jwt?dependencies.xml'))
        archPom.bind()

        console.log(`creating archetype pom.xml!`)
        app.create(archPom)

        const mapper_config = JSON.parse(app.call('config.spring.jwt?mapper-config.json'))
        app.js('libs?iterate-config.js', app, mapper_config)

        const mapper_classes = JSON.parse(app.call('config.spring.jwt?mapper-classes.json'))
        app.js('libs?iterate-config.js', app, mapper_classes)
        
    }

})(app)