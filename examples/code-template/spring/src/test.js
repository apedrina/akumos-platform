(function (app) {

    if (app.params.get('name') === 'spring-jwt') {
        let x = `
            <?xml version="1.0" encoding="UTF-8"?>

            <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <groupId>io.github.apedrina.archetypes</groupId>
            <artifactId>{{artifactId}}</artifactId>
            <version>{{version}}</version>
            <packaging>maven-archetype</packaging>

            <name>{{name}}</name>
        `
        let s = x.replaceAll('{{artifactId}}', '9')
        console.log(s)

    }

})(app)