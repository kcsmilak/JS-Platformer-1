class Jbox {
    constructor() {
        this.cartridge = new Game()
        this.keyboard = new Keyboard()
    }

    loadGame() {
        this.cartridge = new Game()
        this.preload()
    }

    loadEditor() {
        this.cartridge = new Studio()
        this.preload()
    }
    
    preload() {
        this.cartridge.preload()
    }
    
    mouseClicked(x,y) {
        console.log(event)
        this.cartridge.mouseClicked(event.x,event.y)
        
        // prevent default
        return false;    
    }
    
    mousePressed() {
    
    }
    
    keyPressed(keyCode) {

        if (this.keyboard.q) {
            this.loadGame()
            return
        }

        if (this.keyboard.e) {
            this.loadEditor()
            return
        }
        
        this.cartridge.keyPressed(keyCode)
    }
    
    mouseDragged() {
    
    }
    
    mouseWheel() { 
    
    }

    processInput() {
        this.cartridge.processInput()
    }

    update() {
        this.cartridge.update()
    }
    
    draw() {
        this.cartridge.draw()
    }    
}