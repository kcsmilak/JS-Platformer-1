


class Player extends Actor {

    static get JUMP_BOOST() { return 15 }
    static get GRAVITY() { return 1 }
    static get GRAVITY_MAX() { return 10 }

    static get JUMP_COOLDOWN_MAX() { return 0 }
    static get SHOOT_COOLDOWN_MAX() { return 10 }

    
    constructor() {
        super()

        this.x = 100
        this.y = 300
        this.width = 32
        this.height = 32
        this.speed = 4
        this.jumping = false
        this.airborn = false
        this.shooting = false
        this.jumpCooldown = 10
        this.shootCooldown = 0

        this.animation = new AnimatedCharacter("Virtual Guy")
        this.animation.load(this.direction == Player.DIRECTION_LEFT)
    }

    update(obstacles, fireBullet) {
        
        if (this.shootCooldown > 0) this.shootCooldown--

        if (this.jumpCooldown > 0) this.jumpCooldown--        
        


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

        let xdiff = 0
        obstacles.forEach(obstacle => {
            if (tempRect.collideRect(obstacle)) {
                let tdiff = 0
                if (dx < 0) {
                    tdiff = obstacle.right - tempRect.left
                } else if (dx > 0) {
                    tdiff = obstacle.left - tempRect.right  
                }
                if (abs(xdiff) < abs(tdiff)) xdiff += tdiff
                //dx += diff
            }
        })  
        dx += xdiff

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
        //if (tempRect.bottom > HEIGHT) {
        //    dy = (HEIGHT - this.bottom)
        //    this.yspeed = 0
        //    this.airborn = false
        //} 
        
        //let rval = random()
        let diff = 0
        // check if hit obstacle
        obstacles.forEach(obstacle => {
            if (tempRect.collideRect(obstacle)) {
                //console.log("hit")
                this.yspeed = 0

                if (dy < 0) {
                    let tdiff = obstacle.bottom - tempRect.top
                    //console.log(`${rval} hit bottom of object`)
                    if (abs(diff) < abs(tdiff))
                        diff = tdiff
                } else if (dy >= 0) {
                    this.airborn = false                

                    let tdiff = obstacle.top - tempRect.bottom 
                    //console.log(`${rval} hit top of object dy:${dy} diff:${diff} tdiff:${tdiff}`)
                    if (abs(diff) < abs(tdiff))
                        diff = tdiff
                }
            }

            
        })
        dy += diff


        this.yspeed = dy
        
        this.x += dx
        this.y += dy
        
        if (this.shooting && this.shootCooldown == 0) {
            console.log("shoot!")
            this.shootCooldown = Player.SHOOT_COOLDOWN_MAX
            fireBullet(this.x, this.y, dx)
        }        

        if (this.direction == Player.DIRECTION_RIGHT) {
            this.animation.flip = false
        } else {
            this.animation.flip = true
        }

        if (this.airborn) {
            this.animation.setAnimation(AnimatedCharacter.JUMP)
        } else if (dx != 0) {
            this.animation.setAnimation(AnimatedCharacter.RUN)
        } else {
            this.animation.setAnimation(AnimatedCharacter.IDLE)
        }

        this.animate()
        this.animation.update()
    }

    draw() {
        //super.draw()
        push()
        //translate(this.x-8, this.y -16)
        translate(this.x, this.y)

        this.animation.draw()
        pop()
        debug.log(`${this.x}`, "player.x")
        debug.log(`${this.y}`, "player.y")
        debug.log(`${this.direction}`, "player.d")

    }

}