# Akumos Components API

Imagine code a SPA, or any kind of web-based application based on js, in pure js and be happy! This is the Akumos Components API propurse.

# Examples

This project has a lot of Akumos Components examples.

Take a look at this script: './src/input.js'.

Firstlly, realize that the script is embraced in a annonymous function.

```javascript

(function (app) {

    //...

})(app)


```
This function has a 'app' object as parameter.

The 'app' object has the entire applications scope, status, scripts and so on.

This object is injected in all scripts.

```js

    //...
    let input = new Template()
    input.name = 'inputExample'
    input.template = `
    <input type="text" data-akumos data-name='name' data-type='bind' class="form-control">
    <br>
    <input type="text" data-akumos data-name='lastName' data-type='bind' class="form-control">
    `
    //...

```

Above we could see the Template input object. Add the data attribute 'data-akumos' to input became a Akumos Component. Combine others data-* attributes to handle the component.

```html

data-akumos data-name='name' data-type='bind' 

```

Above we declare the element as Akumos component ('data-akumos'), we named the component ('data-name') and we define the Akumos Component type ('data-type').

The component type 'bind' create a bind between the dom component to a Template Controller field named 'name'. The same behaviour to the second 'input' element but the target field bind is 'lastName'.

```js

    input.controller = 'personController'

```
The code above show us the Template Controller definition ('personController').

```js

    app.regsScr.set('personController', app.get('libs?person.js'))

```
The next step is the Controller script load. We reach out that goal using the 'app.get()' method. This method lookup the script at './libs' folder and the script name i 'person.js'.

The 'app.regsScr' map give us access to all scripts, controller, class and so on in runtime. So never forget to register yours scripts in develop time at 'app.regsScr' map, otherwise your script won't be disponiable at runtime.

The next statement to look at is the Template creation, using the 'app.create(input)' method.

```js

app.create(input)

```

Now we will create the 'index.html' template.

```js

    let index = new Template()
    index.name = 'index'
    index.path = 'app.static?index.html'
    index.template = app.get('tmpl?index.tmpl')
    index.map.set('{{init}}', "app.show('inputExample')")

```

Again we need a Template instance. We named that as 'index' define the path, the output file/template location, if the path is empty the template is accesiable just as source code.

The template itself is load from './tmpl' and the template name is 'index.tmpl' using the 'app.get()' method.

The 'map' attribute are the variables to be replaced at template source code.

```javascript

    index.bind()
    app.create(index)

```

To replace 'map' attribute at template source code use the 'template.bind()' method, in this case 'index.bind()'. By last use 'app.create(index)' to create the template file at 'path' location ('./build/' folder plus 'app.static' folder).

The 'index' template source code has three points to pay attention.

```html

<script src="dist/js/akumos.js"></script>

```

After the compile Akumos Platform generate a 'akumos.js' file at './build/app/dist/js/akumos.js'. So to use the Akumos Components you should add the snippet above.

```html

<main role="main" class="flex-shrink-0" id="akumos-main">

```
To use naviagtion components flow add the 'akumos-main' id attribute.

Inside the 'akumos-main' div use the '<script>' tag to call the 'app.show()' method.

```html

<script>{{init}}</script>

```

The init will be replaced by 'index.map.set('{{init}}', "app.show('inputExample')")' statment.

Any script registred in 'app.regsScr' map could be acessiable with the 'app.show' method. In the above example we will show the 'inputExample' template in the dom.

# Controller

Now we will analyze the 'person.js' source code.
At compile time the Akumos Platform inject two objects in all js Class defined in developing time as controller.

```javascript

    constructor(t, tid) {
        this.t = t
        this.tid = tid
        this.name = 'Linus'
        this.lastName = 'Silva'
    }

```

So remember any Controller class should has the signature as 

```javascript

    constructor(t, tid){ //...}

```

Another convension, enclosing the class definition with '(' and ')'.

```javascript

(
    class Person {
        tid;
        name;
        age;
        lastName;
        html;
    }
)

```

Another attribute that is inject at compile time to be used in runtime is 'html'.
This attribute is the template DOM containing all html elments created or defined in template source code.

```javascript

html;

```

# Compile and Run

To compile run the command at root folder project:

```bash

    akumos cp

```

Go to './build/app' folder and open in a browser the 'index.html' file.

See the inputs already appears with the name and lastName attributes value. 

# Debug

Press 'F-12' button at chromme browser got o 'source' aba find the 'dist/js/akumos.js' file and add breakpints to debug the application.

# Testing

To test use the suffix 'test_' like the './src/test_input.js'. To run just tests use the following command:

```bash

    akumos test

```

In the test script files use the 'app.assert()' method to do assertions.

```javascript

app.assert(index.template.includes("app.show('inputExample')"), "app.show('inputExample') not present at template")

```

Being the first arg the expression to be tested and the second the error message.

