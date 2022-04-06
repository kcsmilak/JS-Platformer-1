class Loader extends Cartridge {
    constructor() {
        super()
    }

    preload() {
        console.log('not implemented')
    }

    processInput() {
    }

    update() {

    }

    draw() {
        fill(255)
        textSize(32)
        text('Loading...', 0, 32)
    }

    mouseClicked(x, y) {
        console.log('not implemented')

    }

    keyPressed(keyCode) {
        console.log('not implemented')

    }
}