
class AnimationRibbon {
    constructor(path, frameWidth) {
        this.image = null
        this.frame = 0
        this.frames = 0
        this.loaded = false
        this.frameImage = null
        this.load(path, frameWidth)
    }

    load(path, frameWidth) {
        this.loaded = false
        loadImage(path, image => { //p5
            this.image = image
            this.frame = 0
            this.frames = image.width / frameWidth
            //this.frameImage = createGraphics(frameWidth, frameHeight)
            this.loaded = true
            console.log("loaded")
        })         
    }

    update() {
        this.frame = (this.frame + 1) % this.frames
    }

    draw(flip = false) {
        if (!this.loaded) return
        let frameSize = this.image.width / this.frames
        push()
        if (flip) {
            translate(frameSize,0)
            scale(-1,1)
        }
        //scale(2)
        copy(this.image,this.frame * frameSize,0,frameSize,frameSize,0,0,frameSize,frameSize) //p5
        pop()
    }
    
}
