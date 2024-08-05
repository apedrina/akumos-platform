(function (app) {

    let config = JSON.parse(app.call('config?commons.json'))

    console.log(config[0])
    let mainClass = new Template()
    mainClass.path = `app.src.main.${config[0].package_base}?DemoApplicaion.java`
    mainClass.template = app.call('tmpl.src.main.java?DemoApplication.java')

    app.create(mainClass)

    let pom = new Template()
    pom.path = 'app?pom.xml'
    pom.template = app.call('tmpl?pom.xml')

    app.create(pom)

    let appProperties = new Template()
    appProperties.path = 'app.src.main.resources?application.properties'
    appProperties.template = app.call('tmpl.src.main.resources?application.properties')

    app.create(appProperties)

    let mainTestClass = new Template()
    mainTestClass.path = `app.src.test.${config[0].package_base}?DemoApplicaionTests.java`
    mainTestClass.template = app.call('tmpl.src.test.java?DemoApplicationTests.java')

    app.create(mainTestClass)


})(app)