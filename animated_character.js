
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
