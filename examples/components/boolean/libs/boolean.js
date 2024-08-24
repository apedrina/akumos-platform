(class Boolean {
    tid;
    html;
    t;
    display = false;

    set display(v) { this.display = v }
    get display() { return this.display }

    constructor(t, tid) {
        this.t = t
        this.tid = tid
        
    }

    change(v) {
        let e = this.elements.get('display')
        if (v) {
            e.setAttribute('style', 'display:block')
            this.display = v
        } else {
            e.setAttribute('style', 'display:none')
            this.display = v
        }

    }

    show() {
        console.log('show()')
        this.change(false)
    }

})
