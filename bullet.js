class Bullet extends Actor {
    constructor(x, y, xspeed) {
        super()
        this.x = x
        this.y = y
        this.width = 10
        this.height = 10
        this.xspeed = xspeed
        this.lifetime = 30
    }
    
    update() {
        this.x += this.xspeed
        this.lifetime--
        if (this.lifetime <= 0) this.deleteable = true
        
    }
    
    draw() {
        if (this.lifetime < 0) return
        console.log(`alive x:${this.x} y:${this.y} xs:${this.xspeed}`)
        super.draw()
    }
}