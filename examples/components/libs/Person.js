(class Person {
    tid;
    ready = true
    t;
    name;
    age;
    lastName;
    html;
    itens = ['hello', 'world', 'apedrina']

    constructor(t, tid) {
        this.t = t
        this.tid = tid
        this.name = 'Alisson'
        this.lastName = 'Pedrina'
    }

    hello(v) {
        console.log('hello world ' + v)
        console.log(this.elements.get('addressForm'))
    }

    update() {
        let e = this.elements.get('lastName')
        e.value = 'Pedrina'
        this.updateAll()
    }

    set name(v) { this.name = v }
    set age(v) { this.age = v }
    set lastName(v) { this.lastName = v }
    set html(v) { this.html = v }

    get itens() { return this.itens }
    get name() { return this.name }
    get age() { return this.age }
    get lastName() { return this.lastName }
    get html() { return this.html }

})
