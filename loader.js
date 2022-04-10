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
        //this.ribbon = new AnimationRibbon()
        this.character = new AnimatedCharacter("Virtual Guy")
        this.values = []
        this.values.push(2, 4, 5, 6)
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
        
        console.log(this.values)
        
        this.values.forEach( value => {
            console.log(value)
        })

        this.values = this.values.filter( value => 
            value % 2 != 0
        )        
        
        console.log(this.values)
    
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
        /*
        fill(255)
        if (this.loaded == -1) {
            textSize(32)
            text('Loading...', 0, 32)
        } else if (this.loaded == 0) {
            textSize(32)
            text('Init...', 0, 32)
        } else {
            image(this.img, 0,0)
        }
        */
        
    }

    mouseClicked(x, y) {
        console.log('not implemented')

    }

    keyPressed(keyCode) {
        console.log('not implemented')

    }
}