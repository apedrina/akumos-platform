(function (app) {

    if (app.params.get('name') === 'spring-jwt') {
        let mapper_config = JSON.parse(app.get('config.spring.jwt?mapper-config.json'))
        app.js('libs?iterate-config.js', app, mapper_config)

        let mapper_classes = JSON.parse(app.get('config.spring.jwt?mapper-classes.json'))
        app.js('libs?iterate-config.js', app, mapper_classes)

    } else if (app.params.get('name') === 'spring-kafka') {
        let basePackage = 'io.github.apedrina.spring.kafka'
        
        let pom = new Template()
        pom.name = 'pom.xml',
        pom.path = 'app.spring.kafka?pom.xml'
        pom.template = app.get('tmpl.spring.kafka?pom.xml')
        pom.map.set('{{groupId}}', basePackage)
        pom.map.set('{{artifactId}}','akumos-kafka')
        pom.map.set('{{version}}', '1.0.0')
        pom.map.set('{{name}}', 'akumos_kafka')

        pom.bind()
        app.create(pom)

        let t = new Template()
        t.name = 'KafkaProducerApplication.java',
        t.path = `app.spring.kafka.src.main.java.${basePackage}?KafkaProducerApplication.java`
        t.template = app.get('tmpl.spring.kafka.src.main.java?KafkaProducerApplication.java')
        t.map.set('{{package}}', `${basePackage};`)
        t.map.set('{{importConsumer}}',`import ${basePackage}.consumer.KafkaConsumer;\n`)


        t.bind()
        app.create(t)

        let t2 = new Template()
        t2.name = 'KafkaConsumer.java',
        t2.path = `app.spring.kafka.src.main.java.${basePackage}.consumer?KafkaConsumer.java`
        t2.template = app.get('tmpl.spring.kafka.src.main.java?KafkaConsumer.java')
        t2.map.set('{{package}}', `${basePackage}.consumer;`)

        t2.bind()
        app.create(t2)

    }

})(app)