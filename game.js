// depends on gamemap and tilemap?

        
class Rectangle {
    constructor(x=0, y=0, width=0,height=0) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get top() { return this.y }
    get bottom() { return this.y + this.height }
    get left() { return this.x }
    get right() { return this.x + this.width }

    set right(value) { this.x = value - this.width }
    set left(value) { this.x = value }
    set top(value) { this.y = value }
    set bottom(value) { this.y = value - this.height }

    collideRect(rect2) {
        let rect1 = this
        return rect1.right > rect2.left && 
            rect1.left < rect2.right && 
            rect1.bottom > rect2.top && 
            rect1.top < rect2.bottom
    }

    collidePoint(x,y) {
        if (x >= this.left &&        
            x <= this.right &&   
            y >= this.top &&   
            y <= this.bottom) { 
            return true;
        }

        return false;
        
    }
    
    draw() {
        rect(this.x, this.y, this.width, this.height) //p5
    }   
}


class Actor extends Rectangle {

    static get MOVEMENT_IDLE() { return 0 }
    static get MOVEMENT_RIGHT() { return 1 }
    static get MOVEMENT_LEFT() { return -1 }

    static get DIRECTION_FACING() { return 0 }
    static get DIRECTION_RIGHT() { return 1 }
    static get DIRECTION_LEFT() { return -1 }
    
    constructor() {
        super()

        this.image = null

        this.xspeed = 0
        this.yspeed = 0
        
        this.movement = Actor.MOVEMENT_IDLE
        this.direction = Actor.DIRECTION_RIGHT
        
    }

    animate() {
        
    }


}


class Player extends Actor {

    static get JUMP_BOOST() { return 20 }
    static get GRAVITY() { return 1 }
    static get GRAVITY_MAX() { return 10 }


    constructor() {
        super()

        this.x = 100
        this.y = 100
        this.width = 16
        this.height = 16
        this.speed = 8
        this.jumping = false
        this.airborn = false
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
        if (this.x + dx < 0 ) {
            dx = 0 - this.x
        }
        if (this.x + dx + this.width > WIDTH) {
            dx = WIDTH - (this.x + this.width)
        }

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
        if (this.jumping && !this.airborn) {
            dy -= Player.JUMP_BOOST
            this.airborn = true
            console.log("jump")
        }

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
    }

}

class Keyboard {
    // https://keycode.info/for/Space
    get a() { return keyIsDown(65) } //p5
    get d() { return keyIsDown(68) } //p5
    get s() { return keyIsDown(83) } //p5
    get w() { return keyIsDown(87) } //p5
    get t() { return keyIsDown(84) } //p5

    get space() { return keyIsDown(32) } //p5

}

class Tile extends Rectangle {
    constructor(x, y, partNumber, tileMap) {
        super(x,y,16,16)
        this.partNumber = partNumber
        this.tileMap = tileMap
    }
    
    draw() {
        this.tileMap.drawPart(this.partNumber, this.x, this.y)
    }
}

class Game {
    constructor() {
        this.player = new Player()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()
        this.tiles = []

        this.showTileMap = false
        this.showGameMap = false
    }

    preload() {
        this.gameMap.loadGameMap()
    }

    processInput() {
        if (this.keyboard.a && ! this.keyboard.d){
            this.player.movement = Player.MOVEMENT_LEFT
        } else if (this.keyboard.d && ! this.keyboard.a) {
            this.player.movement = Player.MOVEMENT_RIGHT
        } else {
            this.player.movement = Player.MOVEMENT_IDLE
        }

        if (this.keyboard.a){
            this.player.direction = Player.DIRECTION_LEFT
        } else if (this.keyboard.d) {
            this.player.direction = Player.DIRECTION_RIGHT
        }
        
        if (this.keyboard.w) {
            this.player.jumping = true
        } else {
            this.player.jumping = false
        }


    }
    
    update() {
        if (!this.gameMap.isLoaded()) return
        if (this.tiles.length <= 0) {
            for (let row = 0; row < this.gameMap.mapData.length; row++) {
                for (let col = 0; col < this.gameMap.mapData[0].length; col++) {
                    let partNumber = this.gameMap.mapData[row][col]
                    if (partNumber <= 0) continue
                    this.tiles.push(new Tile(col*16,row*16,partNumber,this.gameMap.tileMap))
                    
                }
            }

        }
        this.player.update(this.tiles)        
    }

    draw() {
        background(51); //p5
        if (!this.gameMap.isLoaded()) return


        this.player.draw()

        this.tiles.forEach(tile => {
            tile.draw()
        })

        //this.gameMap.draw()

        if (this.showTileMap)
            this.gameMap.tileMap.draw(100,100)

        this.gameMap.tileMap.drawSelectedPart(WIDTH-16,0)

    }

    handleMouseClicked(x,y) {
        if (this.showTileMap)
            this.gameMap.tileMap.handleMouseClicked(x-100,y-100)
    }

    handleKeyPressed(keyCode) {
        if (keyCode == 84) {
            console.log(`toggle map ${this.showTileMap}`)
            if (this.showTileMap)
                this.showTileMap = false
            else
                this.showTileMap = true
        }        
    }
}