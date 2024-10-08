### Akumos Platform

Akumos Platform is a code template engine. 

# Install

Requirements:

- nodeJs

Clone this repository, navigate to 'src' folder and run:

```bash

sudo npm install -g .

```

Now from everywhere you can call akumos-cli tool. 

To init a new project create a folder call: 'hello-world'. 

Inside the 'hello-world' folder type:

```bash

akumos init

```

Then to compile run:

```bash

akumos cp

```

The output will be generated at 'build/' folder.

### Hello World

Go to 'examples/hello-world' folder and compile the project:

```bash

akumos cp

```

# New project

When you run the 'init' command akumos-cli will generate the project's folder structure like this:

```bash

hello-world
    |_app
    |_build
    |_config
    |_libs
    |_src
    |_tmpl
    |_main.js
    |_project.json

```
- app: folder that contains app's file, these file are the target of all scripts output.
- build: the compile result output will be saved inside this folder.
- config: here you should put yours .json files to be called like it: app.get('namespace')
- libs: here should be located the .js scripts files to be called like it: app.js('namespace', 'params')
- scr: source code folder
- tmpl: template files, could be any extension
- main.js: the entrypoint script
- project.json: project information

Now write your scripts at 'src' folder and to compile run:

```bash

akumos cp

```

# Examples

Here at 'examples' folder you can find a few Akumos project examples.
