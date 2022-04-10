// depends on gamemap and tilemap?


class Game extends Cartridge {
    constructor() {
        super()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()

        this.player = new Player()
        this.enemies = []
        this.tiles = []
        this.bullets = []

        this.camera = new Rectangle(this.player.x,this.player.y,400,300)
        
        this.showTileMap = false
        this.showGameMap = false
        
        this.enemies.push(new Enemy())
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
        
        if (this.keyboard.space) {
            this.player.shooting = true
        } else {
            this.player.shooting = false
        }
        


    }
    
    fireBullet(x, y, dx) {
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
        this.player.update(this.tiles, (x,y,dx) => {
            console.log(`fire x:${x} y:${y} dx:${dx}`)
            let bullet = new Bullet(x,y,dx+10)
            this.enemies.push(bullet)
        })
        
        this.enemies.forEach(enemy => {
            enemy.update(this.tiles, this.player)
        })


        let xmargin = 100
        if (this.player.x < this.camera.x + xmargin) {
            this.camera.x = this.player.x - xmargin
        } else if (this.player.x + this.player.width > this.camera.x + this.camera.width - xmargin) {
            this.camera.x = this.player.x - this.camera.width + this.player.width + xmargin
        }

        
        let ymargin = 0
        if (this.player.top < this.camera.top + 50) {
            this.camera.top = this.player.top - 50
        } else if (this.player.bottom > this.camera.bottom - 50) {
            this.camera.bottom = this.player.bottom + 50
        }
        
        if (this.camera.top < 0) this.camera.top = 0        
        
        if (this.camera.x < 0) this.camera.x = 0
        let max = 900
        if (this.camera.right > max) this.camera.right = max        
        
    }

    draw() {
        frameRate(40)
        background(51); //p5
        if (!this.gameMap.isLoaded()) return


        push()
        scale(1.5)
        translate(-this.camera.x, -this.camera.y)
        //
        this.player.draw()

        this.tiles.forEach(tile => {
            tile.draw()
        })
        
        this.enemies.forEach(enemy => {
            enemy.draw()
        })        

        push()
        strokeWeight(3)
        fill(0,0,0,0)
        //rect(this.camera.x, this.camera.y, this.camera.width, this.camera.height)
        pop()
        pop()

        debug.draw()

    }

    mouseClicked(x,y) {

    }

    keyPressed(keyCode) {
       
    }
}