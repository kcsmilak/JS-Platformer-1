


class Player extends Actor {

    static get JUMP_BOOST() { return 20 }
    static get GRAVITY() { return 1 }
    static get GRAVITY_MAX() { return 10 }

    static get JUMP_COOLDOWN_MAX() { return 0 }

    constructor() {
        super()

        this.x = 100
        this.y = 100
        this.width = 16
        this.height = 16
        this.speed = 8
        this.jumping = false
        this.airborn = false
        this.jumpCooldown = 0

        this.animation = new AnimatedCharacter("Virtual Guy")
        this.animation.load()
    }

    update(obstacles) {

        // initialize round movement to previous velocity
        let dx = 0
        let dy = this.yspeed
        let tempRect = 0
        
        if (Actor.MOVEMENT_RIGHT == this.movement) {
            dx = this.speed
        } else if (Actor.MOVEMENT_LEFT == this.movement) {
            dx = -this.speed
        }

        // check for x boundry conditions
        //if (this.x + dx < 0 ) {
        //    dx = 0 - this.x
        //}
        //if (this.x + dx + this.width > WIDTH) {
        //    dx = WIDTH - (this.x + this.width)
        //}

        // check if hit obstacle
        tempRect = new Rectangle(this.x + dx, this.y, this.width, this.height)

        obstacles.forEach(obstacle => {
            if (tempRect.collideRect(obstacle)) {
                let diff = 0
                if (dx < 0)
                    diff = obstacle.right - tempRect.left
                else if (dx > 0)
                    diff = obstacle.left - tempRect.right    
                dx += diff
            }
        })        

        // accelerate yspeed by gravity
        dy += Player.GRAVITY

        // constrain yspeed by terminal velocity
        if (dy > Player.GRAVITY_MAX) {
            this.airborn = true
            dy = Player.GRAVITY_MAX
        }

        // modify y velocity if jumping (and not already in the air)
        if (this.jumping && !this.airborn && this.jumpCooldown == 0) {
            dy -= Player.JUMP_BOOST
            this.airborn = true
            console.log("jump")
            this.jumpCooldown = Player.JUMP_COOLDOWN_MAX
        }
        if (this.jumpCooldown > 0) this.jumpCooldown--

        // attempt to move by dy and check if hit obstacle
        tempRect = new Rectangle(this.x, this.y + dy, this.width, this.height)

        // attempt to move by dy and check if hit the ground
        if (tempRect.bottom > HEIGHT) {
            dy = (HEIGHT - this.bottom)
            this.yspeed = 0
            this.airborn = false
        } 
        
        // check if hit obstacle
        obstacles.forEach(obstacle => {
            if (tempRect.collideRect(obstacle)) {
                this.yspeed = 0
                this.airborn = false                

                let diff = 0
                if (dy < 0)
                    diff = obstacle.bottom - tempRect.top
                else if (dy > 0)
                    diff = obstacle.top - tempRect.bottom    
                dy += diff
            }

            
        })


        this.yspeed = dy
        
        this.x += dx
        this.y += dy

        this.animate()
        this.animation.update()
    }

    draw() {
        super.draw()
        push()
        translate(this.x-8, this.y -16)
        this.animation.draw()
        pop()
    }

}