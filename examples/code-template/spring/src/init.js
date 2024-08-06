(function (app) {

    if (app.params.get('name') === 'spring-jwt') {
        console.log('init spring-jwt pre-compile...')

        let config = JSON.parse(app.call('config.spring-jwt?commons.json'))

        let rootPom = new Template()
        rootPom.path = 'app.spring-jwt?pom.xml'
        rootPom.template = app.call('tmpl.spring?pom.xml')

        for (var k in config) {
            rootPom.map.set(`{{${k}}}`, config[k])

        }
        rootPom.bind()

        app.create(rootPom)

        let archPom = new Template()
        archPom.path = 'app.spring-jwt.src.main.resources.archetype-resources?pom.xml'
        archPom.template = app.call('tmpl.spring.src.main.resources.archetype-resources?pom.xml')
        archPom.map.set('{{dependencies}}', app.call('tmpl.spring.jwt?dependencies.xml'))
        archPom.bind()

        app.create(archPom)

    }

})(app)