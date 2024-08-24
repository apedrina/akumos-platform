#!/usr/bin/env node
const fs = require('node:fs');
const path = require('path');
const process = require('process')
const { Template, App } = require('./app.js')

var test = false
var isSuffix = false;
var isBefore = false;
var isAfter = false;
var isScripts = false
var after = ''
const app = new App()

function copyApp2Build() {
    try {
        var moveFrom = process.cwd() + path.sep + "app";
        var moveTo = process.cwd() + path.sep + "build" + path.sep + "app"

        console.log(`[INFO]  compile: moving 'app' folder to 'build' folder.`)
        fs.cpSync(moveFrom, moveTo, { recursive: true });

    } catch (error) {
        throw new Error(`[ERROR] compile: error trying copy 'app/' to 'build/app'\n ${error}`)

    }

}

function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), []);

}

function getDirectories(srcpath) {
    try {
        console.log(`[INFO]  compile: reading project.json: ${'.' + path.sep + 'project.json'}`)
        var project = fs.readFileSync('.' + path.sep + 'project.json', 'utf8')

        project = JSON.parse(project)
        app.n = (project.namespace)

        console.log(`[INFO]  compile: reading main.js: ${'.' + path.sep + 'main.js'}`)
        try {
            var mainJs = fs.readFileSync('.' + path.sep + 'main.js', 'utf8')

            eval(mainJs)

            console.log(`[INFO]  compile: 'main.js' evaluation finished!`)

            if (app.scripts != null) {
                this.isScripts = true
            }
            if (app.suffix != null) {
                this.isSuffix = true;

            }
            if (app.after != null) {
                this.isAfter = true

            }

        } catch (error) {
            console.log(`[ERROR] compile: error trying run 'main.js'`)
            throw error

        }

        return fs.readdirSync(srcpath)
            .map(file => path.join(srcpath, file))
            .filter(p => {
                var stat = fs.statSync(p);
                if (stat && !stat.isDirectory()) {
                    if (this.isScripts) {
                        app.scripts.forEach(s => {
                            let pathFile = p.replace(process.cwd(), '')
                            let v = s
                            let i = v.indexOf('?')

                            let p2 = v.substring(0, i).replaceAll('.', path.sep)
                            let f = v.substring(i + 1)

                            console.log(`[INFO]  compile: ${pathFile} === ${p2}`)
                            p2 = p2 + path.sep + f
                            if (pathFile === p2) {
                                console.log(`[INFO]  compile: running script!`)

                                eval(fs.readFileSync('.' + path.sep + p, 'utf8'))

                                return fs.statSync(p).isDirectory()
                            }


                        })

                    }
                    if (this.isSuffix) {
                        if (!path.basename(p).startsWith(app.suffix)) {
                            console.log(`[WARNING] compile: skipping ${p}, suffix: ${app.suffix}`)
                            return fs.statSync(p).isDirectory()

                        }
                    }
                    if (this.isAfter) {
                        let pathFile = p.replace(process.cwd(), '')
                        let v = app.after
                        let i = v.indexOf('?')

                        let p2 = v.substring(0, i).replaceAll('.', path.sep)
                        let f = v.substring(i + 1)

                        p2 = p2 + path.sep + f
                        if (pathFile === p2) {
                            this.after = fs.readFileSync('.' + path.sep + p, 'utf8')

                            console.log(`[WARNING] compile: skipping ${p}, after: ${app.after}`)

                            this.isAfter = false
                            return fs.statSync(p).isDirectory()
                        }

                    }
                    if (path.basename(p).startsWith('test_') && this.test) {
                        console.log(`[INFO]  test: parsing .js file: ${'.' + path.sep + p}`)
                        var content = fs.readFileSync('.' + path.sep + p, 'utf8')
                        try {
                            console.log(`[INFO]  testing: evaluating!`)
                            eval(content)
                            console.log(`[INFO]  test: script js evaluation finished!`)

                        } catch (error) {
                            console.log(`[ERROR] testing: error running: ${'.' + path.sep + p}`)
                            console.log(error)

                        }
                    } else {
                        console.log(`[INFO]  compile: parsing .js file: ${'.' + path.sep + p}`)
                        var content = fs.readFileSync('.' + path.sep + p, 'utf8')
                        try {
                            console.log(`[INFO]  compile: evaluating!`)
                            eval(content)
                            console.log(`[INFO]  compile: script js evaluation finished!`)

                        } catch (error) {
                            console.log(`[ERROR] compile: error running: ${'.' + path.sep + p}`)
                            console.log(error)

                        }
                    }

                }
                return fs.statSync(p).isDirectory()

            });

    } catch (error) {
        throw new Error(`[ERROR] compile: error on compile!\n ${error}`)

    }
}

