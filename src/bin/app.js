const fs = require('node:fs');
const path = require('path');
const process = require('process')

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
        for (var o in v) {
            this.map = new Map(Object.entries(v[0]), this.map)

        }

    }

}

function exec(file, filters, m) {
    var fname = path.basename(file);
    var dirname = path.dirname(file);
    var n = dirname + '?' + fname
    n = n.replaceAll(path.sep, '.')
    n = n.replace('..', '')

    if (filters.includes(n) || filters.includes(path.extname(file))) {
        let dataFile = fs.readFileSync(file, { encoding: 'utf8' })

        m.forEach((v, k) => {
            console.log(`[INFO]  app: k: ${k}, v: ${v}`)
            dataFile = dataFile.replaceAll(k, v)

        })
        file = file.replace('.', '')
        file = '.' + path.sep + file

        console.log(`[INFO]  app: saving replaced file: ${file}`)
        console.log(`[INFO]  app: content replaced file: ${dataFile}`)

        fs.writeFileSync(file, dataFile)
    }
}

const walk = function (dir, filters, m) {
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + path.sep + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file, filters, m);

        } else {
            exec(file, filters, m)

        }
    });
}

class App {
    after;
    suffix;
    scripts = [];
    n;
    templates = [];
    regsScr = new Map()
    params = new Map()
    regs = new Map()
    objs = new Map()
    testsFailed = []

    get after() { return this.after }
    get suffix() { return this.suffix }
    get scripts() { return this.scripts }
    get templates() { return this.templates }
    get params() { return this.params }
    get n() { return n }
    get config() { return this.regsConfig }
    get tmpl() { return this.regsTmpl }
    get src() { return this.regsScr }
    get regs() { return this.regs }
    get objs() { return this.objs }
    get testsFailed() { return this.testsFailed }

    set after(v) { this.after = v }
    set suffix(v) { this.suffix = v }
    set scripts(v) { this.scripts = v }
    set templates(v) { this.templates = v }
    set params(v) { this.params = v }
    set n(v) { this.n = v }
    set config(v) { this.regsConfig = v }
    set tmpl(v) { this.regsTmpl = v }
    set src(v) { this.regsScr = v }
    set regs(V) { this.regs = v }
    set objs(v) { this.objs = v }
    set testsFailed(v) { this.testsFailed = v }

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
                let uuid = `${this.uuidv4()}_${this.templates[i].name}_`
                var akumosDiv = new DOMParser().parseFromString(this.templates[i].template, 'text/html');

                let controller = eval(`(${this.regsScr.get(this.templates[i].controller)})`)
                obj = new controller(this.templates[i], uuid)

                this.lookup(akumosDiv, obj)

                document.write(`<div id='${uuid}'></div>`)
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

        } 
        obj.elements.set(data_name, e)
        return e
    }

    assert(v, msg) {
        if (!v) {
            let errorMsg = `[ERROR]  test: ${msg}`
            console.log(errorMsg);
            this.testsFailed.push(errorMsg)

        }
    }

    get(v) {
        let i = v.indexOf('?')
        let p = v.substring(0, i).replaceAll('.', path.sep)
        let f = v.substring(i + 1)

        p = p + path.sep + f

        return fs.readFileSync(process.cwd() + path.sep + p).toString()

    }

    js(v, app, params) {
        let i = v.indexOf('?')

        let p = v.substring(0, i).replaceAll('.', path.sep)
        let f = v.substring(i + 1)

        p = p + path.sep + f

        return eval(fs.readFileSync('.' + path.sep + p).toString())

    }

    reg(k, v) {
        this.regsScr.set(k, v)

    }

    create(t) {
        try {
            if (t.template == null) {
                console.log(`[WARNING] app: template.template is empty or null`)
                return;

            }
            if (t.path == null || t.path === '' || t.path == undefined) {
                this.templates.push(t)
                return;

            }
            let i = t.path.indexOf('?')
            if (i == -1) {
                console.log(`[WARNING] app: invalid template.path (missing '?'), ${t.path}`)
                return;

            }
            let p = t.path.substring(0, i).replaceAll('.', path.sep)
            let f = t.path.substring(i + 1)
            p = p + path.sep + f

            let path2Save = process.cwd() + path.sep + 'build' + path.sep + p

            console.log(`[INFO]  app: parent file exist?: ${fs.existsSync(path.dirname(path2Save))}`)
            if (!fs.existsSync(path.dirname(path2Save))) {
                console.log(`[INFO]  app: creating parent folder`)
                fs.mkdirSync(path.dirname(path2Save), { recursive: true })

            }

            console.log(`[INFO]  app: saving template to: ${path2Save}`)
            fs.writeFileSync(path2Save, t.template)

            this.templates.push(t)

        } catch (err) {
            console.log(`[ERROR] app: error try creating template: ${t}`)
            console.log(err)

        }

    }

    replace(m, ...params) {
        try {
            const filters = [...params.values()]
            var dir = '.' + path.sep + 'build' + path.sep + 'app'
            var list = fs.readdirSync(dir);

            list.forEach(function (file) {
                file = dir + path.sep + file;
                var stat = fs.statSync(file);

                if (stat && stat.isDirectory()) {
                    walk(file, filters, m);

                } else {
                    exec(file, filters, m)

                }
            });
        } catch (error) {
            throw new Error(`[ERROR] app: error trying replacing map at 'build/app'.\n ${error}`)

        }


    }

}

module.exports = {
    Template,
    App

}
