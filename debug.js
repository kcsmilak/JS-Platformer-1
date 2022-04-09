
class Debug {
    constructor() {
        this.buffer = {}
    }

    log(val, key = "_") {
        this.buffer[key] = val
    }    
    update() {
        //this.buffer = {}
    }


    
    draw() {
        let size = 10
        let x = 50
        let y = 0
        push()
        textSize(size)
        fill(255)
        text(`DEBUG`, x, y+size)

        let row = 2
        for (let key in this.buffer) {
            let value = this.buffer[key]
            text(`${key}\t:${value}`, x, y + size * row++)
        }
        pop()
    }
}

debug = new Debug()
