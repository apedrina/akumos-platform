(function (app) {

    let mainClass = new Template()
    mainClass.path = 'app.src.main.java.com.example.demo?DemoApplicaion.java'
    mainClass.template = app.call('tmpl.src.main.java.com.example.demo?DemoApplication.java')

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
    mainTestClass.path = 'app.src.test.java.com.example.demo?DemoApplicaionTests.java'
    mainTestClass.template = app.call('tmpl.src.test.java.com.example.demo?DemoApplicationTests.java')

    app.create(mainTestClass)


})(app)