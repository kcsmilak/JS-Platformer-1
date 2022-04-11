class Jbox {
    constructor() {
        this.keyboard = new Keyboard()
        this.cartridge = new Game()
    }

    loadGame() {
        this.cartridge = new Game()
        this.preload()
    }

    loadEditor() {
        this.cartridge = new Studio()
        this.preload()
    }

    loadLoader() {
        this.cartridge = new Loader()
        this.preload()
    }

    preload() {
        this.cartridge.preload()
    }

    setup() {
        this.cartridge.setup()
    }

    mouseClicked(x, y) {
        this.cartridge.mouseClicked(x, y)

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