function getDirectoriesRecursive(srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

function init(test) {
    this.test = test
    copyApp2Build()
    getDirectoriesRecursive('./src')

    if (this.after != '') {
        console.log('[INFO]  compile: running after script!')

        eval(this.after)

    }
    if (this.test) {
        console.log('[INFO]  ======= Tests Report =======')
        if (app.testsFailed.length > 0) {
            console.log(`[ERROR] test: completed with ${app.testsFailed.length} error(s)!`)
            let index = 1
            app.testsFailed.forEach(error => {
                console.log(`${index}: ${error}`)
                index = index + 1
            });
        } else {
            console.log('[INFO]  test: completed successfully!')
        }
    } else {
        createJsFiles()

        console.log(`[INFO]  compile: init compile method completed!`)
    }

}

function createJsFiles() {
    let akumos_js = app_js
    let tmplFakeMap = '['
    app.templates.forEach(t => {
        tmplFakeMap = `${tmplFakeMap}${JSON.stringify(t)},`

    })
    tmplFakeMap = (tmplFakeMap.substring(0, tmplFakeMap.length - 1)) + ']'
    let templates = tmplFakeMap

    let tmplRegsScr = '['
    app.regsScr.forEach((v, k) => {
        tmplRegsScr = `${tmplRegsScr}["${k}",${JSON.stringify(v)}],`

    })
    tmplRegsScr = (tmplRegsScr.substring(0, tmplRegsScr.length - 1)) + ']'
    let regsScr = tmplRegsScr

    akumos_js = akumos_js.replaceAll('{{templates}}', templates)
    akumos_js = akumos_js.replaceAll('{{regsScr}}', regsScr)

    fs.mkdirSync(process.cwd() + path.sep + 'build/app/static/dist/js', { recursive: true })
    fs.writeFileSync(process.cwd() + path.sep + 'build/app/static/dist/js/akumos.js', akumos_js, 'utf8')
}

let app_js = `
class Template {
    map = new Map();
    path;
    template;
    description;
    name;
    controller;

    get map() { return this.map }
    get path() { return this.path }
    get template() { return this.template }
    get name() { return this.name }
    get description() { return this.description }
    get namespace() { return this.namespace }
    get controller() { return this.controller }

    set map(v) { this.map = v }
    set path(v) { this.path = v }
    set template(v) { this.template = v }
    set name(v) { this.name = v }
    set description(v) { this.description = v }
    set namespace(v) { this.namespace = v }
    set controller(v) { this.template = v }

    bind() {
        this.map.forEach((v, k, m) => {
            this.template = this.template.replaceAll(k, v);

        });
    }
    addConfig(v) {
        for (var o in v){
            this.map = new Map(Object.entries(v[0]), this.map)
            
        }
        
    }

}

class App {
    after;
    suffix;
    scripts = [];
    n;
    templates = {{templates}};
    regsScr = new Map({{regsScr}})
    params = new Map()
    objs = new Map()

    get templates() { return this.templates }
    get params() { return this.params }
    get n() { return n }
    get regsScr() { return this.regsScr }
    get objs() { return this.objs }

    set templates(v) { this.templates = v }
    set params(v) { this.params = v }
    set n(v) { this.n = v }
    set regsScr(v) { this.regsScr = v }
    set objs(v) { this.objs = v }

    get(v) {
       return this.regsScr.get(v)

    }

    js(v, app, params) {
        return eval(this.regsScr.get(v))

    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    }

    show(v) {
        let obj = undefined
        for (var i in this.templates) {
            if (this.templates[i].name === v && this.templates[i].controller) {
                let uuid = \`\${this.uuidv4()}_\${this.templates[i].name}_\`
                var akumosDiv = new DOMParser().parseFromString(this.templates[i].template, 'text/html');

                let controller = eval(\`(\${this.regsScr.get(this.templates[i].controller)})\`)
                obj = new controller(this.templates[i], uuid)

                this.lookup(akumosDiv, obj)

                document.write(\`<div id='\${uuid}'></div>\`)
                var dom = document.getElementById(uuid)

                dom.insertAdjacentElement('afterbegin', akumosDiv.body)
                obj.html = dom

                this.objs.set(uuid, obj)

            }

        }
        return obj

    }

    lookup(akumosDiv, obj) {
        let data_akumos = akumosDiv.querySelectorAll('[data-akumos]')

        Object.getPrototypeOf(obj).children = []
        Object.getPrototypeOf(obj).elements = new Map()
        Object.getPrototypeOf(obj).updateAll = () => {
            obj.elements.forEach(e => {
                app.buildTemplate(obj, e)
            })
        }
        data_akumos.forEach(e => {
            this.buildTemplate(obj, e)

        })

        return obj
    }
    buildTemplate(obj, e) {
        let attrs = e.attributes
        let data_name
        let data_type
        let data_method = ''
        let data_event = ''
        let data_member = ''
        let data_template = ''
        for (var i = attrs.length - 1; i >= 0; i--) {
            if (attrs[i].name === 'data-name') {
                data_name = attrs[i].value;

            } else if (attrs[i].name === 'data-type') {
                data_type = attrs[i].value;

            } else if (attrs[i].name.includes('data-event-')) {
                data_method = attrs[i].value
                let data = attrs[i].name.split('-')
                data_event = data[2]

            } else if (attrs[i].name === 'data-member') {
                data_member = attrs[i].value;

            } else if (attrs[i].name === 'data-template') {
                data_template = attrs[i].value;

            }

        }

        if (data_type === 'child') {
            obj.elements.set(data_template, e)
            let child = this.show(data_template)
            obj.children.push(child)
            return child

        } else if (data_type === 'bind') {
            for (const [k, v] of Object.entries(obj)) {
                if (k === data_name) {
                    if (v !== null && v !== undefined) {
                        e.value = v
                    }
                    e.addEventListener("change", (e) => {
                        obj[k] = e.target.value
                    })
                }

            }
        } else if (data_type === 'method') {
            e.addEventListener(data_event, (e) => {
                eval(data_method)

            })

        } else if (data_type === 'script') {
            let s = e.querySelectorAll('script')

            e.innerHTML = ''
            s.forEach(s => {
                e.innerHTML = eval(s.innerHTML)
            })

            s.forEach(s => {
                e.appendChild(s)
            })

        } else if (data_type === 'boolean') {
            if (obj[data_member]) {
                e.setAttribute('style', 'display:block')
            } else {
                e.setAttribute('style', 'display:none')
            }

        }

        obj.elements.set(data_name, e)
        return e
    }

}

const app = new App()

`


module.exports.compile = init