
### App-after

Take a look at './man.js' file:

```js

(function (app) {

  console.log('running app-after...')

  app.after = 'src.package?run.js'

})(app)

```

Let's remember the base signature for scripts files that would like to have access to 'app' akumos instance. That scripts should always have this structure:

```js

(function (app) {

    //...

})(app)


```

In this way when the anonymous function is execute the Akumos Platform inject the 'app' instance.

The next instruction to pay attention is the 'after' app attribute. The attribute value should be the script namespace that will run last in compile time.

So the script bellow will be the last one to run in compile time.

```js

(function(app){

    let map = new Map()
    map.set('${msg_1}','Hi all!')
    app.replace(map, '.html')

})(app)

```

The script above will replace the key/value in all '.html' files in the 'build/app' folder.