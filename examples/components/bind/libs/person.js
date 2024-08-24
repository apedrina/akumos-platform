(class Person {
    tid;
    name;
    age;
    lastName;
    html;

    constructor(t, tid) {
        this.t = t
        this.tid = tid
        this.name = 'Linus'
        this.lastName = 'Silva'
    }

    update() {
        let e = this.elements.get('lastName')
        this.lastName = 'Pedrina'
        e.value = this.lastName

    }

    checkValues(){
        console.log(this.name)
        console.log(this.lastName)

    }

    set name(v) { this.name = v }
    set age(v) { this.age = v }
    set lastName(v) { this.lastName = v }

    get name() { return this.name }
    get age() { return this.age }
    get lastName() { return this.lastName }
    get html() { return this.html }

})
