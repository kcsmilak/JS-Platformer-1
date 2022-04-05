// depends on gamemap and tilemap?


class Game {
    constructor() {
        this.player = new Player()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()
        this.tiles = []

        this.scrollBox = new Rectangle(50,150,400,200)
        
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


        let xmargin = 0
        if (this.player.x < this.scrollBox.x + xmargin) {
            this.scrollBox.x = this.player.x - xmargin
        } else if (this.player.x + this.player.width > this.scrollBox.x + this.scrollBox.width - xmargin) {
            this.scrollBox.x = this.player.x - this.scrollBox.width + this.player.width + xmargin
        }
        if (this.scrollBox.x < 50) this.scrollBox.x = 50
        if (this.scrollBox.x > 300) this.scrollBox.x = 300        
        
    }

    draw() {
        background(51); //p5
        if (!this.gameMap.isLoaded()) return


        push()
        translate(-this.scrollBox.x+50,0)
        this.player.draw()

        this.tiles.forEach(tile => {
            tile.draw()
        })

        push()
        strokeWeight(3)
        fill(0,0,0,0)
        rect(this.scrollBox.x, this.scrollBox.y, this.scrollBox.width, this.scrollBox.height)
        pop()
        pop()


    }

    mouseClicked(x,y) {

    }

    keyPressed(keyCode) {
       
    }
}