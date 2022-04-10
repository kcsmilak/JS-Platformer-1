
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

class AnimatedCharacter {
    static get IDLE() { return 0 } 
    static get RUN() { return 1 } 
    static get JUMP() { return 2 } 
    static get FALL() { return 3 } 
    
    constructor(character) {
        this.ribbons = {}
        this.activeRibbon = null
        this.character = character
        this.flip = true
    }

    update() {
        if (this.activeRibbon == null) return
        this.ribbons[this.activeRibbon].update()
    }

    load() {
        let base = "Images/Main Characters"
        let end = " (32x32).png"
        let frameWidth = 32
        this.ribbons[AnimatedCharacter.IDLE] = new AnimationRibbon(`${base}/${this.character}/Idle${end}`, frameWidth)
        this.ribbons[AnimatedCharacter.RUN] = new AnimationRibbon(`${base}/${this.character}/Run${end}`, frameWidth)
        this.ribbons[AnimatedCharacter.JUMP] = new AnimationRibbon(`${base}/${this.character}/Jump${end}`, frameWidth)
        this.ribbons[AnimatedCharacter.FALL] = new AnimationRibbon(`${base}/${this.character}/Fall${end}`, frameWidth)

        this.setAnimation(AnimatedCharacter.IDLE)
    }

    draw() {
        if (this.activeRibbon == null) return
        this.ribbons[this.activeRibbon].draw(this.flip)
    }

    setAnimation(animationType) {
        this.activeRibbon = animationType
    }

}