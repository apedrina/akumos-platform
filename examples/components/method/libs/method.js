(class Method {
    tid;
    html;
    t;
    msg;

    constructor(t, tid) {
        this.t = t
        this.tid = tid
        this.msg = 'hello world!'
    }

    update(all) {
        if (all) {
            this.msg = 'hello akumos update All!'
            this.updateAll()
        } else {
            this.msg = 'hello akumos update element by element'
            let e = this.elements.get('msg')
            e.value = this.msg
        }


    }

    set msg(v) { this.msg = v }

    get msg() { return this.msg }

})
