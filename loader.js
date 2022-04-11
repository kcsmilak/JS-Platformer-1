class Meter {
    constructor() {
    }
    
    update() {
    }
    
    draw() {
    }
}
    
class Loader extends Cartridge {
    constructor() {
        super()
        this.img = null
        this.loaded = false
        this.character = new AnimatedCharacter("Virtual Guy")
    }

    preload() {
       
    }

    setup() {
        console.log("setup")
        
        /*
        loadImage(path, img => { //p5
            this.img = img
            this.loaded = 1
            console.log('loaded loader')
        })         
        */
        this.character.load()
        this.loaded = true
    
    }

    processInput() {
    }

    update() {
        if (!this.loaded) this.setup()
        this.character.update()
    }

    draw() {
        background(0)
        this.character.draw()
    }

    mouseClicked(x, y) {
        console.log('not implemented')

    }

    keyPressed(keyCode) {
        console.log('not implemented')

    }
